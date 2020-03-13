/**
 * Copyright 2019-2020 Eric (VirxEC/Virx) Michael Veilleux
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License
 *
 * This is the NodeJS/ModuleJS release of https://github.com/VirxEC/CalcPlus and https://www.virxcase.ga
 * For more information about CalcPlus, go to https://www.virxcase.ga/CalcPlus/
 * To preview this library online, go to https://www.virxcase.ga/CP-P
 */
export function calcplus_info() {
    return {
        name: "CalcPlus NodeJS/ModuleJS Library",
        major: 0,
        minor: 5,
        bugFix: 0
    };
}
const defaults = {
    powermode: false,
    maxNumber: Number.MAX_SAFE_INTEGER,
    maxDecimal: 10 // Feel free to change this, or use setMaxDecimalLength(maxDecimalLength);
};
var powermode = defaults.powermode, maxNumber = defaults.maxNumber, maxDecimal = defaults.maxDecimal;
let varinfo = (obj) => console.log(JSON.stringify(obj)); // For debugging
export class Define extends Object {
    constructor(numberString, isNegative, decimals) {
        super();
        if (typeof numberString == "object") {
            this.num = numberString;
            this.isNeg = isNegative;
            this.decimals = decimals;
        }
        else if (typeof numberString == "string") {
            numberString = numberString.replace(/,/g, "");
            if (numberString.charAt(0) == "-")
                numberString = numberString.replace("-", ""), this.isNeg = true;
            else
                this.isNeg = false;
            if (numberString.includes(".")) {
                this.decimals = numberString.indexOf(".");
                numberString = numberString.replace(".", "");
            }
            else
                this.decimals = 0;
            this.num = numberString.split("");
        }
    }
    getNumber() {
        return +formatOutput(this.num, this.decimals, this.isNeg);
    }
}
export var MathMode;
(function (MathMode) {
    MathMode[MathMode["ADD"] = 1] = "ADD";
    MathMode[MathMode["SUBTRACT"] = 2] = "SUBTRACT";
    MathMode[MathMode["MULTIPLY"] = 3] = "MULTIPLY";
    MathMode[MathMode["DIVIDE"] = 4] = "DIVIDE";
    MathMode[MathMode["EXPONENT"] = 5] = "EXPONENT";
})(MathMode || (MathMode = {}));
export function parse(num1, num2, mathMode) {
    let isNeg = false, decimals = 0;
    if (mathMode != 5) {
        if (num1.isNeg != num2.isNeg && [3, 4].includes(mathMode))
            isNeg = true;
        let maxChar = Math.max(num1.num.length, num2.num.length);
        if (num1.decimals > 0 || num2.decimals > 0) {
            decimals = mathMode == 1 || mathMode == 2 ? Math.max(num1.decimals, num2.decimals) : mathMode == 3 ? num1.decimals + num2.decimals : num1.decimals - num2.decimals;
            if (decimals < 0)
                decimals = 0;
        }
        for (let i = 0; !isNeg && (num1.isNeg || num2.isNeg) && mathMode == 1 && num2.num.length == maxChar && i < num1.num.length; i++)
            if (num2.num[i] > num1.num[i])
                isNeg = true;
        if (mathMode == 2 && num2.num.length - num2.decimals == maxChar && num1.num.length - num1.decimals != maxChar)
            isNeg = true;
        if (maxChar == num2.num.length && mathMode == 3)
            num1.num = [num2.num, num2.num = num1.num][0];
        if (num1.decimals != num2.decimals && [1, 2].includes(mathMode)) {
            if (num1.decimals == decimals)
                for (let i = 0; i < num1.decimals - num2.decimals; i++)
                    num2.num.push("0");
            else if (num2.decimals == decimals)
                for (let i = 0; i < num2.decimals - num1.decimals; i++)
                    num1.num.push("0");
        }
        if (num1.num.length != num2.num.length && [1, 2, 4].includes(mathMode)) {
            while (num1.num.length - num2.num.length > 0)
                num2.num.unshift("0");
            while (num2.num.length - num1.num.length > 0)
                num1.num.unshift("0");
        }
        let negCalc = num2.num.length == maxChar;
        for (let i = 0; !isNeg && mathMode == 2 && negCalc && !(num1.num[i] > num2.num[i]) && i < num1.num.length; i++)
            if (num1.num[i] < num2.num[i])
                isNeg = true;
    }
    if (mathMode == 3 || mathMode == 4) {
        if (num1.isNeg && num2.isNeg) {
            isNeg = false;
            num1 = [num2, num2 = num1][0];
        }
    }
    for (let i = num1.num.length; mathMode == 4 && i < num2.num.length; i++) {
        num1.num.push("0");
        decimals++;
    }
    return {
        num1,
        num2,
        isNeg,
        decimals
    };
}
function formatOutput(final, decimals, isNeg, array = true, reverse = true) {
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
        if (isNeg)
            final = "-" + final;
        if (final.charAt(final.length - 1) == "." || final.charAt(0) == ".")
            final = final.replace(".", "");
        return ["", ".", "-", "-0"].includes(final) ? "0" : final;
    }
}
export function togglePowerMode() {
    powermode = !powermode;
}
export function setPowerMode(mode) {
    powermode = mode;
}
export function getPowerMode() {
    return powermode;
}
export function setMaxSafeInteger(maxSafeInteger) {
    if (maxSafeInteger == "default")
        maxNumber = defaults.maxNumber;
    else
        maxNumber = maxSafeInteger;
}
export function getMaxSafeInteger() {
    return maxNumber;
}
export function setMaxDecimalLength(maxDecimalLength) {
    if (maxDecimalLength == "default")
        maxDecimal = defaults.maxDecimal;
    else
        maxDecimal = maxDecimalLength;
}
export function getMaxDecimalLength() {
    return maxDecimal;
}
function shouldRun(num1, num2) {
    if (num1 instanceof Define)
        num1 = num1.num.join("");
    else if (num1[0] == "-")
        num1 = num1.charAt(1);
    if (num2 instanceof Define)
        num2 = num2.num.join("");
    else if (num2[0] == "-")
        num2 = num2.charAt(1);
    if (num1.length >= String(maxNumber).length || num2.length >= String(maxNumber).length)
        return true;
    const maxString = String(maxNumber), maxChar = Math.max(num1.length, num2.length), num = maxChar == num1.length ? num1 : num2;
    for (let i = maxChar; i > 0; i++)
        if (+num[i] > +maxString[i])
            return true;
    return false;
}
function ADD(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (typeof num1 == "string")
            num1 = new Define(num1);
        if (typeof num2 == "string")
            num2 = new Define(num2);
        const parsed = parse(num1, num2, 1), maxChar = Math.max(parsed.num1.num.length, parsed.num2.num.length);
        let final = [], carry = 0, time;
        num1 = parsed.num1, num2 = parsed.num2;
        if (num2.isNeg) {
            num2.isNeg = false;
            return subtract(num1, num2);
        }
        if (num1.isNeg) {
            num1.isNeg = false;
            return subtract(num2, num1);
        }
        for (let i = maxChar - 1; i >= 0; i--) {
            const finali = maxChar - i - 1;
            if (time != i + 1)
                carry = 0;
            final[finali] = String(+num1[i] + +num2[i] + carry);
            if (+final[finali] > 9) {
                const carryChar = final[finali].charAt(0);
                final[finali] = final[finali].charAt(1);
                if (i - 1 < 0)
                    final.push(carryChar);
                else
                    time = i;
                carry = +carryChar;
            }
            return new Define(final, parsed.isNeg, parsed.decimals);
        }
    }
    else
        return String((num1 instanceof Define ? num1.getNumber() : +num1) + (num2 instanceof Define ? num2.getNumber() : +num2));
}
export function add(...numbers) {
    let a = [...numbers], permfinal = ADD(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = ADD(permfinal, a[i]);
    return permfinal instanceof Define ? formatOutput(permfinal.num, permfinal.decimals, permfinal.isNeg) : permfinal;
}
function SUBTRACT(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (typeof num1 == "string")
            num1 = new Define(num1);
        if (typeof num2 == "string")
            num2 = new Define(num2);
        const parsed = parse(num1, num2, 2), maxChar = Math.max(num1.num.length, num2.num.length);
        let final = [];
        num1 = parsed.num1, num2 = parsed.num2;
        if (num2.isNeg && !num1.isNeg) {
            num2.isNeg = false;
            return ADD(num1, num2);
        }
        if (num1.isNeg && !num2.isNeg) {
            num1.isNeg = false;
            const item = ADD(num1, num2);
            if (typeof item == "string")
                return "-" + item;
            item.isNeg = true;
            return item;
        }
        for (let i = maxChar - 1; i >= 0; i--) {
            let finali = maxChar - i - 1, fans = +num1[i] - +num2[i];
            if (fans < 0 && i != 0) {
                let j = i - 1;
                final[finali] = String(fans + 10), num1[j] = String(+num1[j] - 1);
                while (num1[j] < 0 && j != num1.decimals)
                    num1[j] = String(+num1[j] + 10), j = j - 1, num1[j] = String(+num1[j] - 1);
                if (num1.decimals > 0 && j == num1.decimals)
                    while (num1[j] < 0 && j != 0)
                        num1[j] = String((+num1[j]) + 10), j = j - 1, num1[j] = String(num1[j] + 1);
            }
            else if (fans <= 0 && i == 0)
                final[finali] = String(fans).charAt(0) == "-" ? String(fans * -1 - 1) : String(fans);
            else
                final[finali] = String(fans);
        }
        return new Define(final, parsed.isNeg, parsed.decimals);
    }
    else
        return String((num1 instanceof Define ? num1.getNumber() : +num1) - (num2 instanceof Define ? num2.getNumber() : +num2));
}
export function subtract(...numbers) {
    let a = [...numbers], permfinal = SUBTRACT(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = SUBTRACT(permfinal, a[i]);
    return permfinal instanceof Define ? formatOutput(permfinal.num, permfinal.decimals, permfinal.isNeg) : permfinal;
}
export function isLessThan(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        let num = subtract(num2, num1);
        if (num.split("-").length == 1 && +num != 0)
            return true;
        return false;
    }
    else
        return (num1 instanceof Define ? num1.getNumber() : +num1) < (num2 instanceof Define ? num2.getNumber() : +num2);
}
export function isGreaterThan(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        let num = subtract(num1, num2);
        if (num.split("-").length == 1 && +num != 0)
            return true;
        return false;
    }
    else
        return (num1 instanceof Define ? num1.getNumber() : +num1) > (num2 instanceof Define ? num2.getNumber() : +num2);
}
export function isLessThanEqual(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (subtract(num2, num1).split("-").length == 1)
            return true;
        return false;
    }
    else
        return (num1 instanceof Define ? num1.getNumber() : +num1) <= (num2 instanceof Define ? num2.getNumber() : +num2);
}
export function isGreaterThanEqual(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (subtract(num1, num2).split("-").length == 1)
            return true;
        return false;
    }
    else
        return (num1 instanceof Define ? num1.getNumber() : +num1) >= (num2 instanceof Define ? num2.getNumber() : +num2);
}
export function round(item) {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        if (item instanceof Define) {
            let temp = item.num[item.decimals];
            item.num.length -= item.decimals;
            if (item.decimals > 0 && +temp > 4)
                return add(item.num.join(""), new Define(["1"], false, 0));
            return item.num.join("");
        }
        let temp = item.split(".");
        if (temp.length > 1 && +temp[1].split("")[0] > 4)
            return add(temp[0], new Define(["1"], false, 0));
        return temp[0];
    }
    else
        return String(Math.round(item instanceof Define ? item.getNumber() : +item));
}
export function roundDown(item) {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        if (item instanceof Define) {
            item.num.length -= item.decimals;
            return item.isNeg ? subtract("-" + item.num.join(""), new Define(["1"], false, 0)) : item.num.join("");
        }
        let temp = item.split(".")[0];
        return temp[0] == "-" ? subtract(temp, new Define(["1"], false, 0)) : temp;
    }
    else
        return String(Math.floor(item instanceof Define ? item.getNumber() : +item));
}
export function roundUp(item) {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        if (item instanceof Define)
            return item.decimals > 0 ? item.isNeg ? formatOutput((() => { item.num.length -= item.decimals; return item.num; })(), 0, true) : add(item, new Define(["1"], false, 0)) : formatOutput(item.num, 0, item.isNeg);
        let temp = item.split(".");
        return temp.length == 2 ? temp[0][0] == "-" ? temp[0] : add(temp[0], new Define(["1"], false, 0)) : item;
    }
    else
        return String(Math.ceil(item instanceof Define ? item.getNumber() : +item));
}
/*
export function multiply(...numbers: (Define | string)[]): string {
    function temp(num1:string|Define, num2:string|Define) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parse(num1, num2, 3),
                neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
                decimals = parsedNums.decimals,
                num = [null, parsedNums.num1.num, parsedNums.num2.num],
                final = [],
                carry = 0,
                product = "",
                f = [],
                time: number;

            for (let f2 = num[2].length - 1; f2 >= 0; f2--) {
                let f2i = num[2].length - f2 - 1;
                final[f2i] = [];
                if (f2 != num[2].length - 1) f.push("0");
                for (let f1 = num[1].length - 1; f1 >= 0; f1--) {
                    let f1i = num[1].length - f1 - 1;
                    if (time != f1 + 1) carry = 0;
                    if (+num[2][f2] != 0 && +num[1][f2] != 0) {
                        final[f2i][f1i] = String((+num[2][f2]) * (+num[1][f1]) + carry);
                        if (final[f2i][f1i] > 9) {
                            let temp = final[f2i][f1i].split('');
                            final[f2i][f1i] = temp[1], carry = +temp[0], time = f1;
                            if (f1 == 0) final[f2i].push(String(carry));
                        }
                    } else final[f2i][f1i] = "0";
                }
                final[f2i] = formatOutput(f.concat(final[f2i]), decimals, false);
            }
            product = final[0];
            for (let i = 1; i < final.length; i++) product = add(product, final[i]);
            if (neg[0] == true) return "-" + product;
            return (neg[0] ? "-" : "") + product;
        } else return String((num1 instanceof Define ? num1.getNumber() : +num1) * (num2 instanceof Define ? num2.getNumber() : +num2));
    }
    let permfinal: Define | string, a = [...numbers];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++) permfinal = temp(permfinal, a[i]);
    return permfinal;
}

export function divide(...numbers: string[]): string {
    function temp(num1:string|Define, num2:string|Define, maxD: number, i: number, getDec: boolean) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parse(num1, num2, 4),
                neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
                num: any = [parsedNums.num1.num, parsedNums.num2.num],
                decimals = parsedNums.decimals,
                final: any = "0";
            if (num[0].num == ["0"]) return "0";
            if (isLessThanEqual(num[1], num[0]))
                while (isLessThanEqual(num[1], num[0])) num[0] = subtract(num[0], num[1]), final = add(final, new Define(["1"], false, 0));
            else final = "0";
            if (maxD > decimals && !isLessThanEqual(num[1], num[0]) && num[0] != "0" && subtract(num[0], num[1]) != "0") {
                if (num[0] != "0") num[0] = num[0] + "0";
                if (num[1][0] != "0" && num[1].length != 1) num[1].push("0");
                final = final.split("").reverse().join("");
                if (i != 1) i++;
                decimals++;
                let decimal = temp(num[0], num[1], maxD - decimals, i, true);
                decimals += decimal.decimal - parsedNums.decimals;
                decimal = decimal.final.replace(".", ""); // .replace(/^0/g, "");
                for (let j = 0; j < i; j++) decimal += "0";
                // console.varinfo({final});
                // console.varinfo({add:add(final, decimal).split("")});
                final = add(final, decimal).split("");
            } else {
                final = final.split("");
            }
            // console.varinfo({decimals});
            // if (i == 1) decimals++;
            while (decimals > final.length) final.push("0");
            final = formatOutput(final, decimals, neg);
            return getDec ? {
                final,
                decimal: decimals
            } : final;
        } else return String((num1 instanceof Define ? num1.getNumber() : +num1) / (num2 instanceof Define ? num2.getNumber() : +num2));
    }
    let a = [...numbers], permfinal = temp(a[0], a[1], maxDecimal, 1, false);
    for (let i = 2; i < a.length - 1; i++) permfinal = temp(permfinal, a[i], maxDecimal, 1, false);
    return permfinal;
}

export function exponent(...numbers: any[]): string {
    function temp(num1: Define | string, num2: Define | string, maxD: any) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parse(num1, num2, 5),
                num = [null, parsedNums.num1, parsedNums.num2],
                decimals = [parsedNums.decimals, parsedNums.num2.decimals],
                neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
                final = "";

            if (decimals[1] > 0) {
                // root_of_decimal2*10(num1)**(num2*(10*decimal2))
                throw new TypeError("Decimal exponentnents aren't supported yet");
            } else {
                if (num[2].num.length == 1 && num[2].num[0] == "1" && !neg[2]) return formatOutput(num[1].num, decimals[0], false, true, false);
                else if ((num[2].num.length == 1 && num[2].num[0] == "0") || (num[1].num.length == 1 && num[1].num[0] == "1" && !neg[1])) return "1";
                else if (neg[2]) return divide("1", temp(num[1], num[2].set("isNeg", false), maxD));
                else {
                    if (num[1].num[0] == "-") num[1].num.shift();
                    final = multiply(num[1], num[1]);
                    for (let i = "2"; isLessThan(new Define(i.split(""), false, 0), num[2]); i = add(new Define(i.split(""), false, 0), new Define(["1"], false, 0))) final = multiply(final, num[1]);
                    return final;
                }
            }
        } else return String((num1 instanceof Define ? num1.getNumber() : +num1) ** (num2 instanceof Define ? num2.getNumber() : +num2));
    }
    let a = [...numbers];
    if (Array.isArray(a[0])) a = a[0];
    let maxD = typeof a[a.length - 1] == "number" ? a[a.length - 1] : maxDecimal,
        permfinal = temp(a[0], a[1], maxD);
    for (let i = 2; i < a.length; i++) permfinal = temp(permfinal, a[i], maxD);
    return permfinal;
}

export function factorial(item: Define | string): string|Define {
    return +item < 0 ? new Define(["1"], true, 0) : +item == 0 ? new Define(["1"], false, 0) : multiply(item, factorial(subtract(item, new Define(["1"], false, 0))));
}*/
export { 
// exponent as pow,
roundUp as ceil, roundDown as floor };
//# sourceMappingURL=calcplus.js.map