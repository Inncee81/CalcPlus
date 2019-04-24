function $(query) {
	if (query == undefined) {
	} else {
		var local = function(item2) {
			if (item2 == undefined) {
				return localStorage.getItem(item);
			}
			return localStorage.setItem(item, item2);
		}
		
		var session = function(item2) {
			if (item2 == undefined) {
				return sessionStorage.getItem(item);
			}
			return sessionStorage.setItem(item, item2);
		}
		
		var select = function() {
			return document.querySelector(query);
		}
		
		var css = {
			sheet = window.document.styleSheets[query];
			append: function(item) {
				sheet.insertRule(item, sheet.cssRules.length);
			},
			replace: function(item) {
				var prelength = sheet.cssRules.length;
				sheet.insertRule(item, sheet.cssRules.length);
				var postlength = sheet.cssRules.length;
				for (var i=0; i<2*prelength-postlength; i++) {
					sheet.deleteRule(i);
				}
			}
		};

		var element;
		query.split("#");
		if (query.length == 2) {
			query = query[1];
			element = document.getElementById(query);
		} else {
			query = query.toString().split(".");
			if (query.length == 2) {
				query = query[1];
				element = document.getElementsByClassName(query);
			} else  {
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
			return element.addEventListener("click", code);
		}

		var val = function() {
			return element.value;
		}

		var get = function() {
			return element;
		}
		
		var html = {
			append: function(item) {
				element.innerHTML += item;
			},
			replace: function(item) {
				element.innerHTML = item;
			}
		};
		
		var text = {
			append: function(item) {
				element.textContent += item;
			},
			replace: function(item) {
				element.textContent = item;
			}
		};
	}
}
