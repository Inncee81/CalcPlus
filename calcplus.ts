/**
 * Copyright 2019-2020 Eric (VirxEC/Virx) Michael Veilleux
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License
 * 
 * This is the NodeJS/ModuleJS release of https://github.com/VirxEC/CalcPlus and https://www.virxcase.ga
 */
export function calcplus_info() {
    return {
        name: "CalcPlus NodeJS/ModuleJS Library",
        major: 0,
        minor: 5,
        bugFix: 0
    };
}

var powermode: boolean = false, // Feel free to change this, or use togglePowerMode();
    maxNumber: number = Number.MAX_SAFE_INTEGER, // Feel free to change this, or use setMaxSafeInteger(maxSafeInteger);
    maxDecimal: number = maxNumber; // Feel free to change this, or use setMaxDecimalLength(maxDecimalLength);

// let varinfo = (v: object, x = Object.keys(v)[0]) => console.log(x,JSON.stringify(v[x])); // For debugging

export class Define extends Object {
    num: string[];
    isNeg: boolean;
    decimals: number;
    constructor(num: string[], isNeg: boolean, decimals: number) {
        super();
        this.num = num;
        this.isNeg = isNeg;
        this.decimals = decimals;
    }

    public set(name: string, item: string | boolean): this {
        this[name] = item;
        return this;
    }

    public getNumber() {
        return +formatOutput(this.num, this.decimals, this.isNeg);
    }
}

