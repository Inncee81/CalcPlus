import * as cp from './bin/calcplus.js';

function log(result, name, ...args) {
  console.log(`Expected result: ${result} : Actual result: ${cp[name](...args)}`);
}

log("20", "add", "15", "5");
log("10", "subtract", "15", "5");
log("75", "multiply", "15", "5");
log("3", "divide", "15", "5");
log("759375", "exponent", "15", "5");