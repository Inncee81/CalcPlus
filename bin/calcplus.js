/**
 * Copyright 2019-2020 Eric (VirxEC/Virx) Michael Veilleux
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License
 *
 * This is the NodeJS/ModuleJS release of https://github.com/VirxEC/CalcPlus and https://www.virxcase.ga
 */
function calcplus_info() {
    return {
        name: "CalcPlus NodeJS/ModuleJS Library",
        major: 0,
        minor: 5,
        bugFix: 0
    };
}
var powermode = false, // Feel free to change this, or use togglePowerMode();
maxNumber = Number.MAX_SAFE_INTEGER, // Feel free to change this, or use setMaxSafeInteger(maxSafeInteger);
minNumber = Number.MIN_SAFE_INTEGER, // Feel free to change this, but it doesn't do anything right now
maxDecimal = maxNumber; // Feel free to change this, or use setMaxDecimalLength(maxDecimalLength);
let varinfo = (v, x = Object.keys(v)[0]) => console.log(x, JSON.stringify(v[x])); // For debugging
class Define extends Object {
    constructor(num, isNeg, decimals) {
        super();
        this.num = num;
        this.isNeg = isNeg;
        this.decimals = decimals;
    }
    set(...args) {
        let a = [...args];
        if (args.length == 2)
            this[args[0]] = args[1];
        else
            this.num[args[1]] == args[2];
        return this;
    }
    getNumber() {
        return +formatNums(this.num, this.decimals, this.isNeg);
    }
}
function parseNumbers(num1, num2, mode) {
    let neg = [false, false, false], decimal = [0, 0, 0], num = [];
    function parse(nmbr, i) {
        if (typeof nmbr == "object" && !(nmbr instanceof Define))
            nmbr = nmbr.join("");
        if (typeof nmbr === "string") {
            let numisplit = nmbr.split("-"), item = nmbr;
            if (numisplit.length == 2)
                item = numisplit[1], neg[i] = true;
            item = item.replace(/,/g, "");
            if (item.split(".").length == 2)
                item = item.replace(/$0+/g, "");
            if (item.length > 1 && item.charAt(0) == ".")
                item = "0" + item;
            item = ["", ".", "-"].includes(item) ? "0" : item;
            if (!Array.isArray(item))
                item = item.split("");
            let numpos = item.indexOf(".");
            num[i] = item.filter(w => w != "."), decimal[i] = numpos != -1 ? item.length - numpos : 0;
        }
        else if (nmbr instanceof Define) {
            neg[i] = nmbr.isNeg;
            decimal[i] = nmbr.decimals;
            num[i] = [...nmbr.num];
        }
    }
    parse(num1, 1);
    parse(num2, 2);
    if (mode != 5) {
        if (neg[1] != neg[2] && [3, 4].includes(mode))
            neg[0] = true;
        let maxChar = Math.max(num[1].length, num[2].length);
        if (decimal[1] > 0 || decimal[2] > 0) {
            decimal[0] = mode == 1 || mode == 2 ? Math.max(decimal[1], decimal[2]) : mode == 3 ? decimal[1] + decimal[2] : decimal[1] - decimal[2];
            if (decimal[0] < 0)
                decimal[0] = 0;
        }
        for (let i = 0; !neg[0] && (neg[1] || neg[2]) && mode == 1 && num[2].length == maxChar && i < num[1].length; i++)
            if (num[2][i] > num[1][i])
                neg[0] = true;
        if (mode == 2 && num[2].length - decimal[2] == maxChar && num[1].length - decimal[1] != maxChar)
            neg[0] = true;
        if (maxChar == num[2].length && mode == 3)
            num[1] = [num[2], num[2] = num[1]][0];
        if (decimal[1] != decimal[2] && [1, 2].includes(mode)) {
            if (decimal[1] == decimal[0])
                for (let i = 0; i < decimal[1] - decimal[2]; i++)
                    num[2].push("0");
            else if (decimal[2] == decimal[0])
                for (let i = 0; i < decimal[2] - decimal[1]; i++)
                    num[1].push("0");
        }
        if (num[1].length != num[2].length && [1, 2, 4].includes(mode)) {
            while (num[1].length - num[2].length > 0)
                num[2].unshift("0");
            while (num[2].length - num[1].length > 0)
                num[1].unshift("0");
        }
        let negCalc = num[2].length == maxChar;
        for (let i = 0; !neg[0] && mode == 2 && negCalc && !(num[1][i] > num[2][i]) && i < num[1].length; i++)
            if (num[1][i] < num[2][i])
                neg[0] = true;
    }
    if ([3, 4].includes(mode) && neg[1] && neg[2])
        neg[0] = false;
    if ([3, 4].includes(mode))
        neg[1] = false, neg[2] = false;
    for (let i = 0; mode == 4 && i < num[2].length; i++) {
        num[1].push("0");
        decimal[0]++;
    }
    return {
        num1: new Define(num[1], neg[1], decimal[1]),
        num2: new Define(num[2], neg[2], decimal[2]),
        isNeg: neg[0],
        maxChar: Math.max(num[1].length, num[2].length),
        decimals: decimal[0]
    };
}
function formatNums(final, decimals, neg, array = true, reverse = true) {
    if (!array && typeof final == "string")
        final = final.length > 1 ? final.split("") : [final];
    if (typeof final != "string") {
        if (reverse && final.length > 1)
            final = final.reverse();
        if (decimals > 0)
            final.splice(final.length - decimals, 0, ".");
        final = final.join("");
        if (final.split(".").length == 2)
            final = final.replace(/\.?0+$/g, '');
        final = final.replace(/^0+/g, '');
        if (final.length > 1 && final.charAt(0) == ".")
            final = "0" + final;
        if (neg[0])
            final = "-" + final;
        if (final.charAt(final.length - 1) == "." || final.charAt(0) == ".")
            final = final.replace(".", "");
        final = ["", ".", "-", "-0"].includes(final) ? "0" : final;
        return final;
    }
}
function togglePowerMode() {
    if (!powermode)
        console.info("Disabled power mode. Recommended for debugging only.");
    else
        console.info(`Enabled power mode. This will make it so the library will only activate if the sum/difference is over maxNumber (${maxNumber}).`, "To enable power mode forever, change the first variable on line 10 to true.");
    powermode = !powermode;
}
function setMaxSafeInteger(maxSafeInteger) {
    if (powermode) {
        if (maxSafeInteger == "default")
            maxNumber = Number.MAX_SAFE_INTEGER, minNumber = Number.MIN_SAFE_INTEGER;
        else
            maxNumber = maxSafeInteger, minNumber = maxSafeInteger * -1;
        console.info(`To set the max safe number back to the default value of ${Number.MAX_SAFE_INTEGER}, do setMaxSafeInteger('default');`, "To change the value forever, change the variable on lines 12 (maximum) & 13 (minimum).");
    }
    else
        console.warn("You must turn on Power Mode before you can set the max safe number.");
}
function setMaxDecimalLength(maxDecimalLength) {
    if (maxDecimalLength == "default")
        maxDecimal = maxNumber;
    else
        maxDecimal = maxDecimalLength;
    console.info(`To set the max decimal length back to the default value of ${maxNumber}, do setMaxDecimalLength('default');`, "To change teh value forever, change the variable on line 14.");
}
function shouldRun(num1, num2) {
    if (num1[0] != "-" && num2[0] != "-") {
        if (num1.length >= String(maxNumber).length || num2.length >= String(maxNumber).length)
            return true;
        let maxstr = String(maxNumber), maxChar = Math.max(num1.length, num2.length), num = maxChar == num1.length ? num1 : num2;
        for (let i = Math.max(num1.length, num2.length); i > 0; i++)
            if (+num[i] > +maxstr[i])
                return true;
        return false;
    }
}
function add(...numbers) {
    function temp(num1, num2) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parseNumbers(num1, num2, 1), neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals], num = [null, parsedNums.num1.num, parsedNums.num2.num], final = [], carry = "0", finali, time;
            if (neg[2])
                return subtract(parsedNums.num1, parsedNums.num2.set("isNeg", false));
            else if (neg[1])
                return subtract(parsedNums.num2, parsedNums.num1.set("isNeg", false));
            for (let i = parsedNums.maxChar - 1; i >= 0; i--) {
                finali = parsedNums.maxChar - i - 1;
                if (time != i + 1)
                    carry = "0";
                final[finali] = String(+num[1][i] + (+num[2][i]) + (+carry));
                if (+final[finali] > 9) {
                    var temp = final[finali].split('');
                    final[finali] = temp[1], carry = temp[0], time = i;
                    if (i - 1 < 0)
                        final.push(carry);
                }
            }
            return formatNums(final, decimal[0], neg);
        }
        else
            return String((num1 instanceof Define ? num1.getNumber() : +num1) + (num2 instanceof Define ? num2.getNumber() : +num2));
    }
    let permfinal, a = [...numbers];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = temp(permfinal, a[i]);
    return permfinal;
}
function subtract(...numbers) {
    function temp(num1, num2) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parseNumbers(num1, num2, 2), neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals], num = [null, parsedNums.num1.num, parsedNums.num2.num], final = [];
            if (neg.includes(true)) {
                if ((neg[0] && !neg[1] && !neg[2]) || (neg[1] && neg[2]))
                    num[1] = [num[2], num[2] = num[1]][0];
                else if (neg[2] && !neg[1])
                    return add(parsedNums.num1, parsedNums.num2.set("isNeg", false));
                else if (neg[1] && !neg[2])
                    return "-" + add(parsedNums.num1.set("isNeg", false), parsedNums.num2);
            }
            for (let i = parsedNums.maxChar - 1; i >= 0; i--) {
                let finali = parsedNums.maxChar - i - 1, fans = +num[1][i] - +num[2][i];
                if (fans < 0 && i != 0) {
                    let j = i - 1;
                    final[finali] = String(fans + 10), num[1][j] = String(+num[1][j] - 1);
                    while (num1[j] < 0 && j != decimal[1])
                        num[1][j] = String((+num[1][j]) + 10), j = j - 1, num[1][j] = String(+num[1][j] - 1);
                    if (decimal[1] > 0 && j == decimal[1])
                        while (num1[j] < 0 && j != 0)
                            num[1][j] = String((+num[1][j]) + 10), j = j - 1, num[1][j] = String(num[1][j] + 1);
                }
                else if (fans <= 0 && i == 0)
                    final[finali] = String(fans).split("-").length > 1 ? +String(fans).split("-")[1] - 1 : String(fans);
                else
                    final[finali] = fans;
            }
            return formatNums(final, decimal[0], neg);
        }
        else
            return String((num1 instanceof Define ? num1.getNumber() : +num1) - (num2 instanceof Define ? num2.getNumber() : +num2));
    }
    let permfinal, a = [...numbers];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = temp(permfinal, a[i]);
    return permfinal;
}
function isLessThan(...numbers) {
    function temp(num1, num2) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let num = subtract(num2, num1);
            if (num.split("-").length == 1 && +num != 0)
                return true;
            return false;
        }
        else
            return (num1 instanceof Define ? num1.getNumber() : +num1) < (num2 instanceof Define ? num2.getNumber() : +num2);
    }
    let permfinal, a = [...numbers];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = temp(permfinal, a[i]);
    return permfinal;
}
function isGreaterThan(...numbers) {
    function temp(num1, num2) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let num = subtract(num1, num2);
            if (num.split("-").length == 1 && +num != 0)
                return true;
            return false;
        }
        else
            return (num1 instanceof Define ? num1.getNumber() : +num1) > (num2 instanceof Define ? num2.getNumber() : +num2);
    }
    let permfinal, a = [...numbers];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = temp(permfinal, a[i]);
    return permfinal;
}
function isLessThanEqual(...numbers) {
    function temp(num1, num2) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            if (subtract(num2, num1).split("-").length == 1)
                return true;
            return false;
        }
        else
            return (num1 instanceof Define ? num1.getNumber() : +num1) <= (num2 instanceof Define ? num2.getNumber() : +num2);
    }
    let permfinal, a = [...numbers];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = temp(permfinal, a[i]);
    return permfinal;
}
function isGreaterThanEqual(...numbers) {
    function temp(num1, num2) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            if (subtract(num1, num2).split("-").length == 1)
                return true;
            return false;
        }
        else
            return (num1 instanceof Define ? num1.getNumber() : +num1) >= (num2 instanceof Define ? num2.getNumber() : +num2);
    }
    let permfinal, a = [...arguments];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = temp(permfinal, a[i]);
    return permfinal;
}
function round(item) {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        item = item.split(".");
        if (item.length > 1 && item[1].split("")[0] > 4)
            return add(item[0], new Define(["1"], false, 0));
        return item[0];
    }
    else
        return String(Math.round(item instanceof Define ? item.getNumber() : +item));
}
function roundDown(item) {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        item = item.split(".");
        return item[0][0] == "-" ? subtract(item[0], new Define(["1"], false, 0)) : item[0];
    }
    else
        return String(Math.floor(item instanceof Define ? item.getNumber() : +item));
}
function roundUp(item) {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        item = item.split(".");
        return item.length == 2 ? item[0][0] == "-" ? item[0] : add(item[0], new Define(["1"], false, 0)) : item;
    }
    else
        return String(Math.ceil(item instanceof Define ? item.getNumber() : +item));
}
function multiply(...numbers) {
    function temp(num1, num2) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parseNumbers(num1, num2, 3), neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], decimals = parsedNums.decimals, num = [null, parsedNums.num1.num, parsedNums.num2.num], final = [], carry = 0, product = "", f = [], time;
            for (let f2 = num[2].length - 1; f2 >= 0; f2--) {
                let f2i = num[2].length - f2 - 1;
                final[f2i] = [];
                if (f2 != num[2].length - 1)
                    f.push("0");
                for (let f1 = num[1].length - 1; f1 >= 0; f1--) {
                    let f1i = num[1].length - f1 - 1;
                    if (time != f1 + 1)
                        carry = 0;
                    if (+num[2][f2] != 0 && +num[1][f2] != 0) {
                        final[f2i][f1i] = String((+num[2][f2]) * (+num[1][f1]) + carry);
                        if (final[f2i][f1i] > 9) {
                            let temp = final[f2i][f1i].split('');
                            final[f2i][f1i] = temp[1], carry = +temp[0], time = f1;
                            if (f1 == 0)
                                final[f2i].push(String(carry));
                        }
                    }
                    else
                        final[f2i][f1i] = "0";
                }
                final[f2i] = formatNums(f.concat(final[f2i]), decimals, false);
            }
            product = final[0];
            for (let i = 1; i < final.length; i++)
                product = add(product, final[i]);
            if (neg[0] == true)
                return "-" + product;
            return (neg[0] ? "-" : "") + product;
        }
        else
            return String((num1 instanceof Define ? num1.getNumber() : +num1) * (num2 instanceof Define ? num2.getNumber() : +num2));
    }
    let permfinal, a = [...numbers];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = temp(permfinal, a[i]);
    return permfinal;
}
function divide(...numbers) {
    function temp(num1, num2, maxD, i, getDec) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parseNumbers(num1, num2, 4), neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], num = [parsedNums.num1.num, parsedNums.num2.num], decimals = parsedNums.decimals, final = "0";
            if (num[0].num == ["0"])
                return "0";
            if (isLessThanEqual(num[1], num[0]))
                while (isLessThanEqual(num[1], num[0]))
                    num[0] = subtract(num[0], num[1]), final = add(final, new Define(["1"], false, 0));
            else
                final = "0";
            if (maxD > decimals && !isLessThanEqual(num[1], num[0]) && num[0] != "0" && subtract(num[0], num[1]) != "0") {
                if (num[0] != "0")
                    num[0] = num[0] + "0";
                if (num[1].num[0] != "0" && num[1].length != 1)
                    num[1].num.push("0");
                final = final.split("").reverse().join("");
                if (i != 1)
                    i++;
                decimals++;
                let decimal = temp(num[0], num[1], maxD - decimals, i, true);
                decimals += decimal.decimal - parsedNums.decimals;
                decimal = decimal.final.replace(".", ""); // .replace(/^0/g, "");
                for (let j = 0; j < i; j++)
                    decimal += "0";
                // console.varinfo({final});
                // console.varinfo({add:add(final, decimal).split("")});
                final = add(final, decimal).split("");
            }
            else {
                final = final.split("");
            }
            // console.varinfo({decimals});
            // if (i == 1) decimals++; 
            while (decimals > final.length)
                final.push("0");
            final = formatNums(final, decimals, neg);
            return getDec ? {
                final,
                decimal: decimals
            } : final;
        }
        else
            return String((num1 instanceof Define ? num1.getNumber() : +num1) / (num2 instanceof Define ? num2.getNumber() : +num2));
    }
    let a = [...numbers];
    let maxD = typeof a[a.length - 1] == "number" ? a[a.length - 1] : maxDecimal, permfinal = temp(a[0], a[1], maxD, 1, false);
    for (let i = 2; i < a.length - 1; i++)
        permfinal = temp(permfinal, a[i], maxD, 1, false);
    return permfinal;
}
function exponent(...numbers) {
    function temp(num1, num2, maxD) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parseNumbers(num1, num2, 5), num = [null, parsedNums.num1, parsedNums.num2], decimals = [parsedNums.decimals, parsedNums.num2.decimals], neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg], final = "";
            if (decimals[1] > 0) {
                // root_of_decimal2*10(num1)**(num2*(10*decimal2))
                throw new TypeError("Decimal exponentnents aren't supported yet");
            }
            else {
                if (num[2].num.length == 1 && num[2].num[0] == "1" && !neg[2])
                    return formatNums(num[1].num, decimals[0], false, true, false);
                else if ((num[2].num.length == 1 && num[2].num[0] == "0") || (num[1].num.length == 1 && num[1].num[0] == "1" && !neg[1]))
                    return "1";
                else if (neg[2])
                    return divide("1", temp(num[1], num[2].set("isNeg", false), maxD));
                else {
                    if (num[1].num[0] == "-")
                        num[1].num.shift();
                    final = multiply(num[1], num[1]);
                    for (let i = "2"; isLessThan(new Define(i.split(""), false, 0), num[2]); i = add(new Define(i.split(""), false, 0), new Define(["1"], false, 0)))
                        final = multiply(final, num[1]);
                    return final;
                }
            }
        }
        else
            return String(num1.getNumber() ** num2.getNumber());
    }
    let a = [...numbers];
    if (Array.isArray(a[0]))
        a = a[0];
    let maxD = typeof a[a.length - 1] == "number" ? a[a.length - 1] : maxDecimal, permfinal = temp(a[0], a[1], maxD);
    for (let i = 2; i < a.length; i++)
        permfinal = temp(permfinal, a[i], maxD);
    return permfinal;
}
function factorial(item) {
    return item < 0 ? new Define(["1"], true, 0) : item == 0 ? new Define(["1"], false, 0) : multiply(item, factorial(subtract(item, new Define(["1"], false, 0))));
}
export { exponent as power, roundUp as ceil, roundDown as floor, add, subtract, multiply, divide, exponent, factorial, isLessThan, isGreaterThan, isLessThanEqual, isGreaterThanEqual, round, roundUp, roundDown, calcplus_info, setMaxSafeInteger, setMaxDecimalLength, togglePowerMode, Define };
//# sourceMappingURL=calcplus.js.map