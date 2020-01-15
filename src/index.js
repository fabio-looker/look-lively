//Synchronously load only code required to begin fetching query results
import { LookerExtensionSDK, connectExtensionHost } from "@looker/extension-sdk"

console.log("post-import")

!async function(){
	let host = await connectExtensionHost()
	let looker = LookerExtensionSDK.createClient(host)
	console.log("SDK Usable")
	
	debugger
	
	//
	//const asyncData = looker.downloadQuery()
	const asyncMain = import(/* webpackChunkName: "main" */ './main.js')
	//const first = await Promise.race([asyncData,asyncMain])
	// if(typeof first === Stream){
	// 
	// 	}
	// else {
	// 
	// 	}
	const [data,main] = await Promise.all([asyncData, asyncMain])
	console.log("Async done")
	}()
