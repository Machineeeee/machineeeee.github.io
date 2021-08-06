var machineeeee = function () {
  //以下部分为 判断类的方法
  function getType(obj) {
    if (typeof obj === "object") {
      return Object.prototype.toString.call(obj).match(/\b[A-Z][a-z]+\b/)[0].toLowerCase();
    }
    return typeof obj;
  }
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

  function isFinite(value) {
    return isNumber(value) && value != Infinity && value != -Infinity;
  }

  function isInteger(value) {
    return isFinite(value) && parseInt(value) == value;
  }

  function isError(value) {
    return typeof value == "object" && value.__proto__ == Error.prototype;
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

  //以下部分为迭代方法,和一些辅助方法
  function toPath(value) {
    let reg = /\w+/g;
    value = value.match(reg);
    return value;
  }

  function get(object, path, defaultValue = undefined) {
    if (isString(path)) {
      path = toPath(path);
    }
    for (let i = path[0]; i < path.length; i++) {
      if (object[i] == undefined)
        return defaultValue;
      object = object[i];
    }
    return object;
  }

  function property(path) {
    return function (obj) {
      return get(obj, path);
    }
  }

  function isMatch(object, source) {
    if (isObject(source)) {
      for (const key in source) {
        if (isObject(object[key])) {
          if (!isEqual(object[key], source[key])) {
            return false;
          };
        }
        else if (object[key] != source[key]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  function matches(source) {
    return function (obj) {
      return isMatch(obj, source);
    }
  }

  function matchesProperty(path, srcValue) {
    return function (obj) {
      return get(obj, path) === srcValue;
    }
  }

  function iteratee(value) {
    if (getType(value) === "function")
      return value;
    if (getType(value) === "string") {
      return property(value);
    }
    if (getType(value) === "array") {
      return matchesProperty(...value);
    }
    if (getType(value) === "object") {
      return matches(value);
    }
  }

  function size(value) {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      let count = 0;
      for (const key in value) {
        count++;
      }
      return count;
    }
    return value.length;
  }

  function isEqual(value, other) {
    if (value === other)
      return true;
    if (isNaN(value) && isNaN(other))
      return true;
    if (isObject(value) && isObject(other)) {
      if (Object.prototype.toString.call(value) === Object.prototype.toString.call(other) && size(value) === size(other)) {
        for (const key in value) {
          if (!isEqual(value[key], other[key]))
            return false;
        }
        return true;
      }
      return false;
    }
    return false;
  }

  function identity(value) {
    return value;
  }

  function indexOf(array, value, fromIndex = 0) {
    if (fromIndex < 0)
      fromIndex = fromIndex + array.length;
    for (let i = fromIndex; i < array.length; i++) {
      if (isEqual(array[i], value))
        return i;
    }
    return -1;
  }

  function includes(collection, value, fromIndex = 0) {
    if (getType(collection) === "string") {
      collection = collection.split("");
    }
    if (getType(collection) === "object" || getType(collection) === "array") {
      for (const key in collection) {
        if (isEqual(collection[key], value))
          return true;
      }
      return false;
    }

    function forEach(collection, func = identity) {
      for (const key in collection) {
        if (func(collection[key], key, collection) === false)
          break;
      }
      return collection;
    }

    function map(collection, callback) {
      callback = iteratee(callback);
      let res = [];
      for (const key in collection) {
        res.push(callback(collection[key], key, collection));
      }
      return res;
    }

    function filter(collection, callback) {
      callback = iteratee(callback);
      let res = [];
      for (const key in collection) {
        if (callback(collection[key], key, collection)) {
          res.push(collection[key]);
        }
      }
      return res;
    }

    function reduce(collection, callback, init) {
      callback = iteratee(callback);
      let count = 0;
      for (const key in collection) {
        if (count == 0 && init == undefined) {
          init = collection[key];
        }
        else {
          init = callback(init, collection[key], key, collection)
          count++;
        }
      }
      return init;
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
    toPath: toPath,
    property: property,
    isMatch: isMatch,
    matches: matches,
    size: size,
    isEqual: isEqual,
    iteratee: iteratee,
    identity: identity,
    matchesProperty: matchesProperty,
    forEach: forEach,
    indexOf: indexOf,
    includes: includes,
    get: get,
    map: map,
    filter: filter,
    reduce: reduce,

  }
}();