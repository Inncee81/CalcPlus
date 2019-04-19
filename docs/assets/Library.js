try {
	self.addEventListener('install', function(event) {
		console.log('Installed Library.js', event);
	});
	self.addEventListener('activate', function(event) {
		console.log('Activated Library.js', event);
	});
	self.addEventListener('fetch', function(e) {
		e.respondWith(caches.match(e.request).then(function(response) {
			if(response) {
				return response;
			}
			return fetch(e.request);
		}));
	});
	
	function parseNums(num1, num2, mode) {
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
		
		var decimal = 0;

		num1 = num1.split(".");
		num2 = num2.split(".");
		
		console.log(num1);
		console.log(num2);
		
		if (num1.length > 1 || num2.length >2) {
			if (num1.length > 1) {
				num1[1] = num1[1].split("");
			}
			if (num2.length > 2) {
				num2[1] = num2[1].split("");
			}
			
			if (mode == 1) {
				decimal = Math.max(num1.length, num2.length);
			} else if (mode == 2) {
				decimal = num1.length + num2.length;
			}
			
			num1[1] = num1[1].join("");
			num2[1] = num2[1].join("");
			
			num1 = num1.join("");
			num2 = num2.join("");
		}
		
		num1 = num1.toString().split('');
		num2 = num2.toString().split('');

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
			maxChar: maxChar,
			decimals: decimal
		};
	};

	function add(num1, num2) {
		var parsedNums = parseNums(num1, num2, 1);
		num1 = parsedNums.num1.num;
		num2 = parsedNums.num2.num;
		var neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg];
		var maxChar = parsedNums.maxChar;
		var decimals = parsedNums.decimals;

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
		
		final = final.reverse();
		
		if (decimals > 0) {
			final.insert(decimals-1, ".");
		}
		
		if(neg[0]){
			return "-"+final;
		}

		return final.join('');
	}

	function sub(num1, num2) {
		var parsedNums = parseNums(num1, num2, 1);
		num1 = parsedNums.num1.num;
		num2 = parsedNums.num2.num;
		var neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg];
		var maxChar = parsedNums.maxChar;
		var decimals = parsedNums.decimals;

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

		final = final.reverse();
		
		if (decimals > 0) {
			final.insert(decimals-1, ".");
		}
		
		if(neg[0]){
			return "-"+final;
		}

		return final.join('');
	}

	function multi(num1, num2) {
		function addZeros(round) {
			final = "";
			for (var i = 0; i < round; i++) {
				final += "0";
			}
		}
		
		var parsedNums = parseNums(num1, num2, 2);
		num1 = parsedNums.num1.num;
		num2 = parsedNums.num2.num;
		var neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg];
		var maxChar = parsedNums.maxChar;
		

		var final = "0";
		var tempFinal = "0";
		maxChar = [maxChar, num1.length, num2.length];
		
		for (var round = 0; round < num2.length; round++) {
			var carry = 0;
			for (var i = 0; i < num1.length; i++) {
				var temp = parseInt(num1[i])*parseInt(num2[round])+carry;
				carry = 0;
				
				while (temp > 9) {
					carry += 1;
					temp -= 10;
				}
				tempFinal = temp.toString()+tempFinal;
			}
			final = add(final, tempFinal);
		}
		
		final = final.reverse();

		if (decimals > 0) {
			final.insert(decimals-1, ".");
		}
			     
		if (neg[0]) {
			return "-"+final;
		}

		return final;
	}
} catch(err) {
	alert("An unexpected error occured in BNC-Lib.");
	console.error(err);
}
