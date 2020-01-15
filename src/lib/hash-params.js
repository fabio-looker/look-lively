export default const query = (str = document.location.hash) => (param) =>
	str.replace(/^[?#]/,'').split('&')
	.map(pair=>pair.split('='))
	.reduce((obj,parts)=>({...obj,[decodeURIComponent(parts[0])]:decodeURIComponent(parts.slice(1).join('='))}),{})