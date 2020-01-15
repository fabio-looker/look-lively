//Synchronously load only code required to begin fetching query results
import { LookerExtensionSDK, connectExtensionHost } from "@looker/extension-sdk"

console.log("post-import")

!async function(){
	let host = await connectExtensionHost()
	let looker = LookerExtensionSDK.createClient(host)
	console.log("SDK Usable")
	
	debugger
	
	//
	const asyncData = Promise.resolve() //host.invokeCoreSdkByPath(...) // for download query API
	const asyncMain = import(/* webpackChunkName: "main" */ /* webpackMode: "lazy" */ './main.js')
		.then(module=>module.default)
	const [data,main] = await Promise.all([asyncData, asyncMain])
	main(data)
	console.log("Async done")
	}()
