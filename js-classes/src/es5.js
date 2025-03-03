export function BaseMethods(value) {
  this.value = value || 0;
  this.chainOfOperations = []
}

BaseMethods.prototype.toString = function () {
  return this.value + '';
}

BaseMethods.prototype.get = function () {
  this.chainOfOperations.forEach((fn) => {
    fn();
  })
  return this.value;
}

BaseMethods.prototype.plus = function() {
  var args = arguments;

  Array.prototype.forEach.call(args, function(arg) {
    this.value = this.value + arg;
  }.bind(this));

  return this;
}

function Inherit(child, parent) {
  function Temporary() {}
  Temporary.prototype = parent.prototype;
  child.prototype = new Temporary();
  child.prototype.constructor = child;
}

export function StringBuilder(value) {
  BaseMethods.call(this, value);
}

Inherit(StringBuilder, BaseMethods);

StringBuilder.prototype.slice = function(num) {
  this.chainOfOperations.push(function() {
    if (typeof num !== 'number' || isNaN(num)) {
      throw new Error('Argument must be a valid number');
    }
    var sliceStr = '';
    for (var i = 0; i < num; i = i + 1) {
      sliceStr = sliceStr + this.value[i];
    }
    this.value = sliceStr;
  }.bind(this))
  return this;
}

StringBuilder.prototype.minus = function(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Argument must be a valid number');
  }
  this.chainOfOperations.push(function() {
    this.slice(this.value.length - num);    
  }.bind(this))
  return this;
}

StringBuilder.prototype.multiply = function(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Argument must be a valid number');
  }
  this.chainOfOperations.push(function() {
    var sliceStr = '';
    for (var i = 0; i < Number(num); i = i + 1) {
      sliceStr = sliceStr + this.value;
    }
    this.value = sliceStr;    
  }.bind(this))
  return this;
}

StringBuilder.prototype.divide = function(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Argument must be a valid number');
  }
  this.chainOfOperations.push(function() {
    const sliceLen = Math.floor(this.value.length / num);
    this.slice(sliceLen);    
  }.bind(this))
  return this;
}

StringBuilder.prototype.remove = function(char) {
  this.chainOfOperations.push(function() {
    var sliceStr = '';
    if (char.length === 1) {
      for (var i = 0; i < this.value.length; i = i + 1) {
        if (this.value[i] != char) {
          sliceStr = sliceStr + this.value[i];
        }
      }
    } else {
      var str = this.value;
      var result = '';
      var charLength = char.length;
      
      for (var i = 0; i < str.length; i++) {
        if (str.slice(i, i + charLength) !== char) {
          result += str[i];
        } else {
          i += charLength - 1;
        }
      }
  
      sliceStr = result;
    }
  
    this.value = sliceStr;    
  }.bind(this))
  return this;
}

StringBuilder.prototype.sub = function(from, n) {
  this.chainOfOperations.push(function() {
    this.value = this.value.split('').splice(from,n).join('');
  }.bind(this))
  return this
}
