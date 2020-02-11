export default function formatterAdHoc01(field){
	if(field.value_format!=='#,##0.0%'){throw "Ad Hoc formatter is only for #,##0.0%"}
	const n=1
	return value => {
		const numString = (value*100).toString() 
		const parts = numString.split('.')
		const leftOfDecimal = parts[0]||'0'
		const rightofDecimal = ((parts[1]||'')+'0000000000')
		return leftOfDecimal + '.' + rightofDecimal.slice(0,n)+"%"
		}
	}