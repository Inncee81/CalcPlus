// Copyright 2019 VirxEC - Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
function parseNums(num1, num2, mode) {
	if (typeof num1 != "string") throw new TypeError("The first number wasn't a string. It has to be a string.");
	if (typeof num2 != "string") throw new TypeError("The second number wasn't a string. It has to be a string.");
	if (typeof mode != "number" || [1,2,3,4].indexOf(mode)==-1) throw new TypeError("The mode must be a number from 1-4.");

	var neg = [false, false, false], decimal = 0, decimal1 = 0, decimal2 = 0, skip = false;
	num1 = num1.split("-"), num2 = num2.split("-");
	if (num1.length == 2) {
		num1 = num1[1];
		neg[1] = true;
	} else num1 = num1.toString();
	if (num2.length == 2) {
		num2 = num2[1];
		neg[2] = true;
	} else num2 = num2.toString();

	if ((neg[1]||neg[2]) && (neg[1]!=neg[2])) neg[0] = true;
	num1 = num1.split(''), num2 = num2.split('');

	Array.prototype.remove = function() {
		var what, a = arguments, L = a.length, ax;
		while (L && this.length) {
			what = a[--L];
			while ((ax = this.indexOf(what)) !== -1) this.splice(ax, 1);
		}
		return this;
	};

	num1.remove(",");
	num2.remove(",");
	var num1pos = num1.indexOf("."), num2pos = num2.indexOf(".");
	decimal1 = num1pos!=-1 ? num1.remove(".").length-num1pos:0, decimal2 = num2pos!=-1 ? num2.remove(".").length-num2pos:0,decimal = mode == 1 || mode == 2 ? Math.max(decimal1, decimal2):decimal1+decimal2;
  
	if (decimal1 != decimal2 && [1,2].indexOf(mode)>-1) {
		if (decimal1 == decimal) for (var i=0;i<decimal1-decimal2;i++) num2.push("0");
		else for (var i=0;i<decimal2-decimal1;i++) num1.push("0");
	}
	var maxChar = Math.max(num1.length, num2.length);
	if (num1.length != num2.length && [1,2].indexOf(mode)>-1) {
    var numl = [num1.length, num2.length];
		if (maxChar == numl[0]) for (var i=0; i<numl[0]-numl[1]; i++) num2.unshift("0");
		else for (var i=0; i<numl[1]-numl[0]; i++) num1.unshift("0");
	}

	neg[0] = mode==3 && neg[1] && neg[2] ? false:neg[0];
	for (var i=0; i<num2.length && !skip && !neg[0] && mode != 1 && mode != 3; i++) {
		if (parseInt(num2[i]) > parseInt(num1[i])) neg[0] = true, skip = true;
		else if (parseInt(num1[i]) > parseInt(num2[i])) skip = true;
	}

	if (mode == 4 || mode == 3) num1 = num1.join(''), num2 = num2.join('');
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
function checkA(a) {
	if (a.length<2 && typeof a[0]!="object") throw new Error("Function must have at least 2 inputs unless the first input is an array");
	else if (a.length>1 && typeof a[0]=="object") throw new Error("The first input of the function was an array but there was more than 1 input");
}
function add() {
	var a = arguments;
	checkA(a);
	function tempadd(num1, num2) {
		var parsedNums = parseNums(num1, num2, 1), neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], maxChar = parsedNums.maxChar, decimals = parsedNums.decimals, num1 = parsedNums.num1.num, num2 = parsedNums.num2.num, time, final = [], carry = "0";
		if (neg[1] || neg[2]) {
			if (neg[1] && neg[2]) return formatNums(sub("-"+num1.join(''), num2.join('')), decimals, [false]);
			else if (neg[2]) return formatNums(sub(num1.join(''), num2.join('')), decimals, [false]);
			else if (neg[1]) return formatNums(sub(num2.join(''), num1.join('')), decimals, [false]);
		}
		for (var i=maxChar-1; i>=0;i--) {
			var finali = maxChar-i-1;
			if(time != i+1) carry = "0";
			final[finali] = (parseInt(num1[i])+parseInt(num2[i])+parseInt(carry)).toString();
			if(parseInt(final[finali]) > 9) {
				var temp = final[finali].split('');
				final[finali] = temp[1], carry = temp[0], time = i;
				if (i-1 < 0) final.push(carry);
			}
		}
		return formatNums(final, decimals, neg);
	}
	if (typeof a[0] == "object") a = a[0];
	var permfinal = tempadd(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = tempadd(permfinal, a[i]);
	return permfinal;
}
function sub() {
	var a = arguments;
	checkA(a);
	function tempsub(num1, num2) {
		var parsedNums = parseNums(num1, num2, 2), neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], maxChar = parsedNums.maxChar, decimals = parsedNums.decimals, num1 = parsedNums.num1.num, num2 = parsedNums.num2.num, final = [];
		if (neg[1] || neg[2]) {
			if (neg[1] && neg[2]) num1=[num2,num2=num1][0];
			else if (neg[2]) return add(num1.join(''), num2.join(''));
			else if (neg[1]) return "-"+add(num1.join(''), num2.join(''));
		}
		if (neg[0]) num1=[num2,num2=num1][0];

		for (var i=maxChar-1; i>=0;i--) {
			var finali = maxChar-i-1, fans = parseInt(num1[i])-parseInt(num2[i]);
			if (fans < 0) fans+=10, num1[i-1]-=1;
			final[finali] = fans.toString();
		}
		return formatNums(final, decimals, neg);
	}
	if (typeof a[0] == "object") a = a[0];
	var permfinal = tempsub(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = tempsub(permfinal, a[i]);
	return permfinal;
}
function isLessThan() {
	var a = arguments;
	checkA(a);
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
	checkA(a);
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
	checkA(a);
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
	checkA(a);
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
	checkA(a);
	function tempmulti(num1, num2) {
		var parsedNums = parseNums(num1, num2, 3), neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], num1 = parsedNums.num1.num, num2 = parsedNums.num2.num, final = "", decimals=parsedNums.decimals, numArray = [], decArray = [];
		for (var i = "0"; isLessThan(i, num2); i=add(i, "1")) numArray.push(num1);
		final = numArray.length > 1 ? add(numArray):(numArray.length==0) ? "0":numArray[0];
		return formatNums(final, decimals, neg);
	}
	if (typeof a[0] == "object") a = a[0];
	var permfinal = tempmulti(a[0], a[1]);
	for (var i=2; i<a.length; i++) permfinal = tempmulti(permfinal, a[i]);
	return permfinal;
}
function expo() {
	var a = arguments;
	checkA(a);
	function tempexpo(num1, num2) {
    var parsedNums = parseNums(num1, num2, 3), num2 = parsedNums.num2.num, decimals = parsedNums.decimals, decimal2 = parsedNums.num2.decimals, neg = [parsedNums.num1.isNeg, parsedNums.num2.isNeg];
    if (neg[0]) num1 = "-"+num1;
    if (neg[1]) num2 = "-"+num2;
    console.log(num1, num2, decimal2);
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
	if (a.length<3 && typeof a[0]!="object") throw new Error("Function must have at least 3 inputs unless the first input is an array");
	else if (a.length>2 && typeof a[0]=="object") throw new Error("The first input of the function was an array but there was more than 2 inputs");

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
