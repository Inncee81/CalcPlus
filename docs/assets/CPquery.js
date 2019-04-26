function $(query) {
	try {
		if (query == undefined) {
			return;
		} else {
			query = query.toString();
			
			var select = function() {
				return document.querySelector(query);
			}

			var create = function() {
				return document.createElement(query);
			}

			var css = {
				append: function(index, item) {
					var sheet = document.styleSheets[parseInt(index)];
					sheet.insertRule(item, sheet.cssRules.length);
				},
				replace: function(index, item) {
					var sheet = document.styleSheets[parseInt(index)];
					for (var i=0; i<sheet.cssRules.length; i++) {
						sheet.deleteRule(i);
					}
					sheet.insertRule(item, sheet.cssRules.length);
				},
				delete: function(index, index2) {
					var sheet = document.styleSheets[index];
					sheet.deleteRule(index2);
				}
			};

			var element;
			var local = false;
			var session = false;
			query = query.split("#");
			if (query.length == 2) {
				query = query[1];
				element = document.getElementById(query);
			} else {
				query = query.toString().split(".");
				if (query.length == 2) {
					query = query[1];
					element = document.getElementsByClassName(query);
				} else {
					query = query.toString().split("@");
					if (query.length == 2) {
						query = query[1];
						local = true;
					} else {
						query = query.toString().split("*");
						if (query.length == 2) {
							query = query[1];
							session = true;
						}
						element = document.getElementsByTagName(query);
					}
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
			
			var me = function() {
				if (local) {
					console.log(localStorage.getItem(query));
					return localStorage.getItem(query);
				} else if (session) {
					return sessionStorage.getItem(query);
				}
				return element;
			}

			var set = function(item) {
				if (local) {
					localStorage.setItem(query, item);
				} else if (session) {
					sessionStorage.setItem(query, item);
				}
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
			
			return {
				local: local,
				session: session,
				select: select,
				create: create,
				css: css,
				checked: checked,
				click: click,
				val: val,
				me: me,
				set: set,
				html: {
					append: html.append,
					replace: html.replace
				},
				text: {
					append: text.append,
					replace: text.replace
				}
			}
		}
	} catch(err) {
		throw new Error(err);
	}
}

function cpQuery() {
	return $();
}