function parseNumbers(num1: Define|string, num2: Define|string, mode: 1|2|3|4|5): {num1: Define, num2: Define, isNeg: boolean, maxChar: number, decimals: number} {
    let neg: boolean[] = [false, false, false],
        decimal: number[] = [0, 0, 0],
        num: string[][] = [];

    function parse(nmbr: string|Define|string[], i: number): void {
        if (typeof nmbr == "object" && !(nmbr instanceof Define)) nmbr = nmbr.join("");
        if (typeof nmbr === "string") {
            let numisplit = nmbr.split("-"), item: any = nmbr;
            if (numisplit.length == 2) item = numisplit[1], neg[i] = true;
            item = item.replace(/,/g, "");
            if (item.split(".").length == 2) item = item.replace(/$0+/g, "");
            if (item.length > 1 && item.charAt(0) == ".") item = "0" + item;
            item = ["", ".", "-"].includes(item) ? "0" : item;
            if (!Array.isArray(item)) item = item.split("");
            let numpos = item.indexOf(".");
            num[i] = item.filter((w: string) => w != "."), decimal[i] = numpos != -1 ? item.length - numpos : 0;
        } else if (nmbr instanceof Define) {
            neg[i] = nmbr.isNeg;
            decimal[i] = nmbr.decimals;
            num[i] = [...nmbr.num];
        }
    }

    parse(num1, 1);
    parse(num2, 2);

    if (mode != 5) {
        if (neg[1] != neg[2] && [3, 4].includes(mode)) neg[0] = true;
        let maxChar = Math.max(num[1].length, num[2].length);
        if (decimal[1] > 0 || decimal[2] > 0) {
            decimal[0] = mode == 1 || mode == 2 ? Math.max(decimal[1], decimal[2]) : mode == 3 ? decimal[1] + decimal[2] : decimal[1] - decimal[2];
            if (decimal[0] < 0) decimal[0] = 0;
        }
        for (let i = 0; !neg[0] && (neg[1] || neg[2]) && mode == 1 && num[2].length == maxChar && i < num[1].length; i++)
            if (num[2][i] > num[1][i]) neg[0] = true;
        if (mode == 2 && num[2].length - decimal[2] == maxChar && num[1].length - decimal[1] != maxChar) neg[0] = true;
        if (maxChar == num[2].length && mode == 3) num[1] = [num[2], num[2] = num[1]][0];

        if (decimal[1] != decimal[2] && [1, 2].includes(mode)) {
            if (decimal[1] == decimal[0])
                for (let i = 0; i < decimal[1] - decimal[2]; i++) num[2].push("0");
            else if (decimal[2] == decimal[0])
                for (let i = 0; i < decimal[2] - decimal[1]; i++) num[1].push("0");
        }

        if (num[1].length != num[2].length && [1, 2, 4].includes(mode)) {
            while (num[1].length - num[2].length > 0) num[2].unshift("0");
            while (num[2].length - num[1].length > 0) num[1].unshift("0");
        }
        let negCalc = num[2].length == maxChar;
        for (let i = 0; !neg[0] && mode == 2 && negCalc && !(num[1][i] > num[2][i]) && i < num[1].length; i++)
            if (num[1][i] < num[2][i]) neg[0] = true;
    }
    if ([3, 4].includes(mode) && neg[1] && neg[2]) neg[0] = false;
    if ([3, 4].includes(mode)) neg[1] = false, neg[2] = false;
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

function formatOutput(final: string[]|string, decimals: number, neg: boolean[]|boolean, array: boolean = true, reverse: boolean = true) {
    if (!array && typeof final == "string") final = final.length > 1 ? final.split("") : [final];
    if (typeof final != "string") {
        if (reverse && final.length > 1) final = final.reverse();
        if (decimals > 0) final.splice(final.length - decimals, 0, ".");
        final = final.join("");
        if (final.split(".").length == 2) final = final.replace(/\.?0+$/g, '');
        final = final.replace(/^0+/g, '');
        if (final.length > 1 && final.charAt(0) == ".") final = "0" + final;
        if (neg[0]) final = "-" + final;
        if (final.charAt(final.length - 1) == "." || final.charAt(0) == ".") final = final.replace(".", "");
        final = ["", ".", "-", "-0"].includes(final) ? "0" : final;
        return final;
    }
}

export function togglePowerMode() {
    if (!powermode) console.info("Disabled power mode. Recommended for debugging only.");
    else console.info(`Enabled power mode. This will make it so the library will only activate if the sum/difference is over maxNumber (${maxNumber}).`, "To enable power mode forever, change the first variable on line 10 to true.");
    powermode = !powermode;
}

export function setMaxSafeInteger(maxSafeInteger: number|"default") {
    if (powermode) {
        if (maxSafeInteger == "default") maxNumber = Number.MAX_SAFE_INTEGER;
        else maxNumber = maxSafeInteger;
        console.info(`To set the max safe number back to the default value of ${Number.MAX_SAFE_INTEGER}, do setMaxSafeInteger('default');`, "To change the value forever, change the variable on lines 12 (maximum) & 13 (minimum).");
    } else console.warn("You must turn on Power Mode before you can set the max safe number.");
}

export function setMaxDecimalLength(maxDecimalLength: number|"default") {
    if (maxDecimalLength == "default") maxDecimal = maxNumber;
    else maxDecimal = maxDecimalLength;
    console.info(`To set the max decimal length back to the default value of ${maxNumber}, do setMaxDecimalLength('default');`, "To change teh value forever, change the variable on line 14.");
}

function shouldRun(num1: string | Define, num2: string | Define) {
    if (num1 instanceof Define) num1 = num1.num.join("");
    else if (num1[0] == "-") num1 = num1.substr(1);

    if (num2 instanceof Define) num2 = num2.num.join("");
    else if (num2[0] == "-") num2 = num2.substr(1);

    if (num1.length >= String(maxNumber).length || num2.length >= String(maxNumber).length) return true;
    let maxstr = String(maxNumber),
        maxChar = Math.max(num1.length, num2.length),
        num = maxChar == num1.length ? num1 : num2;
    for (let i = Math.max(num1.length, num2.length); i > 0; i++)
        if (+num[i] > +maxstr[i]) return true;
    return false;
}

export function add(...numbers: (string | Define)[]): string {
    function temp(num1: string|Define, num2:string|Define) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parseNumbers(num1, num2, 1),
                neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
                decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals],
                num = [null, parsedNums.num1.num, parsedNums.num2.num],
                final = [],
                carry = "0",
                finali: number, time: number;
            if (neg[2]) return subtract(parsedNums.num1, parsedNums.num2.set("isNeg", false));
            else if (neg[1]) return subtract(parsedNums.num2, parsedNums.num1.set("isNeg", false));
            for (let i = parsedNums.maxChar - 1; i >= 0; i--) {
                finali = parsedNums.maxChar - i - 1;
                if (time != i + 1) carry = "0";
                final[finali] = String(+num[1][i] + (+num[2][i]) + (+carry));
                if (+final[finali] > 9) {
                    var temp = final[finali].split('');
                    final[finali] = temp[1], carry = temp[0], time = i;
                    if (i - 1 < 0) final.push(carry);
                }
            }
            return formatOutput(final, decimal[0], neg);
        } else return String((num1 instanceof Define ? num1.getNumber() : +num1) + (num2 instanceof Define ? num2.getNumber() : +num2));
    }
    let permfinal: string | Define, a = [...numbers];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++) permfinal = temp(permfinal, a[i]);
    return permfinal;
}

