let DataMerge = require('../src/index');
let d1 = new DataMerge();
d1.init({
    data: [],
    time: 10000,
    mergeKey: 'id',
    // mode:'merge',
    mode: 'de-duplication',
    callback: function (data, count, mergecount) {
        console.log(+new Date())
        console.log(data)
        console.log(count, mergecount);
    }
});
setInterval(function () {
    d1.merge({ id: parseInt(Math.random() * 100) });
}, 100)

let d2 = new DataMerge();
d2.init({
    data: [],
    time: 10000,
    // mode:'merge',
    mode: 'de-duplication',
    callback: function (data, count, mergecount) {
        console.log(+new Date())
        console.log(data)
        console.log(count, mergecount);
    }
});
setInterval(function () {
    d2.merge(parseInt(Math.random() * 100));
}, 100)


let d3 = new DataMerge();
d3.init({
    data: [],
    time: 10000,
    mode: 'merge',
    // mode:'de-duplication',
    callback: function (data, count, mergecount) {
        console.log(+new Date())
        console.log(data)
        console.log(count, mergecount);
    }
});
setInterval(function () {
    d3.merge(parseInt(Math.random() * 100));
}, 100)