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

const defaults: { powermode: boolean, maxNumberLength: number, maxDecimalLength: number } = {
    powermode: false, // Feel free to change this, or use togglePowerMode();
    maxNumberLength: 15, // Feel free to change this, or use setMaxIntegerLength(maxIntegerLength);
    maxDecimalLength: 10 // Feel free to change this, or use setMaxDecimalLength(maxDecimalLength);
};

var powermode: boolean = defaults.powermode,
    maxNumberLength: number = defaults.maxNumberLength,
    maxDecimalLength: number = defaults.maxDecimalLength;

let varinfo = (obj: object) => console.log(JSON.stringify(obj)); // For debugging

export class Define extends Object {
    num: string[];
    isNeg: boolean;
    decimals: number;
    
    constructor(numberString: string[], isNegative: boolean, decimals: number)
    constructor(numberString: string);
    constructor(numberString: string | string[], isNegative?: boolean, decimals?: number) {
        super();
        if (typeof numberString == "object") {
            this.num = numberString;
            this.isNeg = isNegative;
            this.decimals = decimals;
        } else if (typeof numberString == "string") {
            numberString = numberString.replace(/,/g, "");

            if (numberString[0] == "-") numberString = numberString.replace("-", ""), this.isNeg = true;
            else this.isNeg = false;

            if (numberString.includes(".")) {
                this.decimals = numberString.indexOf(".");
                numberString = numberString.replace(".", "");
            } else this.decimals = 0;
            
            this.num = numberString.split("");
        }
    }

    public getNumber() {
        return +formatOutput(this.num, this.decimals, this.isNeg, false);
    }
}

export enum MathMode { ADD=1, SUBTRACT, MULTIPLY, DIVIDE, EXPONENT }

export function parse(num1: Define, num2: Define, mathMode: MathMode): { num1: Define, num2: Define, isNeg: boolean, decimals: number } {
    let isNeg: boolean = false,
        decimals: number = 0;

    if (mathMode != 5) {
        if (num1.isNeg != num2.isNeg && [3, 4].includes(mathMode)) isNeg = true;
        let maxChar = Math.max(num1.num.length, num2.num.length);
        if (num1.decimals > 0 || num2.decimals > 0) {
            decimals = mathMode == 1 || mathMode == 2 ? Math.max(num1.decimals, num2.decimals) : mathMode == 3 ? num1.decimals + num2.decimals : num1.decimals - num2.decimals;
            if (decimals < 0) decimals = 0;
        }

        for (let i = 0; !isNeg && (num1.isNeg || num2.isNeg) && mathMode == 1 && num2.num.length == maxChar && i < num1.num.length; i++)
            if (num2.num[i] > num1.num[i]) isNeg = true;

        if (mathMode == 2 && num2.num.length - num2.decimals == maxChar && num1.num.length - num1.decimals != maxChar) isNeg = true;
        if (maxChar == num2.num.length && mathMode == 3) num1.num = [num2.num, num2.num = num1.num][0];

        if (num1.decimals != num2.decimals && [1, 2].includes(mathMode)) {
            if (num1.decimals == decimals)
                for (let i = 0; i < num1.decimals - num2.decimals; i++) num2.num.push("0");
            else if (num2.decimals == decimals)
                for (let i = 0; i < num2.decimals - num1.decimals; i++) num1.num.push("0");
        }

        if (num1.num.length != num2.num.length && [1, 2, 4].includes(mathMode)) {
            while (num1.num.length - num2.num.length > 0) num2.num.unshift("0");
            while (num2.num.length - num1.num.length > 0) num1.num.unshift("0");
        }

        let negCalc = num2.num.length == maxChar;
        for (let i = 0; !isNeg && mathMode == 2 && negCalc && !(num1.num[i] > num2.num[i]) && i < num1.num.length; i++)
            if (num1.num[i] < num2.num[i]) isNeg = true;
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

function formatOutput(final: string[] | string, decimals: number, isNeg: boolean, reverse: boolean = true) {
    if (typeof final == "string") final = final.length > 1 ? final.split("") : [final]
    if (reverse && final.length > 1) final = final.reverse();
    if (decimals > 0) final.splice(final.length - decimals, 0, ".");
    final = final.join("");

    if (final.includes(".")) final = final.replace(/\.?0+$/g, '');
    final = final.replace(/^0+/g, '');

    if (final.length > 1 && final[0] == ".") final = "0" + final;
    if (isNeg) final = "-" + final;
    if (final[final.length - 1] == "." || final[0] == ".") final = final.replace(".", "");

    return ["", ".", "-", "-0"].includes(final) ? "0" : final;
}

export function setPowerMode(mode: boolean): void {
    powermode = mode;
}

export function getPowerMode(): boolean {
    return powermode;
}

export function setMaxSafeInteger(maxIntegerLength: number | "default"): void {
    if (maxIntegerLength == "default") maxNumberLength = defaults.maxNumberLength;
    else maxNumberLength = maxIntegerLength;
}

export function getMaxSafeInteger(): number {
    return maxNumberLength;
}

export function setMaxDecimalLength(maxDecimals: number|"default"): void {
    if (maxDecimals == "default") maxDecimalLength = defaults.maxDecimalLength;
    else maxDecimalLength = maxDecimals;
}

export function getMaxDecimalLength(): number {
    return maxDecimalLength;
}

function shouldRun(num1: Define | string, num2: Define | string): boolean {
    if (num1 instanceof Define) num1 = num1.num.join("");
    else if (num1[0] == "-") num1 = num1.substr(1);

    if (num2 instanceof Define) num2 = num2.num.join("");
    else if (num2[0] == "-") num2 = num2.substr(1);

    if (num1.length > maxNumberLength || num2.length > maxNumberLength) return true;
        
    return false;
}

function ADD(num1: Define | string, num2: Define | string): Define | string {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (typeof num1 == "string") num1 = new Define(num1);
        if (typeof num2 == "string") num2 = new Define(num2);

        const parsed = parse(num1, num2, 1),
            maxChar = Math.max(parsed.num1.num.length, parsed.num2.num.length);

        let final: string[] = [],
            carry: number = 0;

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
            let semifinal: String | number = +num1.num[i] + +num2.num[i];
            if (carry != 0) semifinal += carry, carry = 0;

            if (semifinal > 9) {
                semifinal = String(semifinal);
                const carryChar = semifinal[0];
                final.push(semifinal[1]);

                if (i == 0) final.push(carryChar);

                carry = +carryChar;
            } else final.push(String(semifinal));
        }
        return new Define(final.reverse(), parsed.isNeg, parsed.decimals);
    } else return String((num1 instanceof Define ? num1.getNumber() : +num1) + (num2 instanceof Define ? num2.getNumber() : +num2));
}

export function add(...numbers: (Define | string)[]): string {
    const a = [...numbers];
    let permfinal: Define | string = ADD(a[0], a[1]);
    
    for (let i = 2; i < a.length; i++) permfinal = ADD(permfinal, a[i]);

    return permfinal instanceof Define ? formatOutput(permfinal.num, permfinal.decimals, permfinal.isNeg, false) : permfinal;
}

function SUBTRACT(num1: Define | string, num2: Define | string): Define | string {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (typeof num1 == "string") num1 = new Define(num1);
        if (typeof num2 == "string") num2 = new Define(num2);

        const parsed = parse(num1, num2, 2),
            maxChar = Math.max(num1.num.length, num2.num.length);

        let final: string[] = [];

        num1 = parsed.num1, num2 = parsed.num2;

        if (num2.isNeg && !num1.isNeg) {
            num2.isNeg = false;
            return ADD(num1, num2);
        }

        if (num1.isNeg && !num2.isNeg) {
            num1.isNeg = false;
            const item = ADD(num1, num2);

            if (typeof item == "string") return "-"+item;

            item.isNeg = true;
            return item;
        }


        for (let i = maxChar - 1; i >= 0; i--) {
            const finali: number = maxChar - i - 1,
                semifinal: number = +num1.num[i] - +num2.num[i];
            
            if (semifinal < 0) {
                if (i == 0) final[finali] = String(semifinal*-1 - 1);
                else {
                    let j = i - 1;

                    final[finali] = String(semifinal + 10), num1.num[j] = String(+num1.num[j] - 1);

                    while (+num1.num[j] < 0 && j != num1.decimals) num1.num[j] = String(+num1[j] + 10), j = j - 1, num1.num[j] = String(+num1.num[j] - 1);

                    if (num1.decimals > 0 && j == num1.decimals) {
                        while (+num1.num[j] < 0 && j != 0) num1.num[j] = String((+num1.num[j]) + 10), j = j - 1, num1.num[j] = String(num1.num[j] + 1);
                    }
                }
            } else final[finali] = String(semifinal);
        }

        return new Define(final.reverse(), parsed.isNeg, parsed.decimals);
    } else return String((num1 instanceof Define ? num1.getNumber() : +num1) - (num2 instanceof Define ? num2.getNumber() : +num2));
}

export function subtract(...numbers: (Define | string)[]): string {
    const a = [...numbers];
    let permfinal: Define | string = SUBTRACT(a[0], a[1]);
    
    for (let i = 2; i < a.length; i++) permfinal = SUBTRACT(permfinal, a[i]);

    return permfinal instanceof Define ? formatOutput(permfinal.num, permfinal.decimals, permfinal.isNeg, false) : permfinal;
}

export function isLessThan(num1: Define | string, num2: Define | string): boolean {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        const num: Define | string = SUBTRACT(num2, num1);
        if (typeof num == "string" && num.split("-").length == 1 && +num != 0) return true;
        else if (num instanceof Define && !num.isNeg && +num.num != 0) return true;
        return false;
    } else return (num1 instanceof Define ? num1.getNumber() : +num1) < (num2 instanceof Define ? num2.getNumber() : +num2);
}

export function isGreaterThan(num1: Define | string, num2: Define | string): boolean {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        let num = subtract(num1, num2);
        if (num.split("-").length == 1 && +num != 0) return true;
        return false;
    } else return (num1 instanceof Define ? num1.getNumber() : +num1) > (num2 instanceof Define ? num2.getNumber() : +num2);
}

export function isLessThanEqual(num1: Define | string, num2: Define | string): boolean {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (subtract(num2, num1).split("-").length == 1) return true;
        return false;
    } else return (num1 instanceof Define ? num1.getNumber() : +num1) <= (num2 instanceof Define ? num2.getNumber() : +num2);
}

export function isGreaterThanEqual(num1: Define | string, num2: Define | string): boolean {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (subtract(num1, num2).split("-").length == 1) return true;
        return false;
    } else return (num1 instanceof Define ? num1.getNumber() : +num1) >= (num2 instanceof Define ? num2.getNumber() : +num2);
}

export function round(item: Define | string): string {
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

export function roundDown(item: Define | string): string {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        if (item instanceof Define) {
            item.num.length -= item.decimals;
            return item.isNeg ? subtract("-"+item.num.join(""), new Define(["1"], false, 0)) : item.num.join(""); 
        }
        let temp = item.split(".")[0];
        return temp[0] == "-" ? subtract(temp, new Define(["1"], false, 0)) : temp;
    } else return String(Math.floor(item instanceof Define ? item.getNumber() : +item));
}

export function roundUp(item: Define | string): string {
    if (!powermode || (powermode && shouldRun(item, "0"))) {
        if (item instanceof Define) return item.decimals > 0 ? item.isNeg ? formatOutput((()=>{ item.num.length -= item.decimals; return item.num; })(), 0, true) : add(item, new Define(["1"], false, 0)) : formatOutput(item.num, 0, item.isNeg);
        let temp = item.split(".");
        return temp.length == 2 ? temp[0][0] == "-" ? temp[0] : add(temp[0], new Define(["1"], false, 0)) : item;
    } else return String(Math.ceil(item instanceof Define ? item.getNumber() : +item));
}

