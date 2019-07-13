function $(query) {
	query = query.toString();

	var select = () => document.querySelector(query);
	var create = () => document.createElement(query);

	var css = {
		append: function(index, item) {
			var sheet = document.styleSheets[index];
			sheet.insertRule(item, sheet.cssRules.length);
		},
		replace: function(index, item) {
			var sheet = document.styleSheets[index];
			for (var i=0; i<sheet.cssRules.length; i++) sheet.deleteRule(i);
			sheet.insertRule(item, sheet.cssRules.length);
		},
		delete: function(index, index2) {
			document.styleSheets[index].deleteRule(index2);
		},
		replaceWithAll: function(index, items) {
			var sheet = document.styleSheets[index];
			for (var i=0; i<sheet.cssRules.length; i++) sheet.deleteRule(i);
			for (var i=0; i<items.length; i++) sheet.insertRule(items[i], sheet.cssRules.length);
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
				} else element = document.getElementsByTagName(query);
			}
		}
	}

	var checked = function(value) {
		if (value == undefined) return element.checked;
		element.checked = value;
	}

	var click = code => element.addEventListener("click", code);
	var val = () => element.value;

	var me = function() {
		if (local) return localStorage.getItem(query);
		else if (session) return sessionStorage.getItem(query);
		return element;
	}

	var set = function(item) {
		if (local) localStorage.setItem(query, item);
		else if (session) sessionStorage.setItem(query, item);
	}

	var remove = () => {element.remove()};

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
		select: select,
		create: create,
		css: css,
		checked: checked,
		click: click,
		val: val,
		me: me,
		set: set,
		html: html,
		text: text,
		remove: remove
	}
}

var cpQuery = q => $(q);
