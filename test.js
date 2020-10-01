import * as cp from './calcplus.js';
import math from 'mathjs';

const numberOfTotalTests = 100000;

function random(min, max) {
    return (Math.random() * (max - min) + min).toFixed(3);
}

function randomInt(min, max) {
    return (Math.floor(Math.random() * (max - min) + min)).toString();
}

process.stdout.write("\n");

for (let i = 0; i <= numberOfTotalTests / 2; i++) {
    let num1 = randomInt(0, 200),
        num2 = randomInt(0, 200);

    const resultT = +cp.add(num1, num2),
        result = +(+num1 + +num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} + ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

for (let i = 0; i <= numberOfTotalTests / 2; i++) {
    let num1 = random(0, 200),
        num2 = random(0, 200);

    const resultT = +cp.add(num1, num2),
        result = +(+num1 + +num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} + ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor((i + (numberOfTotalTests / 2)) / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rADD has been validated\n");

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = +cp.subtract(num1, num2),
        result = +(+num1 - +num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} - ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = +cp.subtract(num1, num2),
        result = +(+num1 - +num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} - ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor((i + (numberOfTotalTests / 2)) / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rSUBTRACT has been validated\n");

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = cp.isLessThan(num1, num2),
        result = +num1 < +num2;

    if (result !== resultT) throw new Error(`${num1} < ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = cp.isLessThan(num1, num2),
        result = +num1 < +num2;

    if (result !== resultT) throw new Error(`${num1} < ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor((i + (numberOfTotalTests / 2)) / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rIS LESS THAN has been validated\n");

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = cp.isLessThanEqual(num1, num2),
        result = +num1 <= +num2;

    if (result !== resultT) throw new Error(`${num1} <= ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = cp.isLessThanEqual(num1, num2),
        result = +num1 <= +num2;

    if (result !== resultT) throw new Error(`${num1} <= ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor((i + (numberOfTotalTests / 2)) / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rIS LESS THAN OR EQUAL TO has been validated\n");

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = cp.isGreaterThan(num1, num2),
        result = +num1 > +num2;

    if (result !== resultT) throw new Error(`${num1} > ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = cp.isGreaterThan(num1, num2),
        result = +num1 > +num2;

    if (result !== resultT) throw new Error(`${num1} > ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor((i + (numberOfTotalTests / 2)) / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rIS GREATER THAN has been validated\n");

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = cp.isGreaterThanEqual(num1, num2),
        result = +num1 >= +num2;

    if (result !== resultT) throw new Error(`${num1} >= ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = cp.isGreaterThanEqual(num1, num2),
        result = +num1 >= +num2;

    if (result !== resultT) throw new Error(`${num1} >= ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor((i + (numberOfTotalTests / 2)) / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rIS GREATER THAN EQUAL TO has been validated\n");

for (let i = 0; i < numberOfTotalTests; i++) {
    let num = random(-200, 200);

    const resultT = +cp.round(num),
        result = math.round(+num);

    if (result !== resultT) throw new Error(`Round ${num} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rROUND has been validated\n");

for (let i = 0; i < numberOfTotalTests; i++) {
    let num = random(-200, 200);

    const resultT = +cp.roundUp(num),
        result = math.ceil(+num);

    if (result !== resultT) throw new Error(`Round up ${num} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rROUND UP has been validated\n");

for (let i = 0; i < numberOfTotalTests; i++) {
    let num = random(-200, 200);

    const resultT = +cp.roundDown(num),
        result = math.floor(+num);

    if (result !== resultT) throw new Error(`Round down ${num} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rROUND DOWN has been validated\n");

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = +(+cp.multiply(num1, num2)).toFixed(3),
        result = +(num1 * num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} * ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = +(+cp.multiply(num1, num2)).toFixed(3),
        result = +(num1 * num2).toFixed(3);

    if (result - resultT > 0.0015) throw new Error(`${num1} * ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor((i + (numberOfTotalTests / 2)) / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rMULTIPLY has been validated\n");

/*for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = +(+cp.divide(num1, num2)).toFixed(3),
        result = +(num1 / num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} * ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

for (let i = 0; i < numberOfTotalTests / 2; i++) {
    let num1 = random(-200, 200),
        num2 = random(-200, 200);

    const resultT = +(+cp.divide(num1, num2)).toFixed(3),
        result = +(num1 / num2).toFixed(3);

    if (result - resultT > 0.0015) throw new Error(`${num1} * ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor((i + (numberOfTotalTests / 2)) / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\nDIVIDE has been validated\n");*/

/*for (let i = 0; i < numberOfTotalTests; i++) {
    let num1 = randomInt(-200, 200),
        num2 = randomInt(-200, 200);

    const resultT = +(+cp.exponent(num1, num2)).toFixed(3),
        result = +(num1 ** num2).toFixed(3);

    if (result !== resultT) throw new Error(`${num1} * ${num2} should be ${result} but instead got ${resultT} on check #${i+1}`);
    if (i % 100 === 0)
        process.stdout.write("\r" + Math.floor(i / (numberOfTotalTests) * 100) + "% Done");
}

process.stdout.write("\rEXPONENT has been validated\n");*/