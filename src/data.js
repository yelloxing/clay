// 用于把数据绑定到一组结点或返回第一个结点数据
// 可以传递函数对数据处理
_clay_prototype.datum = function (data, calcback) {

    if (data === null || data === undefined) {
        return this.length > 0 ? this[0]._data : undefined;
    } else {
        var flag;
        for (flag = 0; flag < this.length; flag++) {
            data = _is_function(calcback) ? calcback(data, flag) : data;
            this[flag]._data = data;
        }
        return this;
    }

};
// 用于把一组数据绑定到一组结点或返回一组结点数据
// 可以传递函数对数据处理
_clay_prototype.data = function (datas, calcback) {

    var flag, temp = [];
    if (datas) {
        if (datas.constructor !== Array) {
            var _temp = [];
            for (flag in datas) {
                _temp.push(datas[flag]);
            }
            datas = _temp;
        }
        // 创建新的对象返回，不修改原来对象
        var newClay = clay();
        newClay.selector = this.selector;
        for (flag = 0; flag < datas.length && flag < this.length; flag++) {
            this[flag]._data = _is_function(calcback) ? calcback(datas[flag], flag) : datas[flag];
            newClay[flag] = this[flag];
            newClay.length += 1;
        }
        // 分别记录需要去平衡的数据和结点
        newClay._enter = [];
        for (; flag < datas.length; flag++) {
            newClay._enter.push(_is_function(calcback) ? calcback(datas[flag], flag) : datas[flag]);
        }
        newClay._exit = [];
        for (; flag < this.length; flag++) {
            newClay._exit.push(this[flag]);
        }
        return newClay;
    } else {
        // 获取数据
        for (flag = 0; flag < this.length; flag++) {
            temp[flag] = this[flag]._data;
        }
        return temp;
    }

};
// 把过滤出来多于结点的数据部分变成结点返回
// 需要传递一个字符串来标明新创建元素是什么
_clay_prototype.enter = function (str) {

    var flag, node, newClay = clay();
    newClay.selector = this.selector;
    for (flag = 0; this._enter && flag < this._enter.length; flag++) {
        node = _toNode(str);
        node._data = this._enter[flag];
        newClay[flag] = node;
        newClay.length += 1;
    }
    delete this._enter;
    return newClay;

};
// 把过滤出来多于数据的结点部分返回
_clay_prototype.exit = function () {

    var flag, newClay = clay();
    newClay.selector = this.selector;
    for (flag = 0; this._exit && flag < this._exit.length; flag++) {
        newClay[flag] = this._exit[flag];
        newClay.length += 1;
    }
    delete this._exit;
    return newClay;

};
// 迭代执行
_clay_prototype.loop = function (doIt) {
    var flag;
    for (flag = 0; flag < this.length; flag++) {
        doIt(this[flag]._data, flag, this.eq(flag));
    }
    return this;
};
