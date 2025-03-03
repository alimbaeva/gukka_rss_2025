import { BaseMethods } from './es5'

export class IntBuilder extends BaseMethods {
  value: number

  constructor(value: number) {
    super(value)
    this.value = value;
  }
  
  static callError(message: string): never {
    throw new Error(message);
  }

  static random(min: number, max: number): number | void {
    if (min > max) IntBuilder.callError("The min must be less than or equal to the max");
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  plus(...args: number[]): this {
    this.chainOfOperations.push(() => {
      super.plus(...args);
    });
    return this;
  }

  minus(...args: number[]): this {
    this.chainOfOperations.push(() => {
      this.value = args.reduce((acc, el) => acc - el, this.value);
    });
    return this;
  }

  multiply(num: number): this {
    this.chainOfOperations.push(() => {
      this.value = this.value * num;
    });
    return this;
  }

  divide(num: number): this {
    this.chainOfOperations.push(() => {
      this.value = Math.floor(this.value / num);
    });
    return this;
  }

  mod(num: number): this {
    this.chainOfOperations.push(() => {
      this.value = this.value % num;
    });
    return this;
  }
}