export function subtract(...numbers: (string | Define)[]): string {
    function temp(num1:string|Define, num2:string|Define) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parseNumbers(num1, num2, 2),
                neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
                decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals],
                num = [null, parsedNums.num1.num, parsedNums.num2.num],
                final = [];

            if (neg.includes(true)) {
                if ((neg[0] && !neg[1] && !neg[2]) || (neg[1] && neg[2])) num[1] = [num[2], num[2] = num[1]][0];
                else if (neg[2] && !neg[1]) return add(parsedNums.num1, parsedNums.num2.set("isNeg", false));
                else if (neg[1] && !neg[2]) return "-" + add(parsedNums.num1.set("isNeg", false), parsedNums.num2);
            }
            for (let i = parsedNums.maxChar - 1; i >= 0; i--) {
                let finali = parsedNums.maxChar - i - 1, fans = +num[1][i] - +num[2][i];
                if (fans < 0 && i != 0) {
                    let j = i - 1;
                    final[finali] = String(fans + 10), num[1][j] = String(+num[1][j] - 1);
                    while (num1[j] < 0 && j != decimal[1]) num[1][j] = String((+num[1][j]) + 10), j = j - 1, num[1][j] = String(+num[1][j] - 1);
                    if (decimal[1] > 0 && j == decimal[1])
                        while (num1[j] < 0 && j != 0) num[1][j] = String((+num[1][j]) + 10), j = j - 1, num[1][j] = String(num[1][j] + 1);
                } else if (fans <= 0 && i == 0) final[finali] = String(fans).split("-").length > 1 ? +String(fans).split("-")[1] - 1 : String(fans);
                else final[finali] = fans;
            }
            return formatOutput(final, decimal[0], neg);
        } else return String((num1 instanceof Define ? num1.getNumber() : +num1) - (num2 instanceof Define ? num2.getNumber() : +num2));
    }
    let permfinal: string | Define, a = [...numbers];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++) permfinal = temp(permfinal, a[i]);
    return permfinal;
}

export function isLessThan(num1: string | Define, num2: string | Define): boolean {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        let num = subtract(num2, num1);
        if (num.split("-").length == 1 && +num != 0) return true;
        return false;
    } else return (num1 instanceof Define ? num1.getNumber() : +num1) < (num2 instanceof Define ? num2.getNumber() : +num2);
}

export function isGreaterThan(num1: string | Define, num2: string | Define): boolean {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        let num = subtract(num1, num2);
        if (num.split("-").length == 1 && +num != 0) return true;
        return false;
    } else return (num1 instanceof Define ? num1.getNumber() : +num1) > (num2 instanceof Define ? num2.getNumber() : +num2);
}

export function isLessThanEqual(num1: string | Define, num2: string | Define): boolean {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (subtract(num2, num1).split("-").length == 1) return true;
        return false;
    } else return (num1 instanceof Define ? num1.getNumber() : +num1) <= (num2 instanceof Define ? num2.getNumber() : +num2);
}

export function isGreaterThanEqual(num1: string | Define, num2: string | Define): boolean {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (subtract(num1, num2).split("-").length == 1) return true;
        return false;
    } else return (num1 instanceof Define ? num1.getNumber() : +num1) >= (num2 instanceof Define ? num2.getNumber() : +num2);
}

export function round(item: string | Define): string {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        if (item instanceof Define) {
            let temp = item.num[item.decimals];
            item.num.length -= item.decimals;
            if (item.decimals > 0 && +temp > 4) return add(item.num.join(""), new Define(["1"], false, 0));
            return item.num.join("");
        }
        let temp = item.split(".");
        if (temp.length > 1 && +temp[1].split("")[0] > 4) return add(temp[0], new Define(["1"], false, 0));
        return temp[0];
    } else return String(Math.round(item instanceof Define ? item.getNumber() : +item));
}

export function roundDown(item: string | Define): string {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        if (item instanceof Define) {
            item.num.length -= item.decimals;
            return item.isNeg ? subtract("-"+item.num.join(""), new Define(["1"], false, 0)) : item.num.join(""); 
        }
        let temp = item.split(".")[0];
        return temp[0] == "-" ? subtract(temp, new Define(["1"], false, 0)) : temp;
    } else return String(Math.floor(item instanceof Define ? item.getNumber() : +item));
}

export function roundUp(item: string | Define): string {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        if (item instanceof Define) return item.decimals > 0 ? item.isNeg ? formatOutput((()=>{ item.num.length -= item.decimals; return item.num; })(), 0, true) : add(item, new Define(["1"], false, 0)) : formatOutput(item.num, 0, item.isNeg);
        let temp = item.split(".");
        return temp.length == 2 ? temp[0][0] == "-" ? temp[0] : add(temp[0], new Define(["1"], false, 0)) : item;
    } else return String(Math.ceil(item instanceof Define ? item.getNumber() : +item));
}

export function multiply(...numbers: (string | Define)[]): string {
    function temp(num1:string|Define, num2:string|Define) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parseNumbers(num1, num2, 3),
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
    let permfinal: string | Define, a = [...numbers];
    permfinal = temp(a[0], a[1]);
    for (let i = 2; i < a.length; i++) permfinal = temp(permfinal, a[i]);
    return permfinal;
}

export function divide(...numbers: string[]): string {
    function temp(num1:string|Define, num2:string|Define, maxD: number, i: number, getDec: boolean) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parseNumbers(num1, num2, 4),
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
    function temp(num1: string | Define, num2: string | Define, maxD: any) {
        if (!powermode || (powermode && shouldRun(num1, num2))) {
            let parsedNums = parseNumbers(num1, num2, 5),
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

export function factorial(item: string | Define): string|Define {
    return +item < 0 ? new Define(["1"], true, 0) : +item == 0 ? new Define(["1"], false, 0) : multiply(item, factorial(subtract(item, new Define(["1"], false, 0))));
}

export {
    exponent as pow,
    roundUp as ceil,
    roundDown as floor
}