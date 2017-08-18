let DataMerge = require('../src/index');
let d1 = new DataMerge();
d1.init({
    data: [{id:1}],
    time: 100,
    mergeKey: 'id',
    mergeType:'json',
    // mode:'merge',
    mode: 'de-duplication',
    callback: function (data, count, mergecount) {
        if(count>0){
            // console.log(data)
            console.log(count, mergecount);
        }
    }
});
let n = 0 ;
// setInterval(function () {
//     d1.merge({ id: n});
//     n ++ ;
// }, 10)
let arr = []
for(;n <1000;n++){
    arr.push({id:n})
}
d1.merge(arr);
let arr2 = [];
for(n=500;n <1500;n++){
    arr2.push({id:n});
}
let now = Date.now();
d1.merge(arr2);
let nw = Date.now();
console.log(nw - now,'ms');