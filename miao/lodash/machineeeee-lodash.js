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
    return typeof value == "boolean";
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
      return res.length > 0;
    }
    else if (typeof value === "string")
      return value.length > 0;
    else
      return true;
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

  }
}();