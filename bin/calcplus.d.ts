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
export declare function calcplus_info(): {
    name: string;
    major: number;
    minor: number;
    bugFix: number;
};
interface numberProperties extends Object {
    numbers: string[];
    isNegative: boolean;
    decimals: number;
}
export declare function define(numberString: string): numberProperties;
export declare enum MathMode {
    ADD = 1,
    SUBTRACT = 2,
    MULTIPLY = 3,
    DIVIDE = 4
}
export declare function parse(num1: numberProperties, num2: numberProperties, mathMode: MathMode): {
    num1: numberProperties;
    num2: numberProperties;
    isNeg: boolean;
    decimals: number;
};
export declare function setPowerMode(mode: boolean): void;
export declare function getPowerMode(): boolean;
export declare function setMaxSafeInteger(maxIntegerLength: number | "default"): void;
export declare function getMaxSafeInteger(): number;
export declare function setMaxDecimalLength(maxDecimals: number | "default"): void;
export declare function getMaxDecimalLength(): number;
export declare function add(...numbers: (string | numberProperties)[]): string | number;
export declare function subtract(...numbers: (string | numberProperties)[]): string | number;
export declare function isLessThan(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function isGreaterThan(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function isLessThanEqual(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function isGreaterThanEqual(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function round(item: string | number | numberProperties): string | number;
export declare function roundDown(item: string | number | numberProperties): string | number;
export declare function roundUp(item: string | numberProperties): string | number;
export declare function multiply(...numbers: (string | numberProperties)[]): string | number;
export declare function divide(...numbers: string[]): string | number;
export declare function exponent(...numbers: (string | number | numberProperties)[]): string | number;
export declare function factorial(number: any): string | number;
export { exponent as pow, roundUp as ceil, roundDown as floor };
