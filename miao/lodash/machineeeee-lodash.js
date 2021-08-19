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
      for (let i = 0; i < path.length; i++) {
        if (object[path[i]] == undefined)
          return defaultValue;
        object = object[path[i]];
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

  function forEachRight(collection, func = identity) {
    for (let i = collection.length - 1; i >= 0; i--) {
      if (func(collection[i], i, collection) === false)
        break;
    }
    return collection;
  }
    function map(collection, callback) {
      callback = iteratee(callback);
      let res = [];
      for (const key in collection) {
        res.push(callback(collection[key], +key, collection));
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

  function reduceRight(collection, callback, init) {
    callback = iteratee(callback);
    for (let i = collection.length - 1; i >= 0; i--) {
      if (i == collection.length - 1 && init == undefined) {
        init = collection[i];
      }
      else {
        init = callback(init, collection[i], i, collection)
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
    if (isArray(args[args.length - 1]))
      return difference(array, ...args);
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

  function remove(array, predicate) {
    predicate = iteratee(predicate);
    let res = [];
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        res.push(array[i]);
        array.splice(i--, 1);
      }
    }
    return res;
  }

  function reverse(array) {
    let i = 0;
    let j = array.length - 1;
    while (i < j) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
      j--;
    }
    return array;
  }

  function sortedIndex(array, value) {
    let index = array.length;
    forEach(array, function (val, idx) {
      if (value <= val) {
        index = idx;
        return false;
      }
    })
    return +index;
  }

  function sortedIndexBy(array, value, callback) {
    callback = iteratee(callback);
    return sortedIndex(map(array, callback), callback(value));
  }

  function sortedIndexOf(array, value) {
    let index = -1;
    forEach(array, function (val, idx) {
      if (val === value) {
        index = idx;
        return false;
      }
    })
    return +index;
  }

  function sortedLastIndex(array, value) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] <= value) {
        return i + 1;
      }
    }
    return 0;
  }

  function sortedLastIndexBy(array, value, callback) {
    callback = iteratee(callback);
    return sortedLastIndex(map(array, callback), callback(value));
  }

  function sortedLastIndexOf(array, value) {
    let low = 0;
    let high = array.length - 1;
    while (low <= high) {
      let mid = (low + high) >> 1;
      if (array[mid] <= value) {
        low = mid + 1;
      }
      else {
        high = mid - 1
      }
    }
    return array[high] === value ? high : -1;
  }

  function sortedUniq(array) {
    return Array.from(new Set(array));
  }

  function sortedUniqBy(array, callback) {
    callback = iteratee(callback);
    let temp = sortedUniq(map(array, callback));
    let i = 0;
    return filter(array, function (val) {
      if (callback(val) === temp[i]) {
        i++;
        return true;
      }
      return false;
    })
  }

  function tail(array) {
    return array.slice(1);
  }

  function take(array, n = 1) {
    return array.slice(0, n);
  }

  function takeRight(array, n = 1) {
    return n > array.length ? array : array.slice(array.length - n);
  }

  function takeRightWhile(array, predicate) {
    predicate = iteratee(predicate);
    for (var i = array.length - 1; i >= 0; i--) {
      if (!predicate(array[i])) {
        break;
      }
    }
    return takeRight(array, array.length - 1 - i);
  }

  function takeWhile(array, predicate) {
    predicate = iteratee(predicate);
    for (var i = 0; i < array.length; i++) {
      if (!predicate(array[i])) {
        break;
      }
    }
    return take(array, i);
  }

  function union(...args) {
    return Array.from(new Set(concat(...args)));
  }

  function unionBy(...args) {
    let callback = iteratee(args.pop());
    args = concat(...args);
    let temp = union(map(args, callback));
    let i = 0;
    return filter(args, function (val) {
      if (callback(val) == temp[i++]) {
        return true;
      }
      return false;
    })
  }

  function unionWith(...args) {
    let comparator = args.pop();
    let res = [];
    forEach(concat(...args), function (val) {
      let flag = 1;
      forEach(res, function (cell) {
        if (comparator(val, cell)) {
          flag = 0;
          return false;
        }
      })
      if (flag) {
        res.push(val);
      }
    })
    return res;
  }

  function uniq(array) {
    return Array.from(new Set(array));
  }

  function uniqBy(array, callback) {
    callback = iteratee(callback)
    let temp = uniq(map(array, callback));
    let i = 0;
    return filter(array, function (val) {
      if (callback(val) == temp[i++])
        return true;
      return false;
    })
  }

  function uniqWith(array, comparator) {
    let res = [];
    forEach(array, function (val) {
      let flag = 1;
      forEach(res, function (cell) {
        if (comparator(val, cell)) {
          flag = 0;
          return false;
        }
      })
      if (flag) {
        res.push(val);
      }
    })
    return res;
  }

  function unzip(array) {
    return map(array[0], function (val, idx) {
      return map(array, function (cell) {
        return cell[idx];
      })
    })
  }

  function unzipWith(array, callback) {
    return map(unzip(array), cell => {
      return reduce(cell, callback);
    })
  }

  function add(augend, addend) {
    return augend + addend;
  }

  function without(array, ...args) {
    return filter(array, function (val) {
      return !includes(args, val);
    })
  }

  function xor(...args) {
    let arr = concat(...args);
    let m = new Map();
    forEach(arr, val => {
      if (m.has(val)) {
        m.set(val, m.get(val) + 1);
      }
      else {
        m.set(val, 1);
      }
    })
    return filter(arr, val => {
      return m.get(val) == 1 ? true : false;
    })
  }

  function xorBy(...args) {
    let callback = iteratee(args.pop());
    let arr = concat(...args);
    let m = new Map();
    forEach(arr, val => {
      val = callback(val);
      if (m.has(val)) {
        m.set(val, m.get(val) + 1);
      }
      else {
        m.set(val, 1);
      }
    })
    return filter(arr, val => {
      return m.get(callback(val)) == 1 ? true : false;
    })
  }

  function xorWith(...args) {
    let comparator = args.pop();
    let arr = concat(...args);
    let err = [];
    return filter(arr, (val, idx) => {
      for (let i = idx + 1; i < arr.length; i++) {
        if (comparator(val, arr[i])) {
          err.push(val);
          return false;
        }
      }
      for (let i = 0; i < err.length; i++) {
        if (comparator(err[i], val)) {
          return false;
        }
      }
      return true;
    })
  }

  function zip(...args) {
    return map(args[0], (val, idx) => {
      return map(args, cell => cell[idx]);
    })
  }

  function zipObject(props, values) {
    let res = new Object();
    forEach(props, (val, idx) => {
      res[val] = values[idx];
    })
    return res;
  }

  function zipObjectDeep(props, values) {
    let res = new Object();
    forEach(props, (val, idx) => {
      let n = res;
      if (isPath(val)) {
        let path = toPath(val);
        for (let i = 0; i < path.length; i++) {
          if (i == path.length - 1) {
            n[path[i]] = values[idx];
          }
          else if (isNaN(+path[i + 1]) && n[path[i]] == undefined) {
            n[path[i]] = new Object();
          }
          else if (!isNaN(+path[i + 1]) && n[path[i]] == undefined) {
            n[path[i]] = new Array();
          }
          n = n[path[i]];
        }
      }
      else {
        res[val] = values[idx];
      }
    })
    return res;
  }

  function zipWith(...args) {
    let callback = iteratee(args.pop());
    return map(zip(...args), cell => {
      return callback(...cell);
    })
  }

  function countBy(collection, callback) {
    callback = iteratee(callback);
    let m = new Map();
    for (const key in collection) {
      let n = callback(collection[key]);
      if (m.has(n)) {
        m.set(n, m.get(n) + 1);
      }
      else {
        m.set(n, 1);
      }
    }
    let res = new Object();
    for (const key of m.keys()) {
      res[key] = m.get(key);
    }
    return res;
  }

  function find(collection, predicate, fromIndex = 0) {
    predicate = iteratee(predicate);
    for (let i = fromIndex; i < collection.length - 1; i++) {
      if (predicate(collection[i], i, collection)) {
        return collection[i];
      }
    }
    return undefined;
  }

  function findLast(collection, predicate, fromIndex = collection.length - 1) {
    predicate = iteratee(predicate);
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(collection[i], i, collection)) {
        return collection[i];
      }
    }
    return undefined;
  }

  function flatMap(collection, callback) {
    return concat(...map(collection, callback));
  }

  function flatMapDeep(collection, callback) {
    return flattenDeep(map(collection, callback));
  }

  function flatMapDepth(collection, callback, depth = 1) {
    return flattenDepth(map(collection, callback), depth);
  }

  function groupBy(collection, callback) {
    callback = iteratee(callback);
    let res = {};
    forEach(Array.from(new Set(map(collection, callback))), val => {
      res[val] = filter(collection, item => callback(item) === val)
    })
    return res;
  }

  function invokeMap(collection, path, ...args) {
    if (isString(path)) {
      return collection.map(val => val[path](...args));
    }
    else if (isFunction(path)) {
      return collection.map(val => path.call(val, ...args));
    }
  }

  function keyBy(collection, callback) {
    let res = {};
    forEach(map(collection, callback), (val, idx) => {
      res[val] = collection[idx];
    })
    return res;
  }

  function orderBy(collection, callbacks, orders) {
    forEachRight(callbacks, (val, idx) => {
      if (orders[idx] === "desc") {
        collection = collection.sort((a, b) => {
          return iteratee(val)(a) < iteratee(val)(b) ? 1 : -1;
        })
      }
      else {
        collection = collection.sort((a, b) => {
          return iteratee(val)(a) >= iteratee(val)(b) ? 1 : -1;
        })
      }
    })
    return collection;
  }

  function partition(collection, predicate) {
    predicate = iteratee(predicate);
    let res = [];
    res[0] = [];
    res[1] = [];
    forEach(collection, val => {
      if (predicate(val)) {
        res[0].push(val);
      }
      else {
        res[1].push(val);
      }
    })
    return res;
  }

  function isElement(value) {
    return Object.prototype.toString.call(value) === "[object HTMLBodyElement]";
  }

  function isArrayLike(value) {
    return getType(value) != "function" && isLength(value.length);
  }

  function isEqualWith(value, other, customizer) {
    for (let i = 0; i < value.length; i++) {
      if (customizer(value[i], other[i]) == false)
        return false;
    }
    return true;
  }

  function isMatchWith(object, source, customizer) {
    for (const key in source) {
      if (customizer(source[key], object[key]) == false) {
        return false;
      }
    }
    return true;
  }

  function isNative(value) {
    return includes(Function.prototype.toString.call(value), "[native code]");
  }

  function isRegExp(value) {
    return Object.prototype.toString.call(value) === "[object RegExp]";
  }


  return {
    isRegExp: isRegExp,
    isNative: isNative,
    isMatchWith: isMatchWith,
    isEqualWith: isEqualWith,
    isArrayLike: isArrayLike,
    isElement: isElement,
    partition: partition,
    orderBy: orderBy,
    keyBy: keyBy,
    invokeMap: invokeMap,
    groupBy: groupBy,
    flatMapDepth: flatMapDepth,
    flatMapDeep: flatMapDeep,
    flatMap: flatMap,
    findLast: findLast,
    find: find,
    countBy: countBy,
    zipObjectDeep: zipObjectDeep,
    zipObject: zipObject,
    zip: zip,
    zipWith: zipWith,
    unzip: unzip,
    add: add,
    unzipWith: unzipWith,
    without: without,
    xor: xor,
    xorBy: xorBy,
    xorWith: xorWith,
    union: union,
    unionBy: unionBy,
    unionWith: unionWith,
    uniq: uniq,
    uniqBy: uniqBy,
    uniqWith: uniqWith,
    tail: tail,
    take: take,
    takeRight: takeRight,
    takeRightWhile: takeRightWhile,
    takeWhile: takeWhile,
    sortedIndex: sortedIndex,
    sortedIndexBy: sortedIndexBy,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexBy: sortedLastIndexBy,
    sortedLastIndexOf: sortedLastIndexOf,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,
    reverse: reverse,
    remove: remove,
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
    forEachRight: forEachRight,
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