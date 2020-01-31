//import(/* webpackChunkName: "hyperapp" */ 'hyperapp')
//console.log("main.js loaded")
import * as hyperapp from "hyperapp"
import css from './main.css'
import formatRouter from './lib/format-router.js'
const ID = x=>x
const unique = (x,i,arr) => arr.indexOf(x)===i

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
		labelSequence:[],
		formats:{},
		formatters:{},
		formatterSequence:[],
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
		formats: defaultActions,
		formatters: defaultActions,
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
			const fields = []
				.concat(explore.fields.dimensions||[])
				.concat(explore.fields.measures||[])
				.map(f=>({
					...f,
					label: s.fields[f.name] && s.fields[f.name].label
						|| f.label_from_parameter && `${f} (pending label_from_parameter)`
						|| f.label_short //Maybe flip this & label?
						|| f.label
						|| f.replace(/_/g," ").replace(/[^|_][a-z]/g,s=>s.toUpperCase()),
						// ^ The preferred source for this is in the CSV header row where Looker has already labeled the column
					format: f.value_format_name
						|| f.value_format
					}))
			const fieldsById = Object.fromEntries(fields.map(f=>[f.name,f]))
			app.fields.set(fieldsById)
			const formats = fields.map(f=>f.format).filter(unique)
			formats.forEach(format => app.resolveFormat(format))
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
			const [labelSequence,...data] = 
				response.value
				.split("\n")
				.map(row=>row.split(','))
			//app.query.set({fields})
			//^ It seems these already have labeling applied... We'll just rely on
			// the label from the query definition for now. See note #1
			app.set({labelSequence})
			app.mergeLabels()
			app.set({data,queryState:''})
			},
		resolveFormat: format => async (s,app) => {
			let formatterId = s.formats[format]
			if(!formatterId){
				formatterId = formatRouter(format)
				if(!formatterId){return}
				app.formats.set({[format]: formatterId})
				}
			let formatter = s.formatters[formatterId]
			if(!formatter){
				//TODO: lookup docs for hinting to webpack which glob to prepare for dynamic import
				formatter = await import(`./lib/formatters/${formatterId}.js`).then(module=>module.default)
				if(!formatter){return}
				app.formatters.set({[formatterId]:formatter})
				}
			if(s.query.fields){
				const formatterSequence = s.query.fields
					.map(field => 
						(  s.fields[field]
						|| s.query.dynamic_fields[fields]
						|| O
						).value_format || "")
					.map(format => s.formats[format] || '')
					.map(formatterId => s.formatters[formatterId])	
				app.set({formatterSequence})
				}
			},
		mergeLabels: () => async (s,app) => {
			//
			
			}
		}
		return hyperapp.app(initState, actions, view, document.body)
	}

function View(hyperapp){
	const {h} = hyperapp
	const [main,h1,div,table,tr,th,td,thead,tbody]
		= "main,h1,div,table,tr,th,td,thead,tbody".split(",").map(tag=>(attr,els)=>h(tag,attr,els))
	const O = {}
	//const A = []
	return (s, app) => {
		return main(O, [
			h1(O,"Turbo Query"),
			div(O,s.queryState),
			table(O, [
				thead(O,[
					tr(O,s.query.fields.map(f=>
						th(O, (s.fields[f]||O).label
							//|| q.dynamic_fields && q.dynamic_fields[f] && q.dynamic_fields[f].label
							|| f
							)
						))
					]),
				tbody(O,
					s.data.slice(s.scroll,s.scroll+100).map(dr=>
						tr(O,dr.map((dd,col)=>
							td(O,(s.formatterSequence[col]||ID)(dd))
							))
						)
					.concat([
						tr({class:'virtual-bottom-padding'})
						])
					)
				])
			])
		}
	}