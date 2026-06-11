#!/usr/bin/env node
// Node.js CLI Calculator
// Supported operations:
// - Addition (add or +)
// - Subtraction (sub or -)
// - Multiplication (mul or * or x)
// - Division (div or /)
// - Modulo (mod or %)
// - Power (pow or ** or ^)
// - Square root (sqrt)

// Core operation functions
function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}
function modulo(a, b) {
  if (b === 0) throw new Error('Modulo by zero');
  return a % b;
}
function power(base, exponent) {
  return Math.pow(base, exponent);
}
function squareRoot(n) {
  if (n < 0) throw new Error('Square root of negative number');
  return Math.sqrt(n);
}

// calculate: selects the operation based on the op token
function calculate(op, a, b) {
  switch (op) {
    case 'add':
    case '+':
      return add(a, b);

    case 'sub':
    case '-':
      return sub(a, b);

    case 'mul':
    case '*':
    case 'x':
    case 'X':
      return mul(a, b);

    case 'div':
    case '/':
      return div(a, b);

    case 'mod':
    case '%':
    case 'modulo':
      return modulo(a, b);

    case 'pow':
    case '**':
    case '^':
    case 'power':
      return power(a, b);

    case 'sqrt':
    case '√':
      // sqrt uses only the first argument
      return squareRoot(a);

    default:
      throw new Error(`Unknown operation: ${op}`);
  }
}

module.exports = { add, sub, mul, div, modulo, power, squareRoot, calculate };

// CLI wrapper: only runs when executed directly from the command line
if (require.main === module) {
  const [,, op, aStr, bStr] = process.argv;

  function usage() {
    console.error(`Usage: node src/calculator.js <op> <num1> [num2]\nSupported ops: add, sub, mul, div, mod, pow, sqrt (symbols allowed: + - * / % ** ^ √)`);
    process.exit(1);
  }

  if (!op || !aStr) usage();

  const a = Number(aStr);
  const b = (typeof bStr !== 'undefined') ? Number(bStr) : undefined;

  if (Number.isNaN(a) || (typeof b !== 'undefined' && Number.isNaN(b))) {
    console.error('Error: operand(s) must be valid numbers');
    process.exit(2);
  }

  try {
    const result = calculate(op, a, b);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(3);
  }
}
