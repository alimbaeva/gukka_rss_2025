import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(result).toBe(3);

    expect(simpleCalculator({ a: 100, b: 22, action: Action.Add })).toBe(122);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(result).toBe(2);

    expect(simpleCalculator({ a: 100, b: 22, action: Action.Subtract })).toBe(
      78,
    );
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 2, action: Action.Multiply });
    expect(result).toBe(6);

    expect(simpleCalculator({ a: 100, b: 22, action: Action.Multiply })).toBe(
      2200,
    );
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 3, action: Action.Divide });
    expect(result).toBe(2);

    expect(simpleCalculator({ a: 100, b: 20, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);

    expect(simpleCalculator({ a: 4, b: 2, action: Action.Exponentiate })).toBe(
      16,
    );
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: 'invalidAction' });
    expect(result).toBeNull();

    expect(simpleCalculator({ a: 4, b: 2, action: null })).toBe(null);
    expect(simpleCalculator({ a: 4, b: 2, action: undefined })).toBe(null);
    expect(simpleCalculator({ a: 4, b: 2, action: '0' })).toBe(null);
    expect(simpleCalculator({ a: 4, b: 2, action: '' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '5', b: 3, action: Action.Add });
    expect(result).toBeNull();

    expect(simpleCalculator({ a: 4, b: '', action: '' })).toBe(null);
    expect(simpleCalculator({ a: 4, b: '+', action: '' })).toBe(null);
    expect(simpleCalculator({ a: 4, b: 'as', action: '' })).toBe(null);
    expect(simpleCalculator({ a: 4, b: null, action: '' })).toBe(null);
    expect(simpleCalculator({ a: 4, b: undefined, action: '' })).toBe(null);
    expect(simpleCalculator({ a: 4, b: {}, action: '' })).toBe(null);
  });
});
