export default function formatRouter(formatString){
	switch (true){
		case !formatString:
			return 'formatter-none'
		case !!formatString.match(/percent_[0-9]/): 
			return 'formatter-percent-n'
		default: 
			return 'formatter-big-complex-default'
		}
	}