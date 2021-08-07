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

  function isPath(value) {
    return includes(value, ".") || includes(value, "[") || includes(value, "]");
  }

  function get(object, path, defaultValue = undefined) {
    if (isArray(path) || isPath(path)) {
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
    else {
      return object[path];
    }
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
    let start = fromIndex >= 0 ? fromIndex : collection.length + fromIndex;
    if (getType(collection) === "string") {
      return collection.includes(value, start);
    }
    if (getType(collection) === "object") {
      for (const key in collection) {
        if (isEqual(collection[key], value))
          return true;
      }
      return false;
    }

    if (getType(collection) === "array") {
      for (let i = start; i < collection.length; i++) {
        if (isEqual(collection[i], value))
          return true;
      }
      return false;
    }
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
  function every(collection, callback) {
    callback = iteratee(callback);
    for (const key in collection) {
      if (!callback(collection[key], key, collection)) {
        return false;
      }
    }
    return true;
  }

  function some(collection, callback) {
    callback = iteratee(callback);
    for (const key in collection) {
      if (callback(collection[key], key, collection)) {
        return true;
      }
    }
    return false;
  }

  // 以下顺序开始刷lodash
  function chunk(array, size = 1) {
    if (size >= array.length)
      return array;
    let res = [];
    for (let i = 0; i < array.length; i += size) {
      res.push(array.slice(i, i + size));
    }
    return res;
  }

  function compact(array) {
    return filter(array, Boolean);
  }

  function concat(array, ...args) {
    let res = array.slice(0);
    forEach(args, function (value) {
      if (getType(value) == "array") {
        forEach(value, function (cell) {
          res.push(cell);
        })
      }
      else {
        res.push(value);
      }
    })
    return res;
  }

  function difference(array, ...args) {
    let group = concat([], ...args);
    return filter(array, function (value) {
      return includes(group, value) == false;
    })
  }

  function differenceBy(array, ...args) {
    let callback = iteratee(args.pop());
    let group = concat([], ...args);
    group = map(group, callback);
    return filter(array, function (value) {
      return includes(group, callback(value)) == false;
    })
  }

  function differenceWith(array, ...args) {
    let comparator = args.pop();
    let group = concat([], ...args);
    return filter(array, function (value) {
      for (let i = 0; i < group.length; i++) {
        if (comparator(value, group[i])) {
          return false;
        }
      }
      return true;
    })
  }

  function drop(array, n = 1) {
    if (n <= 0)
      return array;
    else {
      return array.slice(n);
    }
  }

  function dropRight(array, n = 1) {
    if (n <= 0)
      return array;
    else if (n > array.length)
      return [];
    else {
      return array.slice(0, array.length - n);
    }
  }

  function dropRightWhile(array, predicate) {
    predicate = iteratee(predicate);
    for (var i = array.length - 1; i >= 0; i--) {
      if (!predicate(array[i])) {
        break;
      }
    }
    return array.slice(0, i + 1);
  }

  function dropWhile(array, predicate) {
    predicate = iteratee(predicate);
    for (var i = 0; i < array.length; i++) {
      if (!predicate(array[i])) {
        break;
      }
    }
    return array.slice(i);
  }

  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value;
    }
    return array;
  }

  function findIndex(array, predicate, fromIndex = 0) {
    predicate = iteratee(predicate);
    let start = fromIndex >= 0 ? fromIndex : array.length + fromIndex;
    for (let i = start; i < array.length; i++) {
      if (predicate(array[i])) {
        return i;
      }
    }
    return -1;
  }

  function findLastIndex(array, predicate, fromIndex = array.length - 1) {
    predicate = iteratee(predicate);
    let start = fromIndex;
    for (let i = start; i >= 0; i--) {
      if (predicate(array[i])) {
        return i;
      }
    }
    return -1;
  }

  function head(array) {
    return array[0];
  }

  function flatten(array) {
    return reduce(array, function (res, value) {
      return concat(res, value);
    }, [])
  }

  function flattenDeep(array) {
    for (let i = 0; i < array.length; i++) {
      if (isArray(array[i])) {
        return flattenDeep(flatten(array));
      }
    }
    return array;
  }

  function flattenDepth(array, depth = 1) {
    for (let i = 0; i < depth; i++) {
      array = flatten(array);
    }
    return array;
  }

  function fromPairs(pairs) {
    let res = {};
    if (pairs.length == 2 && !isArray(pairs[0])) {
      res[pairs[0]] = pairs[1];
      return res;
    }
    forEach(pairs, function (value) {
      res[value[0]] = value[1];
    })
    return res;
  }

  function initial(array) {
    return array.slice(0, array.length - 1);
  }

  function intersection(...array) {
    let firstArray = array[0];
    array = array.slice(1);
    return filter(firstArray, function (value) {
      return every(array, function (cell) {
        return includes(cell, value)
      })
    })
  }

  function intersectionBy(...arys) {
    let predicate = iteratee(arys.pop());
    let firstArray = arys[0];
    arys = arys.slice(1);
    return filter(firstArray, function (value) {
      return every(arys, function (cell) {
        cell = map(cell, predicate);
        return includes(cell, predicate(value));
      })
    })
  }

  function intersectionWith(...arys) {
    let comparator = arys.pop();
    let firstArray = arys[0];
    arys = arys.slice(1);
    return filter(firstArray, function (value) {
      return every(arys, function (arr) {
        return some(arr, function (cell) {
          return comparator(value, cell);
        })
      })
    })
  }

  function join(array, separator = ',') {
    let str = "";
    for (let i = 0; i < array.length; i++) {
      str += array[i];
      if (i != array.length - 1) {
        str += separator;
      }
    }
    return str;
  }

  function last(array) {
    return array[array.length - 1];
  }

  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    if (fromIndex < 0)
      fromIndex = fromIndex + array.length;
    for (let i = fromIndex; i >= 0; i--) {
      if (isEqual(array[i], value))
        return i;
    }
    return -1;
  }

  function nth(array, n = 0) {
    if (n < 0) {
      n = n + array.length;
    }
    return array[n];
  }

  function pull(array, ...values) {
    forEach(values, function (val) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] == val) {
          array.splice(i, 1);
          i--;
        }
      }
    })
    return array;
  }

  function pullAll(array, values) {
    return pull(array, ...values);
  }

  function pullAllBy(array, values, callback) {
    callback = iteratee(callback);
    values = map(values, callback);
    forEach(values, function (val) {
      for (let i = 0; i < array.length; i++) {
        if (callback(array[i]) == val) {
          array.splice(i, 1);
          i--;
        }
      }
    })
    return array;
  }

  function pullAllWith(array, values, comparator) {
    forEach(values, function (val) {
      for (let i = 0; i < array.length; i++) {
        if (comparator(array[i], val)) {
          array.splice(i, 1);
          i--;
        }
      }
    })
    return array;
  }

  function pullAt(array, ...indexes) {
    let res = [];
    forEach(array, function (value, idx, array) {
      if (includes(indexes, +idx)) {
        res.push(value);
        array[idx] = undefined;
      }
    })
    pull(array, undefined);
    return res;
  }

  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy: differenceBy,
    differenceWith: differenceWith,
    drop: drop,
    dropRight: dropRight,
    dropRightWhile: dropRightWhile,
    dropWhile: dropWhile,
    fill: fill,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    head: head,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    fromPairs: fromPairs,
    initial: initial,
    intersection: intersection,
    intersectionBy: intersectionBy,
    intersectionWith: intersectionWith,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    pullAllBy: pullAllBy,
    pullAllWith: pullAllWith,
    pullAt: pullAt,

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
    isPath: isPath,
    map: map,
    filter: filter,
    reduce: reduce,
    every: every,

  }
}();