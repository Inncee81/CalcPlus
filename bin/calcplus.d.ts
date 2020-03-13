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
    getNumber(): number;
}
export declare enum MathMode {
    ADD = 1,
    SUBTRACT = 2,
    MULTIPLY = 3,
    DIVIDE = 4,
    EXPONENT = 5
}
export declare function parse(num1: Define, num2: Define, mathMode: MathMode): {
    num1: Define;
    num2: Define;
    isNeg: boolean;
    decimals: number;
};
export declare function togglePowerMode(): void;
export declare function setPowerMode(mode: boolean): void;
export declare function getPowerMode(): boolean;
export declare function setMaxSafeInteger(maxSafeInteger: number | "default"): void;
export declare function getMaxSafeInteger(): number;
export declare function setMaxDecimalLength(maxDecimalLength: number | "default"): void;
export declare function getMaxDecimalLength(): number;
export declare function add(...numbers: (Define | string)[]): string;
export declare function subtract(...numbers: (Define | string)[]): string;
export declare function isLessThan(num1: Define | string, num2: Define | string): boolean;
export declare function isGreaterThan(num1: Define | string, num2: Define | string): boolean;
export declare function isLessThanEqual(num1: Define | string, num2: Define | string): boolean;
export declare function isGreaterThanEqual(num1: Define | string, num2: Define | string): boolean;
export declare function round(item: Define | string): string;
export declare function roundDown(item: Define | string): string;
export declare function roundUp(item: Define | string): string;
export { roundUp as ceil, roundDown as floor };
