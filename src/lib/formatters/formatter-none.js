// Could actually be importing a large library like 
export default function noFormatter(/*field*/){
	return value => {
		if(value.toJSON){value.toJSON()}
		return value.toString()
		}
	}