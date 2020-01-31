export default function formatterPercentN(format){
	const n = parseInt((format.match(/[0-9]+/)||[])[0])||0
	return value => {
		const numString = (value*100).toString() 
		const parts = numString.split('.')
		const leftOfDecimal = parts[0]||'0'
		const rightofDecimal = ((parts[1]||'')+'0000000000')
		return leftOfDecimal + '.' + rightofDecimal.slice(0,n)
		}
	}