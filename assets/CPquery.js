/* Copyright 2019 Eric Michael Veilleux
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0*/
function cpQuery(q) {
	var select = () => document.querySelector(query), create = () => document.createElement(query);
	function css() {
		function append(index, item) {
			var sheet = document.styleSheets[index];
			sheet.insertRule(item, sheet.cssRules.length);
		}
		function replace(index, item) {
			var sheet = document.styleSheets[index];
			for (var i=0; i<sheet.cssRules.length; i++) sheet.deleteRule(i);
			sheet.insertRule(item, sheet.cssRules.length);
		}
		function remove(index, index2) {
			document.styleSheets[index].deleteRule(index2);
		}
		function replaceWithAll(index, items) {
			var sheet = document.styleSheets[index];
			for (var i=0; i<sheet.cssRules.length; i++) sheet.deleteRule(i);
			for (var i=0; i<items.length; i++) sheet.insertRule(items[i], sheet.cssRules.length);
		}
		return {
			append: append,
			replace: replace,
			remove: remove,
			replaceWithAll: replaceWithAll
		}
	}

	var element, local = false, session = false;
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

	function checked(value) {
		if (value == undefined) return element.checked;
		element.checked = value;
	}

	function click(code) {
		element.addEventListener("click", code);
	}
	
	function val() {
		return element.value;
	}

	function me() {
		if (local) return localStorage.getItem(query);
		else if (session) return sessionStorage.getItem(query);
		return element;
	}

	function set(item) {
		if (local) localStorage.setItem(query, item);
		else if (session) sessionStorage.setItem(query, item);
	}

	function remove() {
		element.remove();
	}

	function html() {
		function append(item) {
			element.innerHTML += item;
		}
		
		function replace(item) {
			element.innerHTML = item;
		}
		return {
			append: append,
			replace: replace,
		}
	}

	function text() {
		function append(item) {
			element.textContent += item;
		}
		
		function replace(item) {
			element.textContent = item;
		}
		return {
			append: append,
			replace: replace
		}
	}

	return {
		select: select,
		create: create,
		css: {
			append: css.append,
			replace: css.replace,
			remove: css.remove,
			replaceWithAll: css.replaceWithAll
		},
		checked: checked,
		click: click,
		val: val,
		me: me,
		set: set,
		html: {
			append: html.append,
			replace: html.replace,
		},
		text: text,
		remove: remove
	}
}

function $(q){return cpQuery(q)};
