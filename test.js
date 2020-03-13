import * as cp from './bin/calcplus.js';

function log(result, name, ...args) {
    const resultT = cp[name](...args);
    if (result == resultT) console.log(`${name}: VALID`);
    else console.log(`Expected "${result}" but instead got "${resultT}".`);
}

log("20", "add", "15", "5");
log("10", "subtract", "15", "5");
log("75", "multiply", "15", "5");
// log("3", "divide", "15", "5");
// log("759375", "exponent", "15", "5");