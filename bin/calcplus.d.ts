/**
 * Copyright 2019-2020 Eric (VirxEC/Virx) Michael Veilleux
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License
 *
 * This is the NodeJS/ModuleJS release of https://github.com/VirxEC/CalcPlus and https://www.virxcase.ga
 */
export declare function calcplus_info(): {
    name: string;
    major: number;
    minor: number;
    bugFix: number;
};
export declare class Define extends Object {
    num: string[];
    isNeg: boolean;
    decimals: number;
    constructor(numberString: string[], isNegative: boolean, decimals: number);
    constructor(numberString: string);
    set(name: string, item: string | boolean): this;
    getNumber(): number;
}
export declare function togglePowerMode(): void;
export declare function setMaxSafeInteger(maxSafeInteger: number | "default"): void;
export declare function setMaxDecimalLength(maxDecimalLength: number | "default"): void;
export declare function add(...numbers: (string | Define)[]): string;
export declare function subtract(...numbers: (string | Define)[]): string;
export declare function isLessThan(num1: string | Define, num2: string | Define): boolean;
export declare function isGreaterThan(num1: string | Define, num2: string | Define): boolean;
export declare function isLessThanEqual(num1: string | Define, num2: string | Define): boolean;
export declare function isGreaterThanEqual(num1: string | Define, num2: string | Define): boolean;
export declare function round(item: string | Define): string;
export declare function roundDown(item: string | Define): string;
export declare function roundUp(item: string | Define): string;
export declare function multiply(...numbers: (string | Define)[]): string;
export declare function divide(...numbers: string[]): string;
export declare function exponent(...numbers: any[]): string;
export declare function factorial(item: string | Define): string | Define;
export { exponent as pow, roundUp as ceil, roundDown as floor };
