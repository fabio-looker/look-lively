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
		dynamic_fields:{},
		queryState:"Loading...",
		dataState: "Loading...",
		query:{
			fields:[],
			dynamic_fields:[]
		},
		data:[],
		labelSequence:[],
		//formats:{},
		formatters:{},
		curriedFormatterSequence:[],
		scroll:{
			tableRowHeightPixels:27,
			dataRowsOffset:0,
			rowsInAScreen: 24 /* .table-wrap height (640) / row height (27) */,
			}
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
					formatterId: formatRouter(f)
					}))
			const fieldsById = Object.fromEntries(fields.map(f=>[f.name,f]))
			app.fields.set(fieldsById)
			app.set({queryState:''})
			const formatIds = fields.map(f=>f.formatterId).filter(unique)
			formatIds.forEach(formatId => app.resolveFormatter(formatId))
			// TODO?: Persist model-based field defs to localStorage?
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
				.filter((line,l,lines)=>l<lines.length-1 || line!=='') //Trailing newline means empty trailing row. Filter it
				.map(line=>line.split(','))
			//app.query.set({fields})
			//^ It seems these already have labeling applied... We'll just rely on
			// the label from the query definition for now. See note #1
			app.set({labelSequence})
			app.mergeLabels()
			app.set({data,dataState:''})
			},
		resolveFormatter: formatterId => async (s,app) => {
			let formatter = s.formatters[formatterId]
			if(!formatter){
				formatter = await import(`./lib/formatters/${formatterId}.js`).then(module=>module.default)
				if(!formatter){return}
				app.formatters.set({[formatterId]:formatter})
				}
			let formatters = app.formatters.state()
			if(s.query.fields){
				const curriedFormatterSequence = s.query.fields.map(fieldId => {
					const field = (
						s.fields[fieldId]
						|| s.dynamic_fields[fieldId]
						|| O
						)
					const formatterId = field.formatterId || ""
					const formatter = formatters[formatterId] 
					return formatter ? formatter(field) : ID
					})	
				app.set({curriedFormatterSequence})
				}
			},
		mergeLabels: () => async (s,app) => {
			// Once we have both data (with labeling applied) and query definition (with complex labeling logic not yet applied)
			// Merge them together: lookup correct label by position, and save it to the field definitions
			// (or something)
			},
		scroll:{
			...defaultActions,
			checkScroll: evt => async (s,app) => {
				const el = evt.target
				const lowestRowNumberInView =
					Math.floor(el.scrollTop / s.tableRowHeightPixels)
				const highestRowNumberInView =
					Math.ceil((el.scrollTop + el.offsetHeight) / s.tableRowHeightPixels)
				const centerRowNumber = Math.floor((lowestRowNumberInView+highestRowNumberInView)/2)
				//console.log("Scroll?",lowestRowNumberInView,highestRowNumberInView,s.dataRowsOffset)
				if(highestRowNumberInView > s.dataRowsOffset + s.rowsInAScreen){
					//console.log("Down!",highestRowNumberInView,s.dataRowsOffset + s.rowsInAScreen, centerRowNumber)
					return app.set({dataRowsOffset: centerRowNumber})
					}
				if(lowestRowNumberInView < s.dataRowsOffset - s.rowsInAScreen){
					//console.log("Up!",lowestRowNumberInView,s.dataRowsOffset - s.rowsInAScreen, centerRowNumber)
					return app.set({dataRowsOffset: centerRowNumber})
					}
				}
			}
		}
		return hyperapp.app(initState, actions, view, document.body)
	}

function View(hyperapp){
	const {h} = hyperapp
	const [main,h1,div,table,tr,th,td,thead,tbody]
		= "main,h1,div,table,tr,th,td,thead,tbody".split(",").map(tag=>(attr,els)=>h(tag,attr,els))
	const O = {}
	const A = []
	return (s, app) => {
		const minRow = greatest(0,s.scroll.dataRowsOffset-2*s.scroll.rowsInAScreen)
		const maxRow = least(s.scroll.dataRowsOffset+2*s.scroll.rowsInAScreen,s.data.length)
		return main(O, [
			h1(O,"Turbo Query"),
			...(s.queryState||s.dataState ? [
				div({class:"status"},[
					div(O,s.queryState?`Query: ${s.queryState}`:''),
					div(O,s.dataState ?`Data:  ${s.dataState}`:'' )
					])
				]:A),
			div({class:'table-wrap', onscroll:app.scroll.checkScroll},[
				table(O, [
					thead(O,[
						tr(O,A
							.concat(th(O,"#"))
							.concat(s.query.fields.map(f=>
								th(O, (s.fields[f]||O).label
									//|| q.dynamic_fields && q.dynamic_fields[f] && q.dynamic_fields[f].label
									|| f
									)
								))
							)
						]),
					tbody(O,
						A
						.concat(
							tr({style:{height:s.scroll.tableRowHeightPixels * minRow+'px'}},A)
							)
						.concat(s.data
							.slice(minRow,maxRow)
							.map((dr,dri)=>
								tr(
									{style:{height:s.scroll.tableRowHeightPixels+"px"}},
									A
										.concat(td(O,minRow + dri + 1))
										.concat(dr.map((dd,col)=>
											td(O,(s.curriedFormatterSequence[col]||ID)(dd))
											))
									)
								)
							)
						.concat(
							tr({style:{height:
								(s.scroll.tableRowHeightPixels*(s.data.length - maxRow)||0)
								+'px'}},A)
							)
						)
					])
				])
			])
		}
	}

function least(a,b){return a<b?a:b}
function greatest(a,b){return a>b?a:b}