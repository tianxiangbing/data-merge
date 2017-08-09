let DataMerge = require('../src/index');
let d1 = new DataMerge();
d1.init({
    data: [],
    time: 100,
    mergeKey: ['id'],
    // mode:'merge',
    mode: 'de-duplication',
    callback: function (data, count, mergecount) {
        console.log(data)
        console.log(count, mergecount);
    }
});
let n = 0 ;
setInterval(function () {
    d1.merge({ id: n});
    n ++ ;
}, 10)