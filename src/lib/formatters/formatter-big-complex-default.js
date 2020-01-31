// Could actually be importing a large library like 
export default function genericFormatter(format){
	return value => {
		if(format){return `${value} (${format})`}
		if(vaue.toJSON){value.toJSON()}
		return value.toString()
		}
	}