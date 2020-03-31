/**
 * Copyright 2019-2020 Eric (VirxEC/Virx) Michael Veilleux
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License
 *
 * This is the NodeJS/ModuleJS release of {@link https://github.com/VirxEC/CalcPlus CalcPlus} as seen on {@link https://www.virxcase.ga VirxEC Showcase}
 *
 * For more information about CalcPlus, go to {@link https://www.virxcase.ga/CalcPlus/ About CalcPlus on VirxEC Showcase}
 *
 * To preview this library online, go to {@link https://www.virxcase.ga/CP-P Preview CalcPlus on VirxEC Showcase}
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
    maxNumberLength: String(Number.MAX_SAFE_INTEGER).length - 1,
    maxDecimalLength: 10 // Feel free to change this, or use setMaxDecimalLength(maxDecimalLength);
};
var powermode = defaults.powermode, maxNumberLength = defaults.maxNumberLength, maxDecimalLength = defaults.maxDecimalLength;
let varinfo = (obj) => console.log(JSON.stringify(obj)); // For debugging
export function define(numberString) {
    let isNegative, decimals;
    numberString = numberString.replace(/,/g, "");
    if (numberString[0] === "-")
        numberString = numberString.replace("-", ""), isNegative = true;
    else
        isNegative = false;
    if (numberString.includes(".")) {
        decimals = numberString.length - numberString.indexOf(".");
        numberString = numberString.replace(".", "");
    }
    else
        decimals = 0;
    return {
        numbers: numberString.split(""),
        isNegative,
        decimals
    };
}
export var MathMode;
(function (MathMode) {
    MathMode[MathMode["ADD"] = 1] = "ADD";
    MathMode[MathMode["SUBTRACT"] = 2] = "SUBTRACT";
    MathMode[MathMode["MULTIPLY"] = 3] = "MULTIPLY";
    MathMode[MathMode["DIVIDE"] = 4] = "DIVIDE";
})(MathMode || (MathMode = {}));
export function parse(num1, num2, mathMode) {
    let isNeg = false, decimals = 0;
    if (num1.decimals > 0 || num2.decimals > 0) {
        decimals = [1, 2].includes(mathMode) ? Math.max(num1.decimals, num2.decimals) : mathMode === 3 ? num1.decimals + num2.decimals : num1.decimals - num2.decimals;
        if (decimals < 0)
            decimals = 0;
    }
    const maxChar = Math.max(num1.numbers.length, num2.numbers.length);
    if ([1, 2].includes(mathMode)) {
        if (mathMode === 1) {
            if (num2.numbers.length === maxChar) {
                for (let i = 0; !isNeg && (num1.isNegative || num2.isNegative) && i < num1.numbers.length; i++) {
                    if (num2.numbers[i] > num1.numbers[i])
                        isNeg = true;
                }
            }
        }
        if (mathMode == 2) {
            if (num1.isNegative && num2.isNegative) {
                num1.isNegative = false;
                num2.isNegative = false;
            }
            if (num2.numbers.length - num2.decimals === maxChar && num1.numbers.length - num1.decimals !== maxChar)
                isNeg = true;
            if (!isNeg && num2.numbers.length === maxChar) {
                for (let i = 0; !isNeg && !(num1.numbers[i] > num2.numbers[i]) && i < num1.numbers.length; i++) {
                    if (num1.numbers[i] < num2.numbers[i])
                        isNeg = true;
                }
            }
            if (isNeg && !num1.isNegative && !num2.isNegative)
                num1 = [num2, num2 = num1][0];
        }
        if (num1.numbers.length !== num2.numbers.length) {
            if (num1.decimals !== num2.decimals) {
                if (num1.decimals === decimals)
                    for (let i = 0; i < num1.decimals - num2.decimals; i++)
                        num2.numbers.push("0");
                else if (num2.decimals === decimals)
                    for (let i = 0; i < num2.decimals - num1.decimals; i++)
                        num1.numbers.push("0");
            }
            while (num1.numbers.length - num2.numbers.length > 0) {
                num2.numbers.unshift("0");
                num2.decimals++;
            }
            while (num2.numbers.length - num1.numbers.length > 0) {
                num1.numbers.unshift("0");
                num1.decimals++;
            }
        }
    }
    if (mathMode === 3 || mathMode === 4) {
        if (mathMode === 3) {
            if (maxChar === num2.numbers.length)
                num1 = [num2, num2 = num1][0];
        }
        if (num1.isNegative !== num2.isNegative)
            isNeg = true;
        if (num1.isNegative && num2.isNegative) {
            isNeg = false;
            num1 = [num2, num2 = num1][0];
        }
        if (mathMode === 4) {
            for (let i = num1.numbers.length; i < num2.numbers.length; i++) {
                num1.numbers.push("0");
                decimals++;
            }
        }
    }
    return {
        num1,
        num2,
        isNeg,
        decimals
    };
}
function formatOutput(numbers, decimals, isNegative) {
    if (decimals > 0)
        numbers.splice(numbers.length - decimals + 1, 0, ".");
    let final = numbers.join("");
    if (final.includes("."))
        final = final.replace(/\.?0+$/g, '');
    final = final.replace(/^0+/g, '');
    if (final.length > 1 && final[0] === ".")
        final = "0" + final;
    if (isNegative)
        final = "-" + final;
    if (final[final.length - 1] === "." || final[0] === ".")
        final = final.replace(".", "");
    return ["", ".", "-", "-0"].includes(final) ? "0" : final;
}
function toNumber(item) {
    return typeof item === "number" ? item : typeof item === "string" ? +item : +formatOutput(item.numbers, item.decimals, item.isNegative);
}
function shouldRun(num1, num2) {
    if (powermode) {
        if (typeof num1 === "string") {
            if (num1[0] === "-")
                num1 = num1.substr(1);
        }
        else
            num1 = num1.numbers.join("");
        if (num1.length > maxNumberLength)
            return true;
        if (num2 === null)
            return false;
        if (typeof num2 === "string") {
            if (num2[0] === "-")
                num2 = num2.substr(1);
        }
        else
            num2 = num2.numbers.join("");
        if (num2.length > maxNumberLength)
            return true;
        return false;
    }
    return true;
}
export function setPowerMode(mode) {
    powermode = mode;
}
export function getPowerMode() {
    return powermode;
}
export function setMaxSafeInteger(maxIntegerLength) {
    maxNumberLength = maxIntegerLength === "default" ? defaults.maxNumberLength : maxIntegerLength;
}
export function getMaxSafeInteger() {
    return maxNumberLength;
}
export function setMaxDecimalLength(maxDecimals) {
    maxDecimalLength = maxDecimals === "default" ? defaults.maxDecimalLength : maxDecimals;
}
export function getMaxDecimalLength() {
    return maxDecimalLength;
}
function ADD(num1, num2) {
    if (typeof num1 !== "number" && typeof num2 !== "number" && shouldRun(num1, num2)) {
        if (typeof num1 === "number")
            num1 = define(String(num1));
        else if (typeof num2 === "number")
            num2 = define(String(num2));
        if (typeof num1 === "string")
            num1 = define(num1);
        if (typeof num2 === "string")
            num2 = define(num2);
        if (num2.isNegative) {
            num2.isNegative = false;
            return SUBTRACT(num1, num2);
        }
        if (num1.isNegative) {
            num1.isNegative = false;
            return SUBTRACT(num2, num1);
        }
        const parsed = parse(num1, num2, 1), maxChar = Math.max(parsed.num1.numbers.length, parsed.num2.numbers.length);
        let final = [], carry = 0;
        num1 = parsed.num1, num2 = parsed.num2;
        for (let i = maxChar - 1; i >= 0; i--) {
            let semifinal = +num1.numbers[i] + +num2.numbers[i];
            semifinal += carry, carry = 0;
            if (semifinal > 9) {
                semifinal = String(semifinal);
                const carryChar = semifinal[0];
                final.push(semifinal[1]);
                if (i === 0)
                    final.push(carryChar);
                carry = +carryChar;
            }
            else
                final.push(String(semifinal));
        }
        return {
            numbers: final.reverse(),
            isNegative: parsed.isNeg,
            decimals: parsed.decimals
        };
    }
    else
        return toNumber(num1) + toNumber(num2);
}
export function add(...numbers) {
    const a = [...numbers];
    let permfinal = ADD(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = ADD(permfinal, a[i]);
    return typeof permfinal === "number" ? permfinal : formatOutput(permfinal.numbers, permfinal.decimals, permfinal.isNegative);
}
function SUBTRACT(num1, num2) {
    if (typeof num1 !== "number" && typeof num2 !== "number" && shouldRun(num1, num2)) {
        if (typeof num1 === "number")
            num1 = define(String(num1));
        else if (typeof num2 === "number")
            num2 = define(String(num2));
        if (typeof num1 === "string")
            num1 = define(num1);
        if (typeof num2 === "string")
            num2 = define(num2);
        if (!num1.isNegative && num2.isNegative) {
            num2.isNegative = false;
            return ADD(num1, num2);
        }
        if (num1.isNegative && !num2.isNegative) {
            num1.isNegative = false;
            const item = ADD(num1, num2);
            if (typeof item === "number")
                return item * -1;
            item.isNegative = true;
            return item;
        }
        const parsed = parse(num1, num2, 2), maxChar = Math.max(num1.numbers.length, num2.numbers.length);
        let final = [];
        num1 = parsed.num1, num2 = parsed.num2;
        for (let i = maxChar - 1; i >= 0; i--) {
            const finali = maxChar - i - 1, semifinal = +num1.numbers[i] - +num2.numbers[i];
            if (semifinal < 0) {
                if (i === 0)
                    final[finali] = String(semifinal * -1 - 1);
                else {
                    let j = i - 1;
                    final[finali] = String(semifinal + 10), num1.numbers[j] = String(+num1.numbers[j] - 1);
                    while (+num1.numbers[j] < 0 && j !== num1.decimals)
                        num1.numbers[j] = String(+num1[j] + 10), j = j - 1, num1.numbers[j] = String(+num1.numbers[j] - 1);
                    if (num1.decimals > 0 && j === num1.decimals) {
                        while (+num1.numbers[j] < 0 && j !== 0)
                            num1.numbers[j] = String((+num1.numbers[j]) + 10), j = j - 1, num1.numbers[j] = String(num1.numbers[j] + 1);
                    }
                }
            }
            else
                final[finali] = String(semifinal);
        }
        return {
            numbers: final.reverse(),
            isNegative: parsed.isNeg,
            decimals: parsed.decimals
        };
    }
    else
        return toNumber(num1) - toNumber(num2);
}
export function subtract(...numbers) {
    const a = [...numbers];
    let permfinal = SUBTRACT(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = SUBTRACT(permfinal, a[i]);
    return typeof permfinal === "number" ? permfinal : formatOutput(permfinal.numbers, permfinal.decimals, permfinal.isNegative);
}
export function isLessThan(num1, num2) {
    if (typeof num1 !== "number" && typeof num2 !== "number" && shouldRun(num1, num2)) {
        const num = SUBTRACT(num2, num1);
        if (typeof num === "string" && num[0] !== "-" && +num !== 0)
            return true;
        else if (typeof num === "object" && !num.isNegative && +num.numbers !== 0)
            return true;
        return false;
    }
    else
        return toNumber(num1) < toNumber(num2);
}
export function isGreaterThan(num1, num2) {
    if (typeof num1 !== "number" && typeof num2 !== "number" && shouldRun(num1, num2)) {
        const num = SUBTRACT(num2, num1);
        if (typeof num === "string" && num[0] === "-" && +num !== 0)
            return true;
        else if (typeof num === "object" && num.isNegative && +num.numbers !== 0)
            return true;
        return false;
    }
    else
        return toNumber(num1) > toNumber(num2);
}
// this function doesn't work!
export function isLessThanEqual(num1, num2) {
    if (typeof num1 !== "number" && typeof num2 !== "number" && shouldRun(num1, num2)) {
        const num = SUBTRACT(num2, num1);
        if (typeof num === "string" && num[0] !== "-")
            return true; // type === number
        else if (typeof num === "object" && !num.isNegative)
            return true;
        return false;
    }
    else
        return toNumber(num1) < toNumber(num2);
}
export function isGreaterThanEqual(num1, num2) {
    if (typeof num1 !== "number" && typeof num2 !== "number" && shouldRun(num1, num2)) {
        const num = SUBTRACT(num2, num1);
        if (typeof num === "string" && num[0] === "-")
            return true;
        else if (typeof num === "object" && num.isNegative)
            return true;
        return false;
    }
    else
        return toNumber(num1) > toNumber(num2);
}
export function round(item) {
    if (typeof item !== "number" && shouldRun(item)) {
        if (typeof item === "object") {
            let temp = item.numbers[item.decimals];
            item.numbers.length -= item.decimals;
            if (item.decimals > 0 && +temp > 4) {
                const final = ADD(item.numbers.join(""), { numbers: ["1"], isNegative: false, decimals: 0 });
            }
            return item.numbers.join("");
        }
        const temp = item.split(".");
        if (temp.length > 1 && +temp[1].split("")[0] > 4) {
            const final = ADD(temp[0], { numbers: ["1"], isNegative: false, decimals: 0 });
            return typeof final === "object" ? formatOutput(final.numbers, final.decimals, final.isNegative) : final;
        }
        return temp[0];
    }
    else
        return Math.round(toNumber(item));
}
export function roundDown(item) {
    if (typeof item !== "number" && shouldRun(item)) {
        let final;
        if (typeof item === "object") {
            item.numbers.length -= item.decimals;
            final = item.isNegative ? SUBTRACT("-" + item.numbers.join(""), { numbers: ["1"], isNegative: false, decimals: 0 }) : item.numbers.join("");
        }
        else {
            const temp = item.split(".")[0];
            final = temp[0] === "-" ? SUBTRACT(temp, { numbers: ["1"], isNegative: false, decimals: 0 }) : temp;
        }
        return typeof final === "object" ? formatOutput(final.numbers, final.decimals, final.isNegative) : final;
    }
    else
        return Math.floor(toNumber(item));
}
export function roundUp(item) {
    if (typeof item !== "number" && shouldRun(item)) {
        let final;
        if (typeof item === "object")
            final = item.decimals > 0 ? item.isNegative ? formatOutput((() => { item.numbers.length -= item.decimals; return item.numbers.reverse(); })(), 0, true) : ADD(item, { numbers: ["1"], isNegative: false, decimals: 0 }) : formatOutput(item.numbers.reverse(), 0, item.isNegative);
        else {
            const temp = item.split(".");
            final = temp.length === 2 ? temp[0][0] === "-" ? temp[0] : ADD(temp[0], { numbers: ["1"], isNegative: false, decimals: 0 }) : item;
        }
        return typeof final === "object" ? formatOutput(final.numbers, final.decimals, final.isNegative) : final;
    }
    else
        return Math.ceil(toNumber(item));
}
function MULTIPLY(num1, num2) {
    if (typeof num1 !== "number" && typeof num2 !== "number" && shouldRun(num1, num2)) {
        if (typeof num1 === "number")
            num1 = define(String(num1));
        else if (typeof num2 === "number")
            num2 = define(String(num2));
        if (typeof num1 === "string")
            num1 = define(num1);
        if (typeof num2 === "string")
            num2 = define(num2);
        let final = [], f = [];
        for (let bottom = num2.numbers.length - 1; bottom >= 0; bottom--) {
            const r1i = num2.numbers.length - bottom - 1;
            let semifinal = [], carry = 0;
            if (bottom !== num2.numbers.length - 1)
                f.push("0");
            for (let top = num1.numbers.length - 1; top >= 0; top--) {
                const r2i = num1.numbers.length - top - 1;
                if (+num2.numbers[bottom] !== 0 && +num1.numbers[bottom] !== 0) {
                    let trifinal = +num2.numbers[bottom] * +num1.numbers[top] + carry;
                    carry = 0;
                    if (+trifinal > 9) {
                        trifinal = "" + trifinal;
                        const carryChar = trifinal[0];
                        semifinal[r2i] = trifinal[1];
                        if (top === 0)
                            semifinal.push(carryChar);
                        carry = +carryChar;
                    }
                    else
                        semifinal[r2i] = "" + trifinal;
                }
                else
                    semifinal[r2i] = "0";
            }
            if (f.length > 0)
                semifinal = f.concat(semifinal);
            final[r1i] = {
                numbers: semifinal.reverse(),
                isNegative: false,
                decimals: 0
            };
        }
        if (final.length > 1) {
            let answer = ADD(final[0], final[1]);
            for (let i = 2; i < final.length; i++)
                answer = ADD(answer, final[i]);
            return answer;
        }
        return final[0];
    }
    else
        return toNumber(num1) * toNumber(num2);
}
export function multiply(...numbers) {
    const a = [...numbers];
    let permfinal = MULTIPLY(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = MULTIPLY(permfinal, a[i]);
    return typeof permfinal === "number" ? permfinal : formatOutput(permfinal.numbers, permfinal.decimals, permfinal.isNegative);
}
function DIVIDE(num1, num2, maxD, i, getDec) {
    return toNumber(num1) / toNumber(num2);
}
export function divide(...numbers) {
    const a = [...numbers];
    let permfinal = DIVIDE(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = DIVIDE(permfinal, a[i]);
    return typeof permfinal === "number" ? permfinal : formatOutput(permfinal.numbers.reverse(), permfinal.decimals, permfinal.isNegative);
}
/*export function divide(...numbers: string[]): string {
    function temp(num1:string|Define, num2:string|Define, maxD: number, i: number, getDec: boolean) {
        if (typeof num1 !== "number" && typeof num2 !== "number" && shouldRun(num1, num2)) {
            let parsedNums = parse(num1, num2, 4),
                nelse eg = [parsedNums.isNegative, parsedNums.numbers1.isNegative, parsedNums.numbers2.isNegative],
                n
                um: any = [parsedNums.numbers1.numbers, parsedNums.numbers2.numbers],
                decimals = parsedNums.decimals,
                final: any = "0";
            if (num[0].numbers === ["0"]) return "0";
            if (isLessThanEqual(num[1], num[0]))
                while (isLessThanEqual(num[1], num[0])) num[0] = subtract(num[0], num[1]), final = add(final, { numbers: ["1"], isNegative: false, decimals: 0});
            else final = "0";
            if (maxD > decimals && !isLessThanEqual(num[1], num[0]) && num[0] !== "0" && subtract(num[0], num[1]) !== "0") {
                if (num[0] !== "0") num[0] = num[0] + "0";
                if (num[1][0] !== "0" && num[1].length !== 1) num[1].push("0");
                final = final.split("").reverse().join("");
                if (i !== 1) i++;
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
            // if (i === 1) decimals++;
            while (decimals > final.length) final.push("0");
            final = formatOutput(final, decimals, neg);
            return getDec ? {
                final,
                decimal: decimals
            } : final;
        } else return String(toNumber(num1) / toNumber(num2));
    }
    let a = [...numbers], permfinal = temp(a[0], a[1], maxDecimal, 1, false);
    for (let i = 2; i < a.length - 1; i++) permfinal = temp(permfinal, a[i], maxDecimal, 1, false);
    return permfinal;
}*/
function EXPONENT(num1, num2, maxD) {
    if (typeof num1 !== "number" && typeof num2 !== "number" && shouldRun(num1, num2)) {
        if (typeof num1 === "number")
            num1 = define(String(num1));
        else if (typeof num2 === "number")
            num2 = define(String(num2));
        if (typeof num1 === "string")
            num1 = define(num1);
        if (typeof num2 === "string")
            num2 = define(num2);
        if (!maxD)
            maxD = maxDecimalLength;
        varinfo({ num1 });
        varinfo({ num2 });
        if (num1.decimals > 0) {
            // root_of_decimal2*10(num1)**(num2*(10*decimal2))
            throw new TypeError("Decimal exponentnents aren't supported yet");
        }
        else {
            if (num2.numbers.length === 1 && num2.numbers[0] === "1" && !num2.isNegative)
                return { numbers: num1.numbers, isNegative: false, decimals: num1.decimals };
            else if ((num2.numbers.length === 1 && +num2.numbers[0] === 0) || num1.numbers.length === 1 && +num1.numbers[0] === 1 && !num1.isNegative)
                return { numbers: ["1"], isNegative: false, decimals: 0 };
            else if (num2.isNegative) {
                num2.isNegative = false;
                return DIVIDE({ numbers: ["1"], isNegative: false, decimals: 0 }, num2, maxD);
            }
            else if (num1.isNegative) {
                num2.isNegative = false;
                return DIVIDE("1", EXPONENT(num1, num2), maxD);
            }
            else {
                let final = MULTIPLY(num1, num1), num2Filtered = num2.numbers.join('').replace(/^0+/g, '').split('');
                varinfo({ final });
                for (let i = { numbers: ["2"], isNegative: false, decimals: 0 }; isLessThanEqual(i, { numbers: num2Filtered, isNegative: false, decimals: 0 }); i = ADD(i, { numbers: ["1"], isNegative: false, decimals: 0 })) {
                    final = MULTIPLY(final, num1);
                    varinfo({ i });
                }
                return final;
            }
        }
    }
    else
        return toNumber(num1) ** toNumber(num2);
}
export function exponent(...numbers) {
    const a = [...numbers];
    let permfinal = EXPONENT(a[0], a[1]);
    for (let i = 2; i < a.length; i++)
        permfinal = EXPONENT(permfinal, a[i]);
    return typeof permfinal === "number" ? permfinal : formatOutput(permfinal.numbers, permfinal.decimals, permfinal.isNegative);
}
function FACTORIAL(item) {
    return +item < 0 ? { numbers: ["1"], isNegative: true, decimals: 0 } : +item === 0 ? { numbers: ["1"], isNegative: false, decimals: 0 } : MULTIPLY(item, FACTORIAL(SUBTRACT(item, { numbers: ["1"], isNegative: false, decimals: 0 })));
}
export function factorial(number) {
    const final = FACTORIAL(number);
    return typeof final == "number" ? final : formatOutput(final.numbers, final.decimals, final.isNegative);
}
export { exponent as pow, roundUp as ceil, roundDown as floor };
//# sourceMappingURL=calcplus.js.map