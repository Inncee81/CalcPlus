// Copyright 2019 Eric Michael Veilleux - Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
var clone = o => JSON.parse(JSON.stringify(o));

function parseNums(num1pre, num2pre, mode) {
 var num = [undefined, num1pre, num2pre],
		skip = false,
		stringMode = [undefined, true, true],
		neg = [false, false, false],
		decimal = [0, 0, 0],
		numpos = [undefined], maxChar, numl, numisplit;
	for (var i = 1; i <3; i++) {
		if (num[i].num != undefined) neg[i] = num[i].isNeg, decimal[i] = num[i].decimals, num[i] = num[i].num, stringMode[i] = false;
		if (stringMode[i]) {
			numisplit = num[i].split("-");
			if (numisplit.length == 2) num[i] = numisplit[1], neg[i] = true;
			if (num[i].split(".").length == 2) num[i] = num[i].replace(/\.?0+$/g, '');
			num[i] = num[i].replace(/(,)|(^0+)/g, "");
			if (num[i].length > 1 && num[i].charAt(0) == ".") num[i] = "0"+num[i];
			if (num[i].charAt(num[i].length-1) == "." || num[i].charAt(0) == ".") num[i] = num[i].replace(".", "");
			num[i] = ["", ".", "-"].indexOf(num[i]) > -1 ? "0" : num[i];
		}
		if (!Array.isArray(num[i])) num[i] = num[i].split("");
		numpos[i] = num[i].indexOf("."), num[i] = num[i].filter(w => w != "."), decimal[i] = numpos[i] != -1 ? num[i].length - numpos[i] : 0;
	}
	if (neg[1] != neg[2] && mode != 1 && mode != 2) neg[0] = true;
	maxChar = Math.max(num[1].length, num[2].length);
	if (decimal[1] > 0 || decimal[2] > 0) {
		decimal[0] = mode == 1 || mode == 2 ? Math.max(decimal[1], decimal[2]) : mode == 3 ? decimal[1] + decimal[2] : decimal[1] - decimal[2];
		if (decimal[0] < 0) decimal[0] = 0;
	}
	for (i = 0; !skip && (neg[1] || neg[2]) && mode == 1 && num[2].length == maxChar && i < num[1].length; i++)
		if (num[2][i] > num[1][i]) neg[0] = true, skip = true;
	if (mode == 2 && num[2].length == maxChar && num[1].length != maxChar) neg[0] = true;
	for (i = 0; !skip && !neg[0] && mode == 2 && num[2].length == maxChar && i < num[1].length; i++) {
		if (num[1][i] < num[2][i]) neg[0] = true, skip = true;
		else skip = num[2][i] != num[1][i];
	}
	if (maxChar == num[2].length && mode == 3) num[1] = [num[2], num[2] = num[1]][0];
	if (decimal[1] != decimal[2] && [1, 2].indexOf(mode) > -1) {
		if (decimal[1] == decimal[0])
			for (i = 0; i < decimal[1] - decimal[2]; i++) num[2].push("0");
		else if (decimal[2] == decimal[0])
			for (i = 0; i < decimal[2] - decimal[1]; i++) num[1].push("0");
	}
	if (num[1].length != num[2].length && [1, 2].indexOf(mode) > -1) {
		numl = [num[1].length, num[2].length];
		if (maxChar == numl[0])
			for (i = 0; i < numl[0] - numl[1]; i++) num[2].unshift("0");
		else if (maxChar == numl[1])
			for (i = 0; i < numl[1] - numl[0]; i++) num[1].unshift("0");
	}
	if ([3, 4].indexOf(mode) > -1 && neg[1] && neg[2]) neg[0] = false;
	return {
		num1: {
			num: num[1],
			isNeg: neg[1],
			decimals: decimal[1]
		},
		num2: {
			num: num[2],
			isNeg: neg[2],
			decimals: decimal[2]
		},
		isNeg: neg[0],
		maxChar: maxChar,
		decimals: decimal[0]
	};
}

