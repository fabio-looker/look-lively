export const decodeUrlParams = (str = document.location.hash||document.location.search) => 
	str.replace(/^.*?[?#]/,'').split('&')
	.map(pair=>pair.split('='))
	.reduce((obj,parts)=>({...obj,[decodeURIComponent(parts[0])]:decodeURIComponent(parts.slice(1).join('='))}),{})