export default function formatRouter(field){
	switch (true){
		case !field:
			return 'formatter-none'
		case !field.value_format && !field.value_format_name && !field.html:
			return 'formatter-none'
		case !!(field.value_format_name && field.value_format_name.match(/^percent_[0-9]$/)): 
			return 'formatter-percent-n'
		case !!(field.value_format && field.value_format.match(/^#,##0.0%$/)): 
			return 'formatter-ad-hoc-01'
		default: 
			return 'formatter-big-complex-default'
		}
	}