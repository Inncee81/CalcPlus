import { add, subtract as sub } from './bin/calcplus.js';

var id = 0;

function test(result, func, ...args) {
    id++;
    const resultT = func(...args);
    if (!result === resultT) throw new InternalError(`Expected "${JSON.parse(result)}" but instead got "${JSON.parse(resultT)}" on ${id}.`);
}

// adding
test("21", add, "15", "6");
test("9", add, "15", "6");
test("21", add, "6", "-15");
test("9", add, "-6", "-15");
test("-9", add, "6", "15");
test("-21", add, "-6", "15");
test(9, add, 15, 6);
test(21, add, 6, -15);
test(9, add, -6, -15);
test(-9, add, 6, 15);
test(-21, add, -6, 15);

// subtracting
test("9", sub, "15", "6");
test("21", sub, "6", "-15");
test("9", sub, "-6", "-15");
test("-9", sub, "6", "15");
test("-21", sub, "-6", "15");
test(9, sub, 15, 6);
test(21, sub, 6, -15);
test(9, sub, -6, -15);
test(-9, sub, 6, 15);
test(-21, sub, -6, 15);

// test("759375", "multiply", "52605", "15");
// test("759375", "exponent", "15", "5");
// test("3", "divide", "15", "5");