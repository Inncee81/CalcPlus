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
    maxDecimalLength: 10
};
var powermode = defaults.powermode, maxNumberLength = defaults.maxNumberLength, maxDecimalLength = defaults.maxDecimalLength;
let varinfo = (obj) => console.log(JSON.stringify(obj));
export function define(numberString) {
    let isNegative, decimals;
    numberString = numberString.replace(/,/g, "");
    if (numberString[0] === "-")
        numberString = numberString.replace("-", ""), isNegative = true;
    else
        isNegative = false;
    if (numberString.includes(".")) {
        decimals = numberString.length - numberString.indexOf(".") - 1;
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
            if (!isNeg && (num1.isNegative || num2.isNegative) && num2.numbers.length === maxChar) {
                for (let i = 0; i < num1.numbers.length; i++) {
                    if (num2.numbers[i] > num1.numbers[i]) {
                        isNeg = true;
                        break;
                    }
                }
            }
        }
        if (num1.numbers.length !== num2.numbers.length) {
            if (num1.decimals !== num2.decimals) {
                if (num1.decimals === decimals) {
                    for (let i = 0; i < num1.decimals - num2.decimals; i++) {
                        num2.decimals++;
                        num2.numbers.push("0");
                    }
                }
                else if (num2.decimals === decimals) {
                    for (let i = 0; i < num2.decimals - num1.decimals; i++) {
                        num1.decimals++;
                        num1.numbers.push("0");
                    }
                }
            }
            while (num1.numbers.length - num2.numbers.length > 0)
                num2.numbers.unshift("0");
            while (num2.numbers.length - num1.numbers.length > 0)
                num1.numbers.unshift("0");
        }
        if (mathMode === 2) {
            if (num1.isNegative && num2.isNegative) {
                num1.isNegative = false;
                num2.isNegative = false;
                num1 = [num2, num2 = num1][0];
            }
            if (!isNeg && num2.numbers.length === maxChar) {
                for (let i = 0; i < maxChar; i++) {
                    if (num1.numbers[i] === num2.numbers[i])
                        continue;
                    else if (num1.numbers[i] > num2.numbers[i])
                        break;
                    else {
                        isNeg = true;
                        break;
                    }
                }
            }
            if (isNeg && !num1.isNegative && !num2.isNegative)
                num1 = [num2, num2 = num1][0];
        }
    }
    if ([3, 4].includes(mathMode)) {
        if (mathMode === 3) {
            if (maxChar === num2.numbers.length)
                num1 = [num2, num2 = num1][0];
            if (num1.numbers.length !== num2.numbers.length) {
                if (num1.decimals !== num2.decimals) {
                    if (num1.decimals === decimals) {
                        for (let i = 0; i < num1.decimals - num2.decimals; i++) {
                            num2.decimals++;
                            num2.numbers.push("0");
                        }
                    }
                    else if (num2.decimals === decimals) {
                        for (let i = 0; i < num2.decimals - num1.decimals; i++) {
                            num1.decimals++;
                            num1.numbers.push("0");
                        }
                    }
                }
                while (num1.numbers.length - num2.numbers.length > 0)
                    num2.numbers.unshift("0");
                while (num2.numbers.length - num1.numbers.length > 0)
                    num1.numbers.unshift("0");
            }
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
        numbers.splice(numbers.length - decimals, 0, ".");
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
        if (num2 === undefined)
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
                        num1.numbers[j] = String(+num1.numbers[j] + 10), j = j - 1, num1.numbers[j] = String(+num1.numbers[j] - 1);
                    if (num1.decimals > 0 && j === num1.decimals) {
                        while (+num1.numbers[j] < 0 && j !== 0)
                            num1.numbers[j] = String(+num1.numbers[j] + 10), j = j - 1, num1.numbers[j] = String(+num1.numbers[j] - 1);
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
        if (typeof num === "number" && Math.sign(num) === -1 && num !== 0)
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
        if (typeof num === "number" && Math.sign(num) === 1 && num !== 0)
            return true;
        else if (typeof num === "object" && num.isNegative && +num.numbers !== 0)
            return true;
        return false;
    }
    else
        return toNumber(num1) > toNumber(num2);
}
export function isLessThanEqual(num1, num2) {
    if (typeof num1 !== "number" && typeof num2 !== "number" && shouldRun(num1, num2)) {
        const num = SUBTRACT(num2, num1);
        if (typeof num === "number" && Math.sign(num) === 1)
            return true;
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
        if (typeof num === "number" && Math.sign(num) === -1)
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
                return typeof final === "object" ? formatOutput(final.numbers, final.decimals, final.isNegative) : final;
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
export { roundUp as ceil, roundDown as floor };
//# sourceMappingURL=calcplus.js.map