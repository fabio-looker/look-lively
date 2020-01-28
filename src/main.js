//import(/* webpackChunkName: "hyperapp" */ 'hyperapp')
//console.log("main.js loaded")
import * as hyperapp from "hyperapp"
import css from './main.css'


export default function main(asyncQuery, asyncData, {host,looker,document,global}){
	applyCss(document)
	const app = App({hyperapp,host,looker,document})
	global.app = app
	app.resolveQueryDefinition(asyncQuery)
	app.resolveQueryData(asyncData)
	}

function applyCss(document) {
	const style = document.createElement("style")
	style.appendChild(document.createTextNode(css.toString()))
	document.head.appendChild(style)
	}

function App({hyperapp,host,looker,document}){
	const initState = {
		fields:{},
		queryState:"Loading",
		dataState: "[Hidden]",
		query:{
			fields:[],
			dynamic_fields:[]
		},
		data:[],
		readyFormatters:{},
		scroll:0
		}

	const view = View(hyperapp)

	const defaultActions = {
		state: v => s => s,
		set: v => s => v,
		}
	const actions = {
		...defaultActions,
		fields: defaultActions,
		query: defaultActions,
		resolveQueryDefinition: asyncQuery => async (s,app) => {
			app.set({queryState:"Fetching query definition..."})
			const response = await asyncQuery
			if(!response){return app.set({queryState:"No query available"})}
			if(!response.ok){return app.set({queryState:"Query definition error in API response"})}
			const query = response.value
			if(!query.fields){return app.set({queryState:`Unexpected query definition: ${JSON.stringify(query).slice(0,50)}...`})}
			app.set({query})
			const lookml_model_name = query.model
			const explore_name = query.view
			if(!lookml_model_name || !explore_name){
				console.warn("No model/view in query, with which to fetch field labels");
				return
				}
			const exploreResponse = await looker.lookml_model_explore(
				lookml_model_name,
				explore_name,
				"fields("
				+ "dimensions(name,label,label_short,label_from_parameter,view_label,value_format)"
				+  ",measures(name,label,label_short,label_from_parameter,view_label,value_format)"
				+ ")"
				)
			if(!exploreResponse.ok || !exploreResponse.value){
				return app.set({queryState:`Failed to fetch explore definition for ${lookml_model_name}/${explore_name}`})
				}
			const explore = exploreResponse.value
			if(!explore.fields){
				return app.set({queryState:`Failed to find field definitions found for ${lookml_model_name}/${explore_name}`})
				}
			const fields = Object.fromEntries(
				[]
					.concat(explore.fields.dimensions||[])
					.concat(explore.fields.measures||[])
					.map(f=>[f.name,{
						...f,
						label: f.label_from_parameter && `${f} (label_from_parameter not yet implemented)`
							|| f.label_short //Maybe flip this & label?
							|| f.label
							|| f.replace(/_/g," ").replace(/[^|_][a-z]/g,s=>s.toUpperCase())
						}])
				)
			// Note #1: ^ Getting labels from here, but maybe we should just use the query csv Response
			// for labels, as the labeling seems to already be applies, and just use this defimition for
			// formatting
			app.fields.set(fields)
			// TODO?: Persist field defs to localStorage?
			},
		resolveQueryData: asyncData => async (s,app) => {
			if(!asyncData){
				app.set({dataState:"No data available"})
				return
				}
			const response = await asyncData
			if(!response.ok){
				app.set({dataState:"Data error in API response"})
				return
				}
			const [fields,...data] = 
				response.value
				.split("\n")
				.map(row=>row.split(','))
			//app.query.set({fields})
			//^ It seems these already have labeling applied... We'll just rely on
			// the label from the query definition for now. See note #1
			app.set({data})
			}
		}
		
		return hyperapp.app(initState, actions, view, document.body)
	}

function View(hyperapp){
	const {h} = hyperapp
	const [main,h1,div,table,tr,th,td,thead,tbody]
		= "main,h1,div,table,tr,th,td,thead,tbody".split(",").map(tag=>(attr,els)=>h(tag,attr,els))
	return (s, app) => main({}, [
		h1({},"Turbo Query"),
		div({},s.queryState),
		table({}, [
			thead({},[
				tr({},s.query.fields.map(f=>
					th({},s.fields[f] && s.fields.label
						//|| q.dynamic_fields && q.dynamic_fields[f] && q.dynamic_fields[f].label
						|| f
						)
					))
				]),
			tbody({},
				s.data.slice(s.scroll,s.scroll+100).map(dr=>
					tr({},dr.map((dd,col)=>
						td({},dd+" "
							+	(( s.fields[s.query.fields[col]]
								|| s.query.dynamic_fields[s.query.fields[col]]
								|| {}
								).value_format||"")
							)
						))
					)
				.concat([
					tr({class:'virtual-bottom-padding'})
					])
				)
			])
		])
	}