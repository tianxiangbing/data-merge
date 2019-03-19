# dataMerge
对大量数据进行合并处理，优化性能。

主旨是对某一时间段里的数据进行合并，重复的记录进行去重，只取最新的记录。比如一秒钟来了1000条数据，其中有500条是重复的，那这一秒钟应该只返回500条结果。
## 两种模式
1. `de-duplication` 一种是合并去重模式,把某一时间段内的内容合并后进行去重再返回结果集
2. `merge`只作合并，只对时间段内的内容合并返回结果集

# 范例
``` js
let d1 = new DataMerge();
d1.init({
    data:[],
    time:10000,
    mergeKey:['id'],
    // mode:'merge',
    mode:'de-duplication',
    callback:function(data,count,mergecount){
        console.log(+new Date())
        console.log(data)
        console.log(count,mergecount);
    }
});
setInterval(function(){
    d1.merge({id:parseInt(Math.random()*100)});
},100)
```
# NPM安装 
    npm install datamerge --save
# API
## init
    初始化方法，可以初始化一些参数
### data:`Array`
    初始化的数组，注意如果初始化的数据就有重复的，将不会去重。
### time:`Int`
    合并的时间段，毫秒数。默认合并1000毫秒内的数据
### mergeType:`'json'`
    合并类型，默认采用json转化为key的方式去重，将大大优化合并的效率
### mergeKey:`String`|`Array`
    当传递这个参数，并且`mode`是`de-duplication` ,将判断`mergeKey`这个字段里的值相等时也作合并。记录是json对象的时候有用。不传这个值 ，只作全等于`===`判断。
### mode: `merge` | `de-duplication` | `over`
    `merge`合并数据,`de-duplication`对数据合并去重，去重的条件就是上面的`mergeKey`或者全等于了,`over`判断mergeKey相等时覆盖记录，此时mergeKey传数组.
### callback:`function(data,count,mergecount)`
    回调函数 ，第一个`data`是合并后的数据，`count`是总条数，`mergecount`是去重的数量，仅在`de-duplication`有值。
## merge :`function()`
    需要处理的数据，可以是json对象或基本类型数据。
## mergeField:`bool`
    是否合并字段，默认为true,否则则直接丢掉整条重复的数据。