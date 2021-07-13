var machineeeee = function () {
  function chunk(arr, size = 1) {
    let arrPlus = [];
    for (let i = 0; i < arr.length;) {
      let t = [];
      for (let j = 0; j < size && i < arr.length; j++) {
        t[j] = arr[i++];
      }
      arrPlus.push(t);
    }
    return arrPlus;
  }

  function compact(arr) {
    let arrPlus = arr.filter(item => item);
    return arrPlus;
  }

  function concat(arr, ...arg) {
    let arrPlus = [];
    for (let i = 0; i < arr.length; i++) {
      arrPlus.push(arr[i]);
    }

    for (let i = 0; i < arg.length; i++) {
      if (Array.isArray(arg[i])) {
        for (let j = 0; j < arg[i].length; j++) {
          arrPlus.push(arg[i][j]);
        }
      }
      else
        arrPlus.push(arg[i]);
    }

    return arrPlus;
  }

  function drop(arr, n = 1) {
    let arrPlus = [];
    for (let i = n; i < arr.length; i++) {
      arrPlus.push(arr[i]);
    }
    return arrPlus;
  }

  function dropRight(arr, n = 1) {
    let arrPlus = [];
    for (let i = 0; i < arr.length - n; i++) {
      arrPlus.push(arr[i]);
    }
    return arrPlus;
  }

  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value;
    }
    return array;
  }

  function difference(array, ...values) {
    let arrPlus = [];
    let arr = concat(...values);
    for (let i = 0; i < array.length; i++) {
      if (!arr.includes(array[i]))
        arrPlus.push(array[i]);
    }
    return arrPlus;
  }

  function flatten(array) {
    let arrPlus = [];
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        for (let j = 0; j < array[i].length; j++)
          arrPlus.push(array[i][j]);
      }
      else {
        arrPlus.push(array[i]);
      }
    }
    return arrPlus;
  }

  function flattenDeep(array) {
    let arrPlus = [];
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i]))
        arrPlus = arrPlus.concat(flattenDeep(array[i]));
      else
        arrPlus.push(array[i]);
    }
    return arrPlus;
  }

  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    drop: drop,
    dropRight: dropRight,
    fill: fill,
    difference: difference,
    flatten: flatten,
    flattenDeep: flattenDeep,
  }
}