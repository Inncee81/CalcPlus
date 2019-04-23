function $(query) {
	var id = false;
	var class = false;
	var tag = false;
	var element;
	
	query.split("#");
	if (query.length == 2) {
		id = true;
		query = query[1];
		element = document.getElementById(query);
	} else {
		query = query.toString().split(".");
		if (query.length == 2) {
			class = true;
			query = query[1];
			element = document.getElementByClass(query);
		} else  {
			tag = true;
		}
	}
	
	var checked = function() {
		
	}
}
