var machineeeee = function () {
  function chunk(arr, size) {
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
  return {
    chunk: chunk,
  }
}