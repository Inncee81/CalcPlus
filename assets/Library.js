// Copyright 2019 VirxEC - Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
function parseNums(num1, num2, mode) {
	if (["string","object"].indexOf(typeof num1)==-1) throw new TypeError("The first number wasn't a string (or object). It has to be a string (or object).");
	if (["string","object"].indexOf(typeof num2)==-1) throw new TypeError("The second number wasn't a string (or object). It has to be a string (or object). Note that an object input is ment to submit a pre-parsed number.");
	if (typeof mode != "number" || [1,2,3,4].indexOf(mode)==-1) throw new TypeError("The mode must be a number from 1-4.");
  var skip=false, stringMode1=true, stringMode2=true, neg=[false, false, false], decimal=0, decimal1=0, decimal2=0, num1pos, num2pos, maxChar, numl;
  if (typeof num1 == "object") neg[1] = num1.isNeg, decimal1 = num1.decimals, num1 = num1.num, stringMode1 = false;
	if (typeof num2 == "object") neg[2] = num2.isNeg, decimal2 = num2.decimals, num2 = num2.num, stringMode2 = false;
  if (stringMode1) {
    if (num1.length == 2) {
      num1 = num1.split("-")[1], neg[1] = true;
    } else num1 = num1.toString();
  }
  if (stringMode2) {
    if (num2.length == 2) {
      num2 = num2.split("-")[1], neg[2] = true;
    } else num2 = num2.toString();
  }

	if (neg[1]!=neg[2] && mode != 1 && mode != 2) neg[0] = true;
	if (stringMode1) num1 = num1.split('');
  if (stringMode2) num2 = num2.split('');

	Array.prototype.remove = function() {
		var what, a = arguments, L = a.length, ax;
		while (L && this.length) {
			what = a[--L];
			while ((ax=this.indexOf(what))!=-1) this.splice(ax, 1);
		}
		return this;
	};

  if (stringMode1) num1 = num1.remove(",");
  num1pos = num1.indexOf("."), decimal1 = num1pos!=-1 ? num1.remove(".").length-num1pos:0;
	if (stringMode2) num2 = num2.remove(",");
  num2pos = num2.indexOf("."), decimal2 = num2pos!=-1 ? num2.remove(".").length-num2pos:0;
  decimal = mode == 1 || mode == 2 ? Math.max(decimal1, decimal2):mode==3 ? decimal1+decimal2:decimal1-decimal2;
  if (decimal<0) decimal = 0;
  
	if (decimal1 != decimal2 && [1,2].indexOf(mode)>-1) {
		if (decimal1 == decimal && stringMode2) for (var i=0;i<decimal1-decimal2;i++) num2.push("0");
		else if (decimal2 == decimal && stringMode1) for (var i=0;i<decimal2-decimal1;i++) num1.push("0");
	}
	maxChar = Math.max(num1.length, num2.length);
	if (num1.length != num2.length && [1,2].indexOf(mode)>-1) {
    numl = [num1.length, num2.length];
		if (maxChar == numl[0] && stringMode2) for (var i=0; i<numl[0]-numl[1]; i++) num2.unshift("0");
		else if (maxChar != num1[0] && stringMode1) for (var i=0; i<numl[1]-numl[0]; i++) num1.unshift("0");
	}

	if (neg[0]) neg[0] = mode==3 && neg[1] && neg[2] ? false:neg[0];
	for (var i=0; i<num2.length && (neg[1]||neg[2]) && !skip && mode != 3 && mode != 4; i++) if (+num2[i] > +num1[i]) neg[0] = true, skip = true;

	if (mode == 4 || mode == 3) {
    if (stringMode1) num1 = num1.join('');
    if (stringMode2) num2 = num2.join('');
  }
	return {
		num1: {
			num: num1,
			isNeg: neg[1],
			decimals: decimal1
		},
		num2: {
			num: num2,
			isNeg: neg[2],
			decimals: decimal2
		},
		isNeg: neg[0],
		maxChar: maxChar,
		decimals: decimal
	};
}
function formatNums(final,decimals,neg) {
  if (typeof final == "string") {
    if (decimals>0) {
      final = final.split("");
      final.splice(final.length-decimals, 0, ".");
      final = final.join("");
    }
  } else if (typeof final == "object") {
    if(decimals>0) {
      final = final.reverse();
      final.splice(final.length-decimals, 0, ".");
      final = final.join("");
    } else final = final.reverse().join("");
  }
	final = neg[0] ? "-"+final:final;
	final = ["",".","-"].indexOf(final)>-1 ? "0":final;
	return final;
}
var rNeg = num => (num.split("-")[1]);
function add() {
	var a = arguments;
	function tempadd(num1, num2) {
		var parsedNums = parseNums(num1, num2, 1), neg=[parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], maxChar=parsedNums.maxChar, decimal=[parsedNums.decimals, parsedNums.num1.decimals,parsedNums.num2.decimals], num1=parsedNums.num1.num, num2=parsedNums.num2.num, time, final=[], carry="0", finali;
		if (neg[2]) return sub(parsedNums.num1, {num:num2,isNeg:false,decimals:decimal[1]});
		else if (neg[1]) return sub(parsedNums.num2, {num:num1,isNeg:false,decimals:decimal[2]});
		for (var i=maxChar-1; i>=0;i--) {
			finali = maxChar-i-1;
			if(time != i+1) carry = "0";
			final[finali] = String(+num1[i]+(+num2[i])+(+carry));
			if(+final[finali] > 9) {
				var temp = final[finali].split('');
				final[finali] = temp[1], carry = temp[0], time = i;
				if (i-1 < 0) final.push(carry);
			}
		}
		return formatNums(final, decimal[0], neg);
	}
	if (Array.isArray(a[0])) a = a[0];
	var permfinal = tempadd(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = tempadd(permfinal, a[i]);
	return permfinal;
}
function sub() {
	var a = arguments;
	function tempsub(num1pre, num2pre) {
		var parsedNums = parseNums(num1pre, num2pre, 2), neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], maxChar = parsedNums.maxChar, decimal = [parsedNums.decimals,parsedNums.num1.decimals,parsedNums.num2.decimals], num1 = parsedNums.num1.num, num2 = parsedNums.num2.num, final = [], finali, fans;
    if (neg[1] && neg[2]) num1=[num2,num2=num1][0];
		else if (neg[2] && !neg[1]) return add(parsedNums.num1, {num:num2,isNeg:false,decimals:decimal[2]});
    else if (neg[1] && !neg[2]) return "-"+add({num:num1,isNeg:false,decimals:decimal[1]}, parsedNums.num2);

		for (var i=maxChar-1; i>=0;i--) {
			finali = maxChar-i-1, fans = num1[i]-num2[i];
			if (fans<0 && i!=0) final[finali] = String(fans+10), num1[i-1]-=1;
      else if (fans<0 && i==0) final[finali] = String(fans).split("-")[1];
		}
		return formatNums(final, decimal[0], neg);
	}
	if (Array.isArray(a[0])) a = a[0];
	var permfinal = tempsub(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = tempsub(permfinal, a[i]);
	return permfinal;
}
function isLessThan() {
	var a = arguments;
	function templessthan(num1, num2) {
		var num = sub(num1, num2).split("-");
		if (num.length == 1) return false;
		return true;
	}
	if (typeof a[0] == "object") a = a[0];
	var permfinal = templessthan(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = templessthan(permfinal, a[i]);
	return permfinal;
}
function isGreaterThan() {
	var a = arguments;
	function tempgreaterthan(num1, num2) {
		var num = sub(num1, num2).split("-");
		if (num.length == 2 || num[0] == "0") return false;
		return true;
	}
	if (typeof a[0] == "object") a = a[0];
	var permfinal = tempgreaterthan(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = tempgreaterthan(permfinal, a[i]);
	return permfinal;
}
function isLessThanEqual() {
	var a = arguments;
	function templessthanequal(num1, num2) {
		var num = sub(num1, num2).split("-");
		if (num.length == 1) return false;
		return true;
	}
	if (typeof a[0] == "object") a = a[0];
	var permfinal = templessthanequal(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = templessthanequal(permfinal, a[i]);
	return permfinal;
}
function isGreaterThanEqual() {
	var a = arguments;
	function tempisgreaterthanequal(num1, num2) {
		var num = sub(num1, num2).split("-");
		if (num.length == 2) return false;
		return true;
	}
	if (typeof a[0] == "object") a = a[0];
	var permfinal = tempisgreaterthanequal(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = tempisgreaterthanequal(permfinal, a[i]);
	return permfinal;
}
function round(num) {
	num = num.split(".");
	num[1] = num[1].split("");
	if (isGreaterThanEqual(num[1][0], "5")) return add(num[0], "1");
	return num[0];
}
function roundDown(num) {
	num = num.split(".");
	return num[0];
}
function roundUp(num) {
	num = num.split(".");
	return add(num[0], "1");
}
function multi() {
	var a = arguments;
	function tempmulti(num1, num2) {
		var parsedNums = parseNums(num1, num2, 3), neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], num1 = parsedNums.num1.num, num2 = parsedNums.num2.num, final = "", decimals=parsedNums.decimals, numArray = [];
		for (var i = "0"; isLessThan(i, num2); i=add(i, "1")) numArray.push(num1);
		final = numArray.length>1 ? add(numArray):(numArray.length==0) ? "0":numArray[0];
		return formatNums(final, decimals, neg);
	}
	if (typeof a[0] == "object") a = a[0];
	var permfinal = tempmulti(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = tempmulti(permfinal, a[i]);
	return permfinal;
}
function expo() {
	var a = arguments;
	function tempexpo(num1, num2) {
		var parsedNums = parseNums(num1, num2, 3), num2 = parsedNums.num2.num, decimals = parsedNums.decimals, decimal2 = parsedNums.num2.decimals, neg = [parsedNums.num1.isNeg, parsedNums.num2.isNeg];
		if (neg[0]) num1 = "-"+num1;
		if (neg[1]) num2 = "-"+num2;
		if (decimal2>0) {
			// root_of_decimal2*10(num1)**(num2*(10*decimal2))
			alert("Decimal exponents aren't supported yet");
			throw new TypeError("Decimal exponents aren't supported yet");
		} else {
			//Need to fix div -> if (num2.split("-").length == 2) return div("1", multi(num1, num2));
			var final = multi(num1, num1);
			for (var i=2; isLessThan(i.toString(), num2); i++) final = multi(final, num1);
			return final;
		}
	}
	if (typeof a[0] == "object") a = a[0];
	var permfinal = tempexpo(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = tempexpo(permfinal, a[i]);
	return permfinal;
}
function div() {
	var a = arguments, maxDecimal;
	function tempdiv(num1, num2) {
		var parsedNums = parseNums(num1, num2, 4), neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], num1 = parsedNums.num1.num, num2 = parsedNums.num2.num;
		// Concept for v3 found
	}

	if (typeof a[0] == "object") maxDecimal = a[1], a = a[0];
	else maxDecimal = a[2];
	var permfinal = tempdiv(a[0], a[1], maxDecimal);
	for (var i=2; i<a.length; i++) permfinal = tempdiv(permfinal, a[i], maxDecimal);
	return permfinal;
}
