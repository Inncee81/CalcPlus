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
export declare function add(...numbers: (string | number | numberProperties)[]): string | number;
export declare function subtract(...numbers: (string | number | numberProperties)[]): string | number;
export declare function isLessThan(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function isGreaterThan(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function isLessThanEqual(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function isGreaterThanEqual(num1: string | number | numberProperties, num2: string | number | numberProperties): boolean;
export declare function round(item: string | number | numberProperties): string | number;
export declare function roundDown(item: string | number | numberProperties): string | number;
export declare function roundUp(item: string | number | numberProperties): string | number;
export declare function multiply(...numbers: (string | number | numberProperties)[]): string | number;
export declare function divide(...numbers: (string | number | numberProperties)[]): string | number;
export declare function exponent(...numbers: (string | number | numberProperties)[]): string | number;
export declare function factorial(number: string | number | numberProperties): string | number;
export { exponent as pow, roundUp as ceil, roundDown as floor };