function formatNums(final, decimals, neg) {
 	if (array && final.length > 1) final = final.reverse();
	if (decimals > 0) final.splice(decimals, 0, ".");
	if (array) final = final.length > 1 ? final.join(""):final[0];
	if (neg[0]) final = "-"+final;
	if (final.split(".").length == 2) final = final.replace(/\.?0+$/g, '');
	final = final.replace(/^0+/g, '');
	if (final.length > 1 && final.charAt(0) == ".") final = "0"+final;
	if (final.charAt(final.length-1) == "." || final.charAt(0) == ".") final = final.replace(".", "");
	final = ["", ".", "-"].indexOf(final) > -1 ? "0" : final;
	return final;
}

function add() {
 function tempadd(num1, num2) {
	var parsedNums = parseNums(num1, num2, 1),
		neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
		decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals],
		maxChar = parsedNums.maxChar,
		num = [null, parsedNums.num1.num, parsedNums.num2.num],
		final = [],
		carry = "0",
		finali, time;
	if (neg[2]) return sub(parsedNums.num1, {
		num: num[2],
		isNeg: false,
		decimals: decimal[1]
	});
	else if (neg[1]) return sub(parsedNums.num[2], {
		num: num[1],
		isNeg: false,
		decimals: decimal[2]
	});
	for (var i = maxChar - 1; i >= 0; i--) {
		finali = maxChar - i - 1;
		if (time != i + 1) carry = "0";
		final[finali] = String(+num[1][i] + (+num[2][i]) + (+carry));
		if (+final[finali] > 9) {
			var temp = final[finali].split('');
			final[finali] = temp[1], carry = temp[0], time = i;
			if (i - 1 < 0) final.push(carry);
		}
	}
	return formatNums(final, decimal[0], neg);
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempadd(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempadd(permfinal, a[i]);
 return permfinal;
}

function sub() {
	function tempsub(num1pre, num2pre) {
		var parsedNums = parseNums(num1, num2, 2),
			neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
			maxChar = parsedNums.maxChar,
			decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals],
			num1 = [parsedNums.num1.num, parsedNums.num2.num],
			final = [],
			finali, fans;
		if (neg.indexOf(true) > -1) {
			if ((neg[0] && !neg[1] && !neg[2]) || (neg[1] && neg[2]))  num[1] = [num[2], num[2] = num[1][0];
			else if (neg[2] && !neg[1]) return add(parsedNums.num1, {
				num: num[2],
				isNeg: false,
				decimals: decimal[2]
			});
			else if (neg[1] && !neg[2]) return "-" + add({
				num: num[1],
				isNeg: false,
				decimals: decimal[1]
			}, parsedNums.num2);
		}
		for (var i = maxChar - 1; i >= 0; i--) {
			finali = maxChar - i - 1, fans = num[1][i] - num[2][i];
			if (fans < 0 && i != 0) {
				var j = i - 1;
				final[finali] = String(fans + 10), num[1][j] = String(num[1][j] - 1);
				while (num1[j] < 0 && j != 0) num[1][j] = String((+num[1][j]) + 10), j = j - 1, num[1][j] = String(num[1][j] - 1);
			} else if (fans <= 0 && i == 0) final[finali] = String(fans).split("-").length > 1 ? String(fans).split("-")[1]: String(fans);
			else final[finali] = fans;
		}
		return formatNums(final, decimal[0], neg);
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempsub(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempsub(permfinal, a[i]);
 return permfinal;
}

function isLessThan() {
 function templessthan(num1, num2) {
  var num = sub(num2, num1);
  if (num.split("-").length == 1 && num != 0) return true;
  return false;
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = templessthan(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = templessthan(permfinal, a[i]);
 return permfinal;
}

function isGreaterThan() {
 function tempgreaterthan(num1, num2) {
  var num = sub(num1, num2);
  if (num.split("-").length == 1 && num != 0) return true;
  return false;
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempgreaterthan(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempgreaterthan(permfinal, a[i]);
 return permfinal;
}

function isLessThanEqual() {
 function templessthanequal(num1, num2) {
  if (sub(num2, num1).split("-").length == 1) return true;
  return false;
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = templessthanequal(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = templessthanequal(permfinal, a[i]);
 return permfinal;
}

function isGreaterThanEqual() {
 function tempisgreaterthanequal(num1, num2) {
  if (sub(num1, num2).split("-").length == 1) return true;
  return false;
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempisgreaterthanequal(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempisgreaterthanequal(permfinal, a[i]);
 return permfinal;
}

function round(num) {
 num = num.split("."), num[1] = num[1].split("");
 if (isGreaterThanEqual(num[1][0], {
   num: ["5"],
   isNeg: false,
   decimals: 0
  })) return add(num[0], {
  num: ["1"],
  isNeg: false,
  decimals: 0
 });
 return num[0];
}

function roundDown(num) {
 return num.split(".")[0];
}

function roundUp(num) {
 return add(num.split(".")[0], {
  num: ["1"],
  isNeg: false,
  decimals: 0
 });
}

function multi() {
	function tempmulti(num1pre, num2pre) {
		var parsedNums = parseNums(num1, num2, 3),
			neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
			final = "",
			decimals = parsedNums.decimals,
			num2 = parsedNums.num2,
			num1 = parsedNums.num1;
		if (num2.num.length == 1 && num2.num[0] == "1") return formatNums(num2.num, decimals, neg);
		else if (num2.length == 1 && num2[0] == "0") return "1";
		else {
			final = add(num1, num1);
			for (var i = "2"; isLessThan(i, num2); i = add({
					num: i.split(""),
					isNeg: false,
					decimals: 0
				}, predefone)) final = add(final, num1);
		}
		return formatNums(final, decimals, neg, false);
	}
	var permfinal, a = clone(arguments);
	if (Array.isArray(a[0])) a = a[0];
	permfinal = tempmulti(a[0], a[1]);
	for (var i = 2; i < a.length; i++) permfinal = tempmulti(permfinal, a[i]);
	return permfinal;
}

function expo() {
	function tempexpo(num1pre, num2pre) {
  	var parsedNums = parseNums(num1, num2, 5),
			num1 = parsedNums.num1,
			num2 = parsedNums.num2,
			decimals = parsedNums.decimals,
			decimal2 = parsedNums.num2.decimals,
			neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
			final = "";
		if (neg[1]) num1.num.unshift("-");
		if (neg[2]) num2.num.unshift("-");
		if (decimal2 > 0) {
			// root_of_decimal2*10(num1)**(num2*(10*decimal2))
			alert("Decimal exponents aren't supported yet");
			throw new TypeError("Decimal exponents aren't supported yet");
		} else {
			if (num2.num.length == 1 && num2.num[0] == "1") return formatNums(num2.num, decimals, false);
			else if (num2.num.length == 1 && num2.num[0] == "0") return "1";
			else {
				final = multi(num1, num1);
				for (var i = "2"; isLessThan(i, num2); i = add({
						num: i.split(""),
						isNeg: false,
						decimals: 0
					}, predefone)) final = multi(final, num1);
				return final;
			}
			//Need to fix div -> if (neg[2]) return div("1", final, );
		}
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempexpo(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempexpo(permfinal, a[i]);
 return permfinal;
}

function div() {
 function tempdiv(num1, num2) {
  var parsedNums = parseNums(num1, num2, 4),
   neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
   num1 = parsedNums.num1,
   num2 = parsedNums.num2,
   num = sub(num1, num2),
   final = "1";
  while (isLessThanEqual(num2, num)) {
   num = sub(num, num2), final = add(final, {
    num: ["1"],
    isNeg: false,
    decimals: 0
   });
   log(num)
  }
  return final;
 }
 var permfinal, maxDecimal, a = clone(arguments);
 if (Array.isArray(a[0])) maxDecimal = a[1], a = a[0];
 else maxDecimal = a[2];
 permfinal = tempdiv(a[0], a[1], maxDecimal);
 for (var i = 2; i < a.length; i++) permfinal = tempdiv(permfinal, a[i], maxDecimal);
 return permfinal;
}
var a = add,
 s = sub,
 m = multi,
 d = div,
 e = expo,
 l = isLessThan,
 g = isGreaterThan,
 le = isLessThanEqual,
 ge = isGreaterThanEqual,
 r = round,
 ru = roundUp,
 rd = roundDown;
