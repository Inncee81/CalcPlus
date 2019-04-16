try {
	function parseNums(num1, num2) {
		var neg = [0, false, false];

		num1 = num1.split("-");
		num2 = num2.split("-");

		if (num1.length == 2) {
			num1 = num1[1];
			neg[1] = true;
		} else {
			num1 = num1.toString();
		}
		if (num2.length == 2) {
			num2 = num2[1];
			neg[2] = true;
		} else {
			num2 = num2.toString();
		}

		var isNeg = false;

		if (((neg[1]||neg[2]) && (neg[1]!=neg[2])) === true) {
			isNeg = true;
		}

		num1 = num1.split('');
		num2 = num2.split('');

		var maxChar = Math.max(num1.length, num2.length);

		if(maxChar > num1.length) {
			for(var i=num1.length;i<maxChar;i++) {
				num1.unshift("0");
			}
		} else if (maxChar > num2.length) {
			for(var c=num2.length;c<maxChar;c++) {
				num2.unshift("0");
			}
		}
    
    if (num2.length == maxChar) {
      var temp = [false, num1, num2];
      num1 = temp[2];
      num2 = temp[1];
    }

		return {
			num1: {
				num: num1,
				isNeg: neg[1]
			},
			num2: {
				num: num2,
				isNeg: neg[2]
			},
			isNeg: isNeg,
			maxChar: maxChar
		};
	};

	function add(num1, num2) {
		var parsedNums = parseNums(num1, num2);
		num1 = parsedNums.num1.num;
		num2 = parsedNums.num2.num;
		var neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg];
		var maxChar = parsedNums.maxChar;

		if (neg[2]) {
			if (neg[1]) {
				num1.unshift("-");
			}
			return sub(num1.join(''), num2.join(''));
		} else if (neg[1]) {
			return sub(num2.join(''), num1.join(''));
		}
		var time;
		var final = [];
		var carry = "0";

		for (var i=maxChar-1; i>=0;i--) {
			var finali = maxChar-i-1;
			if(time != i+1) {
				carry = "0";
			}

			final[finali] = (parseInt(num1[i]) + parseInt(num2[i]) + parseInt(carry)).toString();

			if(parseInt(final[finali]) > 9) {
				var temp = final[finali].split('');
				final[finali] = temp[1];
				carry = temp[0];
				time = i;
				if (i-1<0) {
					final[final.length] = carry;
				}
			}
		}

		if(neg[0]){
			final.unshift("-");
		}

		return final.reverse().join('');
	}

	function sub(num1, num2) {
		var parsedNums = parseNums(num1, num2);
		num1 = parsedNums.num1.num;
		num2 = parsedNums.num2.num;
		var neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg];
		var maxChar = parsedNums.maxChar;

		if (neg[2]) {
      num2.unshift("-");
			if (neg[1]) {
				num1.unshift("-");
			}
			return add(num1.join(''), num1.join(''));
		} else if (neg[1]) {
			var ans = add(num1.join(''), num2.join(''));
			return "-"+ans;
		}

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

		while (final[final.length-1] == '0' && final.length > 1) {
			delete final[final.length-1];
		}

		if(neg[0]){
			final.unshift("-");
		}

		return final.reverse().join('');
	}

	function multi(num1, num2) {
		var parsedNums = parseNums(num1, num2);
		num1 = parsedNums.num1.num;
		num2 = parsedNums.num2.num;
		var neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg];
		var maxChar = parsedNums.maxChar;

		if (num2.length == maxChar) {
			var numsTemp = [false, num1, num2];
			num1 = numsTemp[2];
			num2 = numsTemp[1];
		}

		var final = [];
		maxChar = [false, num1.length, num2.length];

		for (var i=maxChar[1]-1; i>=0;i--) {
			var finali = maxChar-i-1;
			final[finali] = [];
			for (var j=maxChar[2]-1; j>=0; j--) {
				var finalj = maxChar-j-1;
				final[finali[finalj]]=(parseInt(num1[j])*parseInt(num2[i])).toString();
				for (var u=0; u<finalj; u++) {
					final[finali[finalj]] = final[finali[finalj]]+"0";
				}
			}
			var tempF = "0";
			for (var k=maxChar[2]-1; k>=0; k--) {
				tempF = (parseInt(tempF)+parseInt(final[finali[k]])).toString();
			}
			final[finali] = tempF;
		}
		var tempP = "0";
		for (var p=maxChar[1]-1; p>=0;p--) {
			tempP = (parseInt(tempP) + parseInt(final[p])).toString();
		}
		final = tempP;

		if (neg[0]) {
			return "-"+final;
		}

		return final;
	}
} catch(err) {
	alert("An unexpected error occured in BNC-Lib.");
	console.error(err);
}
