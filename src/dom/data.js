(function (window, $$, undefined) {

    'use strict';

    // 用于把数据绑定到一组结点或返回第一个结点数据，可以传递函数对数据处理
    $$.node.prototype.datum = function (data, calc) {

        var flag;
        if (!data) {
            return this.collection[0] ? this.collection[0]._data : undefined;
        } else {
            data = typeof calc === 'function' ? calc(data) : data;
            for (flag = 0; flag < this.size; flag++) {
                this.collection[flag]._data = data;
            }
            return this;
        }

    };

    // 用于把一组数据绑定到一组结点或返回一组结点数据，可以传递函数对数据处理
    $$.node.prototype.data = function (datas, calc) {

        var flag, temp;
        if (!datas) {
            temp = [];
            for (flag = 0; flag < this.size; flag++) {
                temp[flag] = this.collection[flag]._data;
            }
            return temp;
        } else if (datas.constructor === Array) {
            this._collection = {
                datas: datas,
                calc: calc
            };
            for (flag = 0; flag < this.size && flag < datas.length; flag++) {
                this.collection[flag]._data = typeof calc === 'function' ? calc(datas[flag], flag) : datas[flag];
            }
            return this;
        } else {
            throw new Error('Unsupported data!');
        }

    };

    // 过滤出来多于结点的数据部分
    $$.node.prototype.enter = function () {

        this._collection.enter = [];
        var flag;
        for (flag = this.size; flag < this._collection.datas.length; flag++) {
            this._collection.enter.push(typeof this._collection.calc === 'function' ? this._collection.calc(this._collection.datas[flag]) : this._collection.datas[flag]);
        }
        return this;

    };

    // 过滤出来多于数据的结点部分
    $$.node.prototype.exit = function () {

        var flag, temp = this.collection;
        this.collection = [];
        for (flag = this._collection.datas.length; flag < this.size; flag++) {
            this.collection.push(temp[flag]);
        }
        this.size = this.collection.length;
        return this;

    };

})(window, window.quickES);