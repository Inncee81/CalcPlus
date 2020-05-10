import * as cp from './calcplus.js';
import math from 'mathjs';

function random(min, max) {
    return (Math.random() * (max - min) + min).toFixed(3);
}

function randomInt(min, max) {
    return (Math.floor(Math.random() * (max - min) + min)).toString();
}

for (let i = 0; i < 20000; i++) {
    let num1 = randomInt(0, 200),
        num2 = randomInt(0, 200);

    const resultT = +cp.add(num1, num2),
        result = +(+num1 + +num2).toFixed(3);
1
    if (result !== resultT) throw new Error(`${num1} + ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

for (let i = 0; i < 20000; i++) {
    let num1 = random(0, 200),
        num2 = random(0, 200);

    const resultT = +cp.add(num1, num2),
        result = +(+num1 + +num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} + ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("ADD has been validated");

for (let i = 0; i < 20000; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = +cp.subtract(num1, num2),
        result = +(+num1 - +num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} - ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

for (let i = 0; i < 20000; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = +cp.subtract(num1, num2),
        result = +(+num1 - +num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} - ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("SUBTRACT has been validated");

for (let i = 0; i < 20000; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = cp.isLessThan(num1, num2),
        result = +num1 < +num2;

    if (result !== resultT) throw new Error(`${num1} < ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

for (let i = 0; i < 20000; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = cp.isLessThan(num1, num2),
        result = +num1 < +num2;

    if (result !== resultT) throw new Error(`${num1} < ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("IS LESS THAN has been validated");

for (let i = 0; i < 20000; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = cp.isLessThanEqual(num1, num2),
        result = +num1 <= +num2;

    if (result !== resultT) throw new Error(`${num1} <= ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

for (let i = 0; i < 20000; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = cp.isLessThanEqual(num1, num2),
        result = +num1 <= +num2;

    if (result !== resultT) throw new Error(`${num1} <= ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("IS LESS THAN OR EQUAL TO has been validated");

for (let i = 0; i < 20000; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = cp.isGreaterThan(num1, num2),
        result = +num1 > +num2;

    if (result !== resultT) throw new Error(`${num1} > ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

for (let i = 0; i < 20000; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = cp.isGreaterThan(num1, num2),
        result = +num1 > +num2;

    if (result !== resultT) throw new Error(`${num1} > ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("IS GREATER THAN has been validated");

for (let i = 0; i < 20000; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = cp.isGreaterThanEqual(num1, num2),
        result = +num1 >= +num2;

    if (result !== resultT) throw new Error(`${num1} >= ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

for (let i = 0; i < 20000; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = cp.isGreaterThanEqual(num1, num2),
        result = +num1 >= +num2;

    if (result !== resultT) throw new Error(`${num1} >= ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("IS GREATER THAN EQUAL TO has been validated");

for (let i = 0; i < 20000; i++) {
    let num = random(-200, 200);

    const resultT = +cp.round(num),
        result = math.round(+num);

    if (result !== resultT) throw new Error(`Round ${num} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("ROUND has been validated");

for (let i = 0; i < 20000; i++) {
    let num = random(-200, 200);

    const resultT = +cp.roundUp(num),
        result = math.ceil(+num);

    if (result !== resultT) throw new Error(`Round up ${num} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("ROUND UP has been validated");

for (let i = 0; i < 20000; i++) {
    let num = random(-200, 200);

    const resultT = +cp.roundDown(num),
        result = math.floor(+num);

    if (result !== resultT) throw new Error(`Round down ${num} should be ${result} but instead got ${resultT} on check #${i+1}`);
}

console.log("ROUND DOWN has been validated");

// for (let i = 0; i < 20000; i++) {
//     let num1 = randomInt(-200, 200),
//         num2 = randomInt(-200, 200);

//     const resultT = +(+cp.multiply(String(num1), String(num2))).toFixed(3),
//         result = +(num1 * num2).toFixed(3);

//     if (result !== resultT) throw new Error(`${num1} * ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
// }

// for (let i = 0; i < 20000; i++) {
//     let num1 = random(-200, 200),
//         num2 = random(-200, 200);

//     const resultT = +(+cp.multiply(String(num1), String(num2))).toFixed(3),
//         result = +(num1 * num2).toFixed(3);

//     if (result !== resultT) throw new Error(`${num1} * ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
// }

// console.log("MULTIPLY has been validated");

// console.log(`${15 ** 2} | ${cp.exponent("15", "2")}`);

// console.log("EXPONENT has been validated");

// test("3", "divide", "15", "5");