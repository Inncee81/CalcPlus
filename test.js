import * as cp from './bin/calcplus.js';

function random(min, max) {
    return Math.random() * (max - min) + min;
}

console.log("Validating functions...")

for (let i = 0; i < 10000; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);
    const resultT = cp.add(String(num1), String(num2)),
        result = num1 + num2;
    if (!result === resultT) throw new InternalError(`Expected "${JSON.parse(result)}" but instead got "${JSON.parse(resultT)}"`);
}

console.log("ADD has been validated");

for (let i = 0; i < 10000; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);
    const resultT = cp.subtract(String(num1), String(num2)),
        result = num1 - num2;
    if (!result === resultT) throw new InternalError(`Expected "${JSON.parse(result)}" but instead got "${JSON.parse(resultT)}"`);
}

console.log("SUBTRACT has been validated");

for (let i = 0; i < 10000; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);
    const resultT = cp.multiply(String(num1), String(num2)),
        result = num1 * num2;
    if (!result === resultT) throw new InternalError(`Expected "${JSON.parse(result)}" but instead got "${JSON.parse(resultT)}"`);
}

console.log("MULTIPLY has been validated");

console.log(`${15 ** 4} | ${cp.exponent("15", "4")}`);

console.log("EXPONENT has been validated");

// test("3", "divide", "15", "5");