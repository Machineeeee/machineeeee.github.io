var machineeeee = function () {
  function isArguments(value) {
    return typeof value.callee === "function"
  }
  function isArray(value) {
    return value.__proto__ === Array.prototype;
  }

  function isArrayBuffer(value) {
    return value.__proto__ === ArrayBuffer.prototype;
  }

  function isArrayLikeObject(value) {
    return typeof value === "object" && value.length != undefined;
  }

  function isBoolean(value) {
    return Object.prototype.toString.call(value) === "[object Boolean]"
  }

  function isBuffer(value) {
    return value.__proto__ === Buffer.prototype;
  }

  function isDate(value) {
    return value.__proto__ === Date.prototype;
  }

  function isEmpty(value) {
    if (typeof value === "object") {
      let res = [];
      for (const key in value) {
        res.push(key);
      }
      return res.length <= 0;
    }
    else if (typeof value === "string")
      return value.length <= 0;
    else
      return true;
  }

  function isInteger(value) {
    return isFinite(value) && parseInt(value) == value;
  }

  function isError(value) {
    return typeof value == "object" && value.__proto__ == Error.prototype;
  }

  function isFinite(value) {
    return isNumber(value) && value != Infinity && value != -Infinity;
  }

  function isFunction(value) {
    return typeof value === "function";
  }

  function isLength(value) {
    return isInteger(value) && value >= 0;
  }

  function isMap(value) {
    return value.__proto__ === Map.prototype;
  }

  function isNaN(value) {
    if (typeof value === "object") {
      value = value.valueOf();
    }
    return value !== value;
  }

  function isNil(value) {
    return value == undefined;
  }

  function isNull(value) {
    return value === null;
  }

  function isNumber(value) {
    return value.__proto__ === Number.prototype;
  }

  function isObject(value) {
    return value != null && (typeof value === "object" || typeof value === "function");
  }

  function isObjectLike(value) {
    return value != null && typeof value === "object";
  }

  function isPlainObject(value) {
    return typeof value === "object" && (value.__proto__ === Object.prototype || value.__proto__ === null)
  }

  function isSafeInteger(value) {
    return isInteger(value) && value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER;
  }

  function isSet(value) {
    return value.__proto__ === Set.prototype;
  }

  function isString(value) {
    return typeof value === "string" || (typeof value === "object" && value.__proto__ === String.prototype);
  }
  function isSymbol(value) {
    return Object.prototype.toString.call(value) === "[object Symbol]";
  }

  function isTypedArray(value) {
    return Object.prototype.toString.call(value) === "[object Uint8Array]";
  }

  function isUndefined(value) {
    return Object.prototype.toString.call(value) === "[object Undefined]";
  }

  function isWeakMap(value) {
    return Object.prototype.toString.call(value) === "[object WeakMap]";
  }

  function isWeakSet(value) {
    return Object.prototype.toString.call(value) === "[object WeakSet]";
  }
  return {
    isArguments: isArguments,
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isArrayLikeObject: isArrayLikeObject,
    isBoolean: isBoolean,
    isBuffer: isBuffer,
    isDate: isDate,
    isEmpty: isEmpty,
    isError: isError,
    isFinite: isFinite,
    isFunction: isFunction,
    isInteger: isInteger,
    isLength: isLength,
    isMap: isMap,
    isNaN: isNaN,
    isNil: isNil,
    isNull: isNull,
    isNumber: isNumber,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isPlainObject: isPlainObject,
    isSafeInteger: isSafeInteger,
    isSet: isSet,
    isString: isString,
    isSymbol: isSymbol,
    isTypedArray: isTypedArray,
    isUndefined: isUndefined,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
  }
}();