/* Copyright (c) 2020 Looker Data Sciences, Inc. */

//Dynamically set the base path for async-loaded code
import './lib/webpack-public-path.js'

//Synchronously load only code required to begin fetching query results
import { LookerExtensionSDK, connectExtensionHost } from "@looker/extension-sdk"
import { decodeUrlParams } from './lib/decode-url-params.js'

!async function(){
	let host = await new Promise(res=>{let host = connectExtensionHost({initializedCallback:()=>res(host)})})
	console.log("host.lookerHostData: ",host.lookerHostData)
	
	let looker = LookerExtensionSDK.createClient(host)
	
	const qs = decodeUrlParams(host.lookerHostData.route)
	console.log("qs: ",qs)
	const {query_id,limit} = qs
	const asyncData = query_id
		//? looker.run_query({query_id,result_format:'csv'}) //Not as fast
		? host.invokeCoreSdkByPath("GET", `/queries/${query_id}/download/csv${limit?"?limit="+limit:""}`) // Not yet working, don't know the expected path/signature
		//? host.invokeCoreSdkByName('download_query',{query_id,query_format:"csv"}) //Don't know the right way to invoke this
		: Promise.resolve([])
	const asyncQuery = query_id
		? looker.query(query_id,"model,view,fields,pivots,sorts,dynamic_fields")
		: Promise.resolve(undefined)
	
	//Streaming not yet implemented in extension SDK
	//const streamData = 
		//looker.stream.run_query(x=>console.log(x),{query_id,query_format:'csv'})
		//promise2Stream(host.invokeCoreSdkByPath(`download_query/${query_id}/csv`)) // for download query API?
	
	const main = await import(/* webpackChunkName: "main" */ /* webpackMode: "lazy" */ './main.js')
		.then(module=>module.default)
	main(asyncQuery,asyncData,{host,looker,document,global:window})
	//console.log("Async done")
	}()
	
// function promiseToStream(promise){
// 
// 
// 	}
