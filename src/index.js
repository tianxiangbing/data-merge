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
    } else {
        DataMerge = definition();
    }
})(function () {
    "use strict";
    class DataMerge {
        constructor() {
            this.count = 0;
            this.loading = false;
            this.mergecount = 0;
            this.base = {};
        }
        init(settings) {
            this.ss = Object.assign({ data: [], time: 200, callback: () => { }, mergeKey: '', mergeField: true, mode: 'merge', mergeType: 'json' }, settings);
            this.count = this.ss.data.length;
            if (this.count) {
                for (let i = 0, l = this.count; i < l; i++) {
                    let key = '';
                    if(typeof this.ss.mergeKey ==='object'){
                        this.ss.mergeKey.forEach(it=>{
                            key += this.ss.data[i][it];
                        });
                    }else{
                        key = this.ss.data[i][this.ss.mergeKey]
                    }
                    this.base[key] = this.ss.data[i];
                }
            }
            this.setTimer();
        }
        reset() {
            //重置数据
            this.ss.data = null;
            this.ss.data = [];
            this.count = 0;
            this.mergecount = 0;
            this.base = {};
            this.loading = false;
        }
        setTimer() {
            let st = setTimeout(() => {
                clearTimeout(st);
                st = null;
                let data = [];
                if (this.ss.mergeType === 'json') {
                    for (let k in this.base) {
                        data.push(this.base[k]);
                    }
                } else {
                    data = this.ss.data;
                }
                this.ss.callback(data, this.count, this.mergecount)
                this.reset();
            }, this.ss.time);
        }
        merge(md) {
            if (md.constructor !== Array) {
                md = [md];
            }
            if (md.length > 0) {
                this.count += md.length;
                if (!this.loading) {
                    this.loading = true;
                    this.setTimer();
                }
                if (this.ss.mode === 'merge') {
                    //合并模式
                    this.ss.data = this.ss.data.concat(md);
                } else if (this.ss.mode === 'de-duplication') {
                    //去重模式
                    let mergeKey = this.ss.mergeKey;
                    let mergeField = this.ss.mergeField;
                    md.forEach(item => {
                        let key = '';
                        if(typeof this.ss.mergeKey ==='object'){
                            this.ss.mergeKey.forEach(it=>{
                                key += item[it];
                            });
                        }else{
                            key = item[this.ss.mergeKey]
                        }
                        if (this.base.hasOwnProperty(key)) {
                            this.mergecount++;
                            let base = this.base[key];
                            // this.base[item[mergeKey]] = item;
                            if (mergeField) {
                                for (let k in item) {
                                    base[k] = item[k];
                                }
                            }
                        } else {
                            this.base[key] = item;
                        }
                    });
                }else if(this.ss.mode ==='over'){
                    //覆盖模式
                    let mergeKey = this.ss.mergeKey;
                    md.forEach(item => {
                        let key = '';
                        if(typeof this.ss.mergeKey ==='object'){
                            this.ss.mergeKey.forEach(it=>{
                                key += item[it];
                            });
                        }else{
                            key = item[this.ss.mergeKey]
                        }
                        if (this.base.hasOwnProperty(key)) {
                            this.mergecount++;
                        }
                        this.base[key] = item;
                    });
                }
            }
        }
    }
    return DataMerge;
});