let DataMerge = require('../src/index');
let d1 = new DataMerge();
d1.init({
    data: [{code:'aaa',under:"bbb",type:"fff",id:3}],
    time: 1000,
    mergeKey: ['code','under','type'],
    // mode:'merge',
    // mode: 'de-duplication',
    mode:'over',
    callback: function (data, count, mergecount) {
        console.log(+new Date())
        console.log(data)
        console.log(count, mergecount);
    }
});
setTimeout(function () {
    d1.merge({code:'aaa',under:"bbb",type:'ddd',id:1});
}, 100)
setTimeout(function () {
    d1.merge({code:'aaa',under:"bbb",type:'fff',id:2});
}, 100)
setTimeout(function () {
    d1.merge({code:'aaa',under:"ccc",type:'eee',id:3});
}, 100)
setTimeout(function () {
    d1.merge({code:'ddd',under:"ccc",type:'ggg',id:4});
}, 100)
setTimeout(function () {
    d1.merge({code:'aaa',under:"ccc",type:'ggg',id:5});
}, 100)
setTimeout(function () {
    d1.merge({code:'aaa',under:"ccc",type:'ggg',id:6});
}, 100)

// let d2 = new DataMerge();
// d2.init({
//     data: [],
//     time: 10000,
//     // mode:'merge',
//     mode: 'de-duplication',
//     callback: function (data, count, mergecount) {
//         console.log(+new Date())
//         console.log(data)
//         console.log(count, mergecount);
//     }
// });
// setInterval(function () {
//     d2.merge(parseInt(Math.random() * 100));
// }, 100)


// let d3 = new DataMerge();
// d3.init({
//     data: [],
//     time: 10000,
//     mode: 'merge',
//     // mode:'de-duplication',
//     callback: function (data, count, mergecount) {
//         console.log(+new Date())
//         console.log(data)
//         console.log(count, mergecount);
//     }
// });
// setInterval(function () {
//     d3.merge(parseInt(Math.random() * 100));
// }, 100)