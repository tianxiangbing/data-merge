/*
 * Created with Visual Studio Code.
 * github: https://github.com/tianxiangbing/data-merge
 * User: 田想兵
 * Date: 2017-07-21
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 * desc: 主旨是对某一时间段里的数据进行合并，重复的记录进行去重，只取最新的记录。比如一秒钟来了1000条数据，其中有500条是重复的，那这一秒钟应该只返回500条结果。
 * 请使用https://github.com/tianxiangbing/data-merge 上的代码
 */
(function (definition) {
    // 
    if (typeof exports === "object") {
        module.exports = definition();
    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);
    }  else {
        DataMerge = definition();
    }

})(function () {
    "use strict";
    let DataMerge ={
        init(settings){
            this.ss = Object.assign({data:[],time:1000,callback:()=>{},mergeKey:''}, settings);
            setTimeout(()=>{
                
            },this.ss.time);
        },
        merge(md){
            ss.data.concat(md)
        }
    };
    return DataMerge;
});