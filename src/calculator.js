#!/usr/bin/env node
// Node.js CLI Calculator
// Supported operations:
// - Addition (add or +)
// - Subtraction (sub or -)
// - Multiplication (mul or * or x)
// - Division (div or /)

// Core operation functions
function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
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

    default:
      throw new Error(`Unknown operation: ${op}`);
  }
}

module.exports = { add, sub, mul, div, calculate };

// CLI wrapper: only runs when executed directly from the command line
if (require.main === module) {
  const [,, op, aStr, bStr] = process.argv;

  function usage() {
    console.error('Usage: node src/calculator.js <add|sub|mul|div|+|-|*|/> <num1> <num2>');
    process.exit(1);
  }

  if (!op || !aStr || !bStr) usage();

  const a = Number(aStr);
  const b = Number(bStr);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers');
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
