function parseNums(num1, num2, mode) {
	if (typeof num1 != "string") throw new TypeError("The first number wasn't a string. It has to be a string.");
	if (typeof num2 != "string") throw new TypeError("The second number wasn't a string. It has to be a string.");
	if (typeof mode != "number" || mode > 4 || mode < 1) throw new TypeError("The mode must be a number from 1-4.");
	
	var neg = [0, false, false];
	
	num1 = num1.split("-");
	num2 = num2.split("-");

	if (num1.length == 2) {
		num1 = num1[1];
		neg[1] = true;
	} else num1 = num1.toString();
	if (num2.length == 2) {
		num2 = num2[1];
		neg[2] = true;
	} else num2 = num2.toString();

	var isNeg = false;

	if (((neg[1]||neg[2]) && (neg[1]!=neg[2])) === true) isNeg = true;

	var decimal, decimal1, decimal2;

	num1 = num1.split('');
	num2 = num2.split('');

	if (num1[0] == "0") while(num1[0] == "0") num1.splice(0, 1);
	if (num2[0] == "0") while(num2[0] == "0") num2.splice(0, 1);

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
	var num1pos = num1.indexOf(".");
	var num2pos = num2.indexOf(".");
	if (num1pos != -1) decimal1 = num1.remove(".").length - num1pos;
	else decimal1 = 0;
	if (num2pos != -1) decimal2 = num2.remove(".").length - num2pos;
	else decimal2 = 0;

	var maxDecimal = Math.max(decimal1, decimal2);

	if (mode == 4 || mode == 1) decimal = maxDecimal;
	else if (mode == 2) decimal = decimal1 + decimal2;
	else if (mode == 3) decimal = decimal2;

	var maxChar = Math.max(num1.length, num2.length);
	if (mode == 2) {
		if (num2.length == maxChar && num1.length != maxChar) {
			if (mode != 3) {
				num2 = [num1, num1 = num2][0];
			}
			isNeg = true;
		}
	}

	if (decimal1 != decimal2) {
		var times;
		if (decimal1 == maxDecimal) {
			times = decimal1 - decimal2;
			for (var i=0;i<times;i++) num2.push("0");
		} else {
			times = decimal2 - decimal1;
			for (var i=0;i<times;i++) num1.push("0");
		}
	}

	maxChar = Math.max(num1.length, num2.length);
	if (num1.length != num2.length) {
		var times;
		if (maxChar == num1.length) {
			times = num1.length - num2.length;
			for (var i = 0; i < times; i++) num2.unshift("0");
		} else {
			times = num2.length - num1.length;
			for (var i = 0; i < times; i++) num1.unshift("0");
		}
	}

	if (!isNeg && mode != 4) {
		var skip = false;
		for (var i=0; i<num2.length && !skip && !isNeg; i++) {
			if (parseInt(num2[i]) > parseInt(num1[i])) {
				if (mode != 3 && mode != 1) [num1,num2]=[num2,num1];
				isNeg = true;
				skip = true;
			} else if (parseInt(num1[i]) > parseInt(num2[i])) skip = true;
		}
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
		isNeg: isNeg,
		maxChar: maxChar,
		decimals: decimal
	};
}

function formatNums(final,decimals,neg) {
	final=final.reverse();
	if(decimals > 0) final.splice(final.length-decimals,0,".");
	while(final[final.length-1]=='0'&&final.length>1)final.splice(final.length-1,1);
	while(final[0]=="0")final.splice(0,1);
	if(final==""||final==".")return "0";
	if(neg[0])return "-"+final.join('');
	return final.join('');
}

function add(num1, num2) {
	var parsedNums = parseNums(num1, num2, 4);
	num1 = parsedNums.num1.num;
	num2 = parsedNums.num2.num;
	var neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg];
	var maxChar = parsedNums.maxChar;
	var decimals = parsedNums.decimals;

	if (neg[1] || neg[2]) {
		if (neg[1] && neg[2]) return sub("-"+num1.join(''), num2.join(''));
		else if (neg[2]) return sub(num1.join(''), num2.join(''));
		else if (neg[1]) return sub(num2.join(''), num1.join(''));
	}

	var time;
	var final = [];
	var carry = "0";

	for (var i=maxChar-1; i>=0;i--) {
		var finali = maxChar-i-1;
		if(time != i+1) carry = "0";
		final[finali] = (parseInt(num1[i]) + parseInt(num2[i]) + parseInt(carry)).toString();

		if(parseInt(final[finali]) > 9) {
			var temp = final[finali].split('');
			final[finali] = temp[1];
			carry = temp[0];
			time = i;
			if (i-1 < 0) final[final.length] = carry;
		}
	}
	return formatNums(final, decimals, neg);
}

function sub(num1, num2) {
	var parsedNums = parseNums(num1, num2, 1);
	num1 = parsedNums.num1.num;
	num2 = parsedNums.num2.num;
	var neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg];
	var maxChar = parsedNums.maxChar;
	var decimals = parsedNums.decimals;

	if (neg[1] || neg[2]) {
		if (neg[1] && neg[2]) [num1,num2]=[num2,num1];
		else if (neg[2]) return add(num1.join(''), num2.join(''));
		else if (neg[1]) return "-"+add(num1.join(''), num2.join(''));
	}
	if (neg[0]) [num1,num2]=[num2,num1]

	var final = [];

	for (var i=maxChar-1; i>=0;i--) {
		var finali = maxChar-i-1;
		var fans = parseInt(num1[i]) - parseInt(num2[i]);

		if (fans < 0) {
			fans+=10;
			num1[i-1]-=1;
		}

		final[finali] = fans.toString();
	}
	return formatNums(final, decimals, neg);
}

function isLessThan(num1, num2) {
	var num = sub(num1, num2).split("-");
	if (num.length == 1) return false;
	return true;
}

function isGreaterThan(num1, num2) {
	var num = sub(num1, num2).split("-");
	if (num.length == 2 || num[0] == "0") return false;
	return true;
}
function isLessThanEqual(num1, num2) {
	var num = sub(num1, num2).split("-");
	if (num.length == 1) return false;
	return true;
}
function isGreaterThanEqual(num1, num2) {
	var num = sub(num1, num2).split("-");
	if (num.length == 2) return false;
	return true;
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

function multi(num1, num2) {
	function addZeros(round) {
		var zeros = "";
		if (isGreaterThan(round, 0)) for (var i = 0; i < round; i++) zeros += "0";
		return zeros;
	}

	var parsedNums = parseNums(num1, num2, 2);
	num1 = parsedNums.num1.num;
	num2 = parsedNums.num2.num;
	var neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg];
	var maxChar = parsedNums.maxChar;
	var decimals = parsedNums.decimals;

	// Rewrite Needed
}
function expo(num1, num2) {
	//Need to fix div -> if (num2.split("-").length == 2) return div("1", multi(num1, num2));
	//Need to fix multi -> var final = multi(num1, num1);
	//Need to fix multi -> for (var i=3; isLessThan(i.toString(), num2); i++) final = multi(final, num1);
	//return final;
}
function div(num1, num2, maxDecimal) {
	var parsedNums = parseNums(num1, num2, 3);
	num1 = parsedNums.num1.num;
	num2 = parsedNums.num2.num;
	var neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg];
	var maxChar = parsedNums.maxChar;
	var decimals = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals];

	//Re-think needed
}