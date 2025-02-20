const complexObject = {
  number: 42,
  string: "Hello, world!",
  boolean: true,
  nullValue: null,
  undefinedValue: undefined,
  symbol: Symbol("unique"),
  bigInt: BigInt(123456789012345678901234567890),
  array: [1, "text", { key: "value" }, [2, 3]],
  set: new Set([1, 2, 3, { nested: "object" }]),
  map: new Map([
    ["key1", "value1"],
    [{ objKey: true }, "value2"],
  ]),
  nestedObject: {
    level1: {
      level2: {
        level3: "deep",
      },
    },
  },
  func: function (x) {
    return x * 2;
  },
  arrowFunc: (x) => x + 1,
  method() {
    return "I am a method";
  },
  classInstance: new (class Example {
    constructor(name) {
      this.name = name;
    }
    greet() {
      return `Hello, ${this.name}`;
    }
  })("Asel"),
};

Object.defineProperty(complexObject, "nonEnumerable", {
  value: "Hidden",
  enumerable: false,
});

  