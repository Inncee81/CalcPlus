/*!
Copyright 2019-2020 Eric Michael Veilleux

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
 * This is the NodeJS/ModuleJS release of {@link https://github.com/VirxEC/CalcPlus CalcPlus} as seen on {@link https://www.virxcase.ga VirxEC Showcase}
 *
 * For more information about CalcPlus, go to {@link https://calcplus.virxcase.ga/ About CalcPlus on VirxEC Showcase}
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
/**
 * This function takes a number string and returns the number's properties
 * @param numberString A number but contained in a string
 */
export declare function define(numberString: string): numberProperties;
/**
 * This is used when passing a MathMode into the parse function
 */
export declare enum MathMode {
    ADD = 1,
    SUBTRACT = 2,
    MULTIPLY = 3,
    DIVIDE = 4
}
/**
 *
 * @param num1 An object containing a number's properties
 * @param num2 An object containing a number's properties
 * @param mathMode The math function that the number are to be parsed for
 */
export declare function parse(num1: numberProperties, num2: numberProperties, mathMode: MathMode): {
    num1: numberProperties;
    num2: numberProperties;
    isNeg: boolean;
    decimals: number;
};
/**
 * PowerMode is set to the specified value
 * Returns the current PowerMode
 * @param mode Value (optional) to set the state of PowerMode to
 */
export declare function PowerMode(mode?: boolean): boolean;
/**
 * MaxIntegerLength is set to the specified value
 * Returns the current MaxIntegerLength
 * @param length Value (optional) to set the state of MaxIntegerLength to
 */
export declare function MaxIntegerLength(length?: number | "default"): number;
/**
 * MaxDecimalLength is set to the specified value
 * Returns the current MaxDecimalLength
 * @param length Value (optional) to set the state of MaxDecimalLength to
 */
export declare function MaxDecimalLength(length?: number | "default"): number;
export declare function add(...numbers: (string | number | numberProperties)[]): string | number;
export declare function subtract(...numbers: (string | number | numberProperties)[]): string | number;
export declare function isLessThan(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function isGreaterThan(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function isLessThanEqual(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function isGreaterThanEqual(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function round(item: string | number | numberProperties): string | number;
export declare function roundDown(item: string | number | numberProperties): string | number;
export declare function roundUp(item: string | number | numberProperties): string | number;
export { roundUp as ceil, roundDown as floor };
