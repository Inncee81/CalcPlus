import * as cp from './bin/calcplus.js';

function test(result, name, ...args) {
    const resultT = cp[name](...args);
    if (result == resultT) console.log(`${name}: VALID`);
    else console.log(`Expected "${result}" but instead got "${resultT}".`);
}

test("21", "add", "15", "6");
test("9", "subtract", "15", "6");
test("500", "multiply", "50", "10");
// test("3", "divide", "15", "5");
// tetst("759375", "exponent", "15", "5");