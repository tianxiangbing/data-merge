let DataMerge = require('../src/index');
DataMerge.init({
    data:[],
    time:10000,
    mergeKey:['id'],
    callback:function(data,count,mergecount){
        console.log(+new Date())
        console.log(data,count,mergecount);
    }
});
setInterval(function(){
    DataMerge.merge([{id:parseInt(Math.random()*1000)}]);
},100)