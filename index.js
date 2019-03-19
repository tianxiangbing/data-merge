var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        module.exports = definition();
        // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);
    } else {
        DataMerge = definition();
    }
})(function () {
    "use strict";

    var DataMerge = function () {
        function DataMerge() {
            _classCallCheck(this, DataMerge);

            this.count = 0;
            this.loading = false;
            this.mergecount = 0;
            this.base = {};
        }

        _createClass(DataMerge, [{
            key: "init",
            value: function init(settings) {
                var _this = this;

                this.ss = _extends({ data: [], time: 200, callback: function callback() {}, mergeKey: '', mergeField: true, mode: 'merge', mergeType: 'json' }, settings);
                this.count = this.ss.data.length;
                if (this.count) {
                    var _loop = function _loop(i, l) {
                        var key = '';
                        if (_typeof(_this.ss.mergeKey) === 'object') {
                            _this.ss.mergeKey.forEach(function (it) {
                                key += _this.ss.data[i][it];
                            });
                        } else {
                            key = _this.ss.data[i][_this.ss.mergeKey];
                        }
                        _this.base[key] = _this.ss.data[i];
                    };

                    for (var i = 0, l = this.count; i < l; i++) {
                        _loop(i, l);
                    }
                }
                this.setTimer();
            }
        }, {
            key: "reset",
            value: function reset() {
                //重置数据
                this.ss.data = null;
                this.ss.data = [];
                this.count = 0;
                this.mergecount = 0;
                this.base = {};
                this.loading = false;
            }
        }, {
            key: "setTimer",
            value: function setTimer() {
                var _this2 = this;

                var st = setTimeout(function () {
                    clearTimeout(st);
                    st = null;
                    var data = [];
                    if (_this2.ss.mergeType === 'json') {
                        for (var k in _this2.base) {
                            data.push(_this2.base[k]);
                        }
                    } else {
                        data = _this2.ss.data;
                    }
                    _this2.ss.callback(data, _this2.count, _this2.mergecount);
                    _this2.reset();
                }, this.ss.time);
            }
        }, {
            key: "merge",
            value: function merge(md) {
                var _this3 = this;

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
                        var mergeKey = this.ss.mergeKey;
                        var mergeField = this.ss.mergeField;
                        md.forEach(function (item) {
                            var key = '';
                            if (_typeof(_this3.ss.mergeKey) === 'object') {
                                _this3.ss.mergeKey.forEach(function (it) {
                                    key += item[it];
                                });
                            } else {
                                key = item[_this3.ss.mergeKey];
                            }
                            if (_this3.base.hasOwnProperty(key)) {
                                _this3.mergecount++;
                                var base = _this3.base[key];
                                // this.base[item[mergeKey]] = item;
                                if (mergeField) {
                                    for (var k in item) {
                                        base[k] = item[k];
                                    }
                                }
                            } else {
                                _this3.base[key] = item;
                            }
                        });
                    } else if (this.ss.mode === 'over') {
                        //覆盖模式
                        var _mergeKey = this.ss.mergeKey;
                        md.forEach(function (item) {
                            var key = '';
                            if (_typeof(_this3.ss.mergeKey) === 'object') {
                                _this3.ss.mergeKey.forEach(function (it) {
                                    key += item[it];
                                });
                            } else {
                                key = item[_this3.ss.mergeKey];
                            }
                            if (_this3.base.hasOwnProperty(key)) {
                                _this3.mergecount++;
                            }
                            _this3.base[key] = item;
                        });
                    }
                }
            }
        }]);

        return DataMerge;
    }();

    return DataMerge;
});