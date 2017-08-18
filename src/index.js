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
            this.mergecount = 0;
            this.base = {};
        }
        init(settings) {
            this.ss = Object.assign({ data: [], time: 1000, callback: () => { }, mergeKey: '', mode: 'merge', mergeType: 'json' }, settings);
            this.count = this.ss.data.length;
            if(this.count){
                for(let i = 0 ,l = this.count ; i< l; i ++){
                    this.base[this.ss.data[i][this.ss.mergeKey]] = this.ss.data[i];
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
        }
        setTimer() {
            let st = setTimeout(() => {
                clearTimeout(st);
                let data = [];
                if (this.mergeType === 'json') {
                    for (let k in this.base) {
                        data.push(this.base[k]);
                    }
                } else {
                    data = this.ss.data;
                }
                this.ss.callback(data, this.count, this.mergecount)
                this.reset();
                this.setTimer();
            }, this.ss.time);
        }
        merge(md) {
            if (this.ss.mergeType === 'json') {
                this.merge2(md);
            }else{
                this.merge1(md);
            }
        }
        merge1(md) {
            if (md.constructor !== Array) {
                md = [md];
            }
            this.count += md.length;
            if (this.ss.mode === 'merge') {
                //合并模式
                this.ss.data = this.ss.data.concat(md);
            } else if (this.ss.mode === 'de-duplication') {
                //去重模式
                let mergeKey = this.ss.mergeKey;
                md.forEach(item => {
                    let ismerge = false;
                    this.ss.data.forEach((sitem, index) => {
                        if (sitem === item || (mergeKey && sitem[mergeKey] === item[mergeKey])) {
                            this.ss.data[index] = item;
                            ismerge = true;
                            this.mergecount++;
                            return false;
                        }
                    });
                    if (!ismerge) {
                        this.ss.data.push(item);
                    }
                })
            }
        }
        merge2(md) {
            if (md.constructor !== Array) {
                md = [md];
            }
            this.count += md.length;
            if (this.ss.mode === 'merge') {
                //合并模式
                this.ss.data = this.ss.data.concat(md);
            } else if (this.ss.mode === 'de-duplication') {
                //去重模式
                let mergeKey = this.ss.mergeKey;
                md.forEach(item => {
                    let ismerge = false;
                    // this.ss.data.forEach((sitem, index) => {
                    //     if (sitem === item || (mergeKey &&  sitem[mergeKey] === item[mergeKey])) {
                    //         this.ss.data[index] = item;
                    //         ismerge = true;
                    //         this.mergecount++;
                    //         return false;
                    //     }
                    // });
                    if (this.base.hasOwnProperty(item[mergeKey])) {
                        this.mergecount++;
                        this.base[item[mergeKey]] = item;
                    } else {
                        this.base[item[mergeKey]] = item;
                    }
                });
            }
        }
    }
    return DataMerge;
});