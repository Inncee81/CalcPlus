import * as cp from './bin/calcplus.js';

function test(result, name, ...args) {
    const resultT = cp[name](...args);
    if (result == resultT) console.log(`${name}: VALID`);
    else console.log(`Expected "${result}" but instead got "${resultT}".`);
}

// test("21", "add", "15", "6");
test("9", "subtract", "15", "6");
test("21", "subtract", "6", "-15");
test("9", "subtract", "-6", "-15");
test("-9", "subtract", "6", "15");
test("-21", "subtract", "-6", "15");
// test("759375", "multiply", "52605", "15");
// test("759375", "exponent", "15", "5");
// test("3", "divide", "15", "5");