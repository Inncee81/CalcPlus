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
			element = document.getElementsByClassName(query);
		} else  {
			tag = true;
			element = document.getElementsByTagName(query);
		}
	}
	
	var checked = function(value) {
		if (value == undefined) {
			return element.checked;
		}
		element.checked = value;
	}
	
	var click = function(code) {
		element.addEventListener("click", code);
	}
	
	var val = function() {
		return element.value;
	}
}
function store(item) {
	var local = function(item2) {
		if (item2 == undefined) {
			return localStorage.getItem(item);
		}
		localStorage.setItem(item, item2);
	}
	var session = function(item2) {
		if (item2 == undefined) {
			return sessionStorage.getItem(item);
		}
		sessionStorage.setItem(item, item2);
	}
}
