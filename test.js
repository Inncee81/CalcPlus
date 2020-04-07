import * as cp from './bin/calcplus.js';

function random(min, max) {
    return (Math.random() * ((max) - (min)) + (min)).toFixed(3);
}

for (let i = 0; i < 10000; i++) {
    let num1 = random(0, 200),
        num2 = random(0, 200);

    const resultT = +cp.add(num1, num2),
        result = +(+num1 + +num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} + ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("ADD has been validated");

for (let i = 0; i < 10000; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = +cp.subtract(num1, num2),
        result = +(+num1 - +num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} - ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("SUBTRACT has been validated");

for (let i = 0; i < 10000; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = +(+cp.multiply(String(num1), String(num2))).toFixed(3),
        result = +(num1 * num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} * ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("MULTIPLY has been validated");

// console.log(`${15 ** 2} | ${cp.exponent("15", "2")}`);

// console.log("EXPONENT has been validated");

// test("3", "divide", "15", "5");