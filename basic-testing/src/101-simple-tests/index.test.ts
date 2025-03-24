// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const testCases = [
    { a: 5, b: 3, action: Action.Add, expected: 8 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 5, b: 3, action: Action.Multiply, expected: 15 },
    { a: 6, b: 3, action: Action.Divide, expected: 2 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  ];

  testCases.forEach(({ a, b, action, expected }) => {
    test(`should all actions ${action} (${a} ${action} ${b} = ${expected})`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });

  test.each([
    { a: 5550, b: -3, action: Action.Add, expected: 5547 },
    { a: 45, b: 23, action: Action.Add, expected: 68 },
    { a: 5, b: 3, action: Action.Add, expected: 8 },
    { a: 6, b: 3, action: Action.Add, expected: 9 },
    { a: 102, b: 3, action: Action.Add, expected: 105 },
  ])('should should add two numbers', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });

  test.each([
    { a: 5550, b: -3, action: Action.Subtract, expected: 5553 },
    { a: 45, b: 23, action: Action.Subtract, expected: 22 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 6, b: 3, action: Action.Subtract, expected: 3 },
    { a: 102, b: 3, action: Action.Subtract, expected: 99 },
  ])('should subtract two numbers', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
  
  test.each([
    { a: 0, b: 3, action: Action.Multiply, expected: 0 },
    { a: 45, b: 2, action: Action.Multiply, expected: 90 },
    { a: 5, b: 3, action: Action.Multiply, expected: 15 },
    { a: 6, b: 3, action: Action.Multiply, expected: 18 },
    { a: 102, b: 3, action: Action.Multiply, expected: 306 },
  ])('should multiply two numbers', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
  
  test.each([
    { a: 15, b: 3, action: Action.Divide, expected: 5 },
    { a: 45, b: 2, action: Action.Divide, expected: 22.5 },
    { a: 5, b: 5, action: Action.Divide, expected: 1 },
    { a: 6, b: -3, action: Action.Divide, expected: -2 },
    { a: 102, b: 3, action: Action.Divide, expected: 34 },
  ])('should divide two numbers', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });

  test.each([
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
    { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
    { a: 10, b: -1, action: Action.Exponentiate, expected: 0.1 },
    { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
    { a: 7, b: 2, action: Action.Exponentiate, expected: 49 },
    { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
    { a: -3, b: 2, action: Action.Exponentiate, expected: 9 },
  ])('should exponentiate two numbers', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });

  test.each([
    { a: 5, b: 3, action: 'invalidAction', expected: null },
    { a: 5, b: 3, action: 'u', expected: null },
    { a: 5, b: 3, action: '0', expected: null },
    { a: 5, b: 3, action: undefined, expected: null },
    { a: 5, b: 3, action: null, expected: null },
    { a: 5, b: 3, action: '', expected: null },
  ])('should return null for invalid action', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });

  test.each([
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 2, b: 3, action: Action.Multiply, expected: 6 },
    { a: '5', b: 3, action: Action.Add, expected: null },
    { a: 5, b: '3', action: Action.Add, expected: null },
    { a: null, b: 3, action: Action.Add, expected: null },
    { a: 5, b: undefined, action: Action.Add, expected: null },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 6, b: 3, action: Action.Divide, expected: 2 },
    { a: {}, b: 3, action: Action.Add, expected: null },
    { a: 5, b: [], action: Action.Add, expected: null }
  ])('should return null for invalid arguments', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
