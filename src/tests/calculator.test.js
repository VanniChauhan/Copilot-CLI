const { add, sub, mul, div, calculate } = require('../calculator');

describe('Calculator core functions', () => {
  test('add: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
    expect(calculate('+', 2, 3)).toBe(5);
    expect(calculate('add', 2, 3)).toBe(5);
  });

  test('sub: 10 - 4 = 6', () => {
    expect(sub(10, 4)).toBe(6);
    expect(calculate('-', 10, 4)).toBe(6);
    expect(calculate('sub', 10, 4)).toBe(6);
  });

  test('mul: 45 * 2 = 90', () => {
    expect(mul(45, 2)).toBe(90);
    expect(calculate('*', 45, 2)).toBe(90);
    expect(calculate('mul', 45, 2)).toBe(90);
  });

  test('div: 20 / 5 = 4', () => {
    expect(div(20, 5)).toBe(4);
    expect(calculate('/', 20, 5)).toBe(4);
    expect(calculate('div', 20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => div(10, 0)).toThrow('Division by zero');
    expect(() => calculate('/', 10, 0)).toThrow('Division by zero');
  });

  test('works with negative and floating point numbers', () => {
    expect(calculate('+', -1, 1)).toBe(0);
    expect(calculate('*', 2.5, 4)).toBeCloseTo(10);
    expect(calculate('/', 5, 2)).toBeCloseTo(2.5);
  });
});