function MULTIPLY(num1: Define | string, num2: Define | string): Define | string {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (typeof num1 == "string") num1 = new Define(num1);
        if (typeof num2 == "string") num2 = new Define(num2);
        
        const parsed = parse(num1, num2, 3);
        
        let final: Define[] = [],
            carry: number = 0,
            f: string[] = [];
            
        for (let bottom = num2.num.length - 1; bottom >= 0; bottom--) {
            const r1i: number = num2.num.length - bottom - 1;
            let semifinal: string[] = [];
            
            if (bottom != num2.num.length - 1) f.push("0");
            
            for (let top = num1.num.length - 1; top >= 0; top--) {
                const r2i = num1.num.length - top - 1;
                
                if (+num2.num[bottom] != 0 && +num1.num[bottom] != 0) {
                    let trifinal: String | number = +num2.num[bottom] * +num1.num[top];
                    if (carry != 0) trifinal += carry, carry = 0;
                    
                    if (+trifinal > 9) {
                        trifinal = ""+trifinal;
                        const carryChar = trifinal[0];
                        semifinal[r2i] = trifinal[1];
        
                        if (top == 0) semifinal.push(carryChar);
        
                        carry = +carryChar;
                    } else semifinal[r2i] = ""+trifinal;
                } else semifinal[r2i] = "0";
            }
            
            if (f.length > 0) semifinal = f.concat(semifinal);
            final[r1i] = new Define(semifinal, false, 0);
        }
        
        if (final.length > 1) {
            let answer = ADD(final[0], final[1]);
            for (let i = 2; i < final.length; i++) answer = ADD(answer, final[i]);
            return answer;
        }
        return final[0];
    } else return String((num1 instanceof Define ? num1.getNumber() : +num1) * (num2 instanceof Define ? num2.getNumber() : +num2));
}

export function multiply(...numbers: (Define | string)[]): string {
    const a = [...numbers];
    let permfinal: Define | string = MULTIPLY(a[0], a[1]);
    
    for (let i = 2; i < a.length; i++) permfinal = MULTIPLY(permfinal, a[i]);

    return permfinal instanceof Define ? formatOutput(permfinal.num, permfinal.decimals, permfinal.isNeg) : permfinal;
}

function DIVIDE(num1: Define | string, num2: Define | string, maxD?: number, i?: number, getDec?: boolean): Define | string {
    return "( ͡ಠ ʖ̯ ͡ಠ)";
}

export function divide(...numbers: string[]): string {
    return "( ͡ಠ ʖ̯ ͡ಠ)";
}

/*export function divide(...numbers: string[]): string {
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
}*/

function EXPONENT(num1: Define | string, num2: Define | string, maxD?: any): Define | string {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
        if (typeof num1 == "string") num1 = new Define(num1);
        if (typeof num2 == "string") num2 = new Define(num2);
        if (!maxD) maxD = maxDecimalLength;

        const parsed = parse(num1, num2, 5);

        num1 = parsed.num1, num2 = parsed.num2;

        if (num1.decimals > 0) {
            // root_of_decimal2*10(num1)**(num2*(10*decimal2))
            throw new TypeError("Decimal exponentnents aren't supported yet");
        } else {
            if (num2.num.length == 1 && num2.num[0] == "1" && !num2.isNeg) return new Define(num1.num, false, parsed.decimals);
            else if ((num2.num.length == 1 && +num2.num[0] == 0) || num1.num.length == 1 && +num1.num[0] == 1 && !num1.isNeg) return new Define(["1"], false, 0);
            else if (num2.isNeg) {
                num2.isNeg = false;
                return DIVIDE(new Define(["1"], false, 0), num2, maxD);
            } else if (num1.isNeg) {
                num2.isNeg = false;
                return DIVIDE("1", EXPONENT(num1, num2), maxD)
            }
            else {
                let final: Define | string = MULTIPLY(num1, num1);
                console.log(final);
                for (let i: Define | string = new Define(["2"], false, 0); isLessThan(i, num2); i = ADD(i, new Define(["1"], false, 0))) final = MULTIPLY(final, num1);
                
                return final;
            }
        }
    } else return String((num1 instanceof Define ? num1.getNumber() : +num1) ** (num2 instanceof Define ? num2.getNumber() : +num2));
}

export function exponent(...numbers: any[]): string {
    const a = [...numbers];
    let permfinal: Define | string = EXPONENT(a[0], a[1]);
    
    for (let i = 2; i < a.length; i++) permfinal = EXPONENT(permfinal, a[i]);

    return permfinal instanceof Define ? formatOutput(permfinal.num, permfinal.decimals, permfinal.isNeg) : permfinal;
}

export function factorial(item: Define | string): string|Define {
    return +item < 0 ? new Define(["1"], true, 0) : +item == 0 ? new Define(["1"], false, 0) : multiply(item, factorial(subtract(item, new Define(["1"], false, 0))));
}

export {
    // exponent as pow,
    roundUp as ceil,
    roundDown as floor
}
