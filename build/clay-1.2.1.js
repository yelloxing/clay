/*!
*
* clay - Provide more flexible data visualization solutions!
* git+https://github.com/yelloxing/clay.git
* 
* author 心叶
*
* version 1.2.1
* 
* build Sun Jul 29 2018
*
* Copyright yelloxing
* Released under the MIT license
* 
* Date:Mon Aug 27 2018 00:57:32 GMT+0800 (CST)
*/
(function (global, factory) {

    'use strict';

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        factory(global);
    }

})(typeof window !== "undefined" ? window : this, function (global, undefined) {

    'use strict';

    var clay = function (selector, context) {
        return new clay.prototype.init(selector, context);
    };

    clay.prototype.init = function (selector, context) {

        if (typeof selector === 'function') {
            if (clay.__isLoad__) {
                selector();
            } else {
                if (document.addEventListener) {//Mozilla, Opera and webkit
                    document.addEventListener("DOMContentLoaded", function doListenter() {
                        document.removeEventListener("DOMContentLoaded", doListenter, false);
                        selector();
                        clay.__isLoad__ = true;
                    });
                } else if (document.attachEvent) {//IE
                    document.attachEvent("onreadystatechange", function doListenter() {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", doListenter);
                            selector();
                            clay.__isLoad__ = true;
                        }
                    });
                }
            }
        } else {
            this.context = context = context || document;
            var nodes = clay.sizzle(selector, context), flag;
            for (flag = 0; flag < nodes.length; flag++) {
                this[flag] = nodes[flag];
            }
            this.length = nodes.length;
        }
        return this;

    };

    clay.prototype.init.prototype = clay.prototype;

    clay.__isLoad__ = false;

    clay.author = '心叶';
    clay.email = 'yelloxing@gmail.com';
    clay.version = '1.2.1';

    global.clay = global.$$ = clay;

    return clay;

});
clay.namespace = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};

clay.regexp = {
    // http://www.w3.org/TR/css3-selectors/#whitespace
    "whitespace": "[\\x20\\t\\r\\n\\f]",
    // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    "identifier": "(?:\\\\.|[\\w-]|[^\0-\\xa0])+"
};

clay.math = {};
clay.svg = {};
clay.canvas = {};
clay.layout = {};

// 负责查找结点
clay.sizzle = function (selector, context) {

    var temp = [], flag;
    if (typeof selector === 'string') {
        // 去掉回车，空格和换行
        selector = (selector + "").trim().replace(/[\n\f\r]/g, '');

        // 支持的选择器包括：
        // #id .class [attr='value'] tagName
        // 包括任意组合
        // 如果选择全部元素，只可以传递一个*
        if (selector === "*") {
            return context.getElementsByTagName('*');
        }

        // 用于判断是否为合法选择器组合
        var whitespace = clay.regexp.whitespace,
            identifier = clay.regexp.identifier,
            regexp = new RegExp("^(?:" + identifier + "){0,1}(?:(?:#|\\.)" + identifier + "|\\[" + whitespace + "{0,}" + identifier + "(?:" + whitespace + "{0,}=" + whitespace + "{0,}(\\\'|\\\"){0,1}" + identifier + "\\1{0,1}){0,1}" + whitespace + "{0,}\\]){0,}$");
        if (regexp.test(selector)) {
            var targetNodes = [];

        }

        // 其它情况一律认为希望把字符串变成结点
        else {
            return [clay.toNode(selector)];
        }

    }
    // 如果是结点
    else if (selector && (selector.nodeType === 1 || selector.nodeType === 11 || selector.nodeType === 9)) {
        return [selector];
    }
    // 如果是结点集合
    else if (selector && (selector.constructor === Array || selector.constructor === HTMLCollection)) {
        for (flag = 0; flag < selector.length; flag++) {
            if (selector[flag] && (selector[flag].nodeType === 1 || selector[flag].nodeType === 11 || selector[flag].nodeType === 9)) {
                temp.push(selector[flag]);
            }
        }
        return temp;
    }
    // 如果是clay对象
    else if (selector && selector.constructor === clay) {
        return selector;
    } else {
        return [];
    }

};
// 把字符串变成结点
clay.toNode = function (str) {
    var frame = document.createElementNS(clay.namespace.svg, 'svg');
    // 把传递元素类型和标记进行统一处理
    if (new RegExp("^" + clay.regexp.identifier + "$").test(str)) str = "<" + str + "></" + str + ">";
    frame.innerHTML = str;
    var childNodes = frame.childNodes, flag, child;
    for (flag = 0; flag < childNodes.length; flag++) {
        if (childNodes[flag].nodeType === 1 || childNodes[flag].nodeType === 9 || childNodes[flag].nodeType === 11) {
            child = childNodes[flag];
            break;
        }
    }
    // 如果不是svg元素，重新用html命名空间创建
    // 目前结点只考虑了svg元素和html元素
    // 如果考虑别的元素类型需要修改此处判断方法
    if (/[A-Z]/.test(child.tagName)) {
        frame = document.createElement("div");
        frame.innerHTML = str;
        childNodes = frame.childNodes;
        for (flag = 0; flag < childNodes.length; flag++) {
            if (childNodes[flag].nodeType === 1 || childNodes[flag].nodeType === 9 || childNodes[flag].nodeType === 11) {
                child = childNodes[flag];
                break;
            }
        }
    }
    return child;
};
// 用于把数据绑定到一组结点或返回第一个结点数据
// 可以传递函数对数据处理
clay.prototype.datum = function (data, calcback) {

    if (data === null || data === undefined) {
        return this.length > 0 ? this[0]._data : undefined;
    } else {
        data = typeof calcback === 'function' ? calcback(data) : data;
        var flag;
        for (flag = 0; flag < this.length; flag++) {
            this[flag]._data = data;
        }
        return this;
    }

};
// 用于把一组数据绑定到一组结点或返回一组结点数据
// 可以传递函数对数据处理
clay.prototype.data = function (datas, calcback) {

    var flag, temp = [];
    if (datas && datas.constructor === Array) {
        // 创建新的对象返回，不修改原来对象
        var newClay = clay();
        for (flag = 0; flag < datas.length && flag < this.length; flag++) {
            this[flag]._data = typeof calcback === 'function' ? calcback(datas[flag]) : datas[flag];
            newClay[flag] = this[flag];
            newClay.length += 1;
        }
        // 分别记录需要去平衡的数据和结点
        newClay._enter = [];
        for (; flag < datas.length; flag++) {
            newClay._enter.push(typeof calcback === 'function' ? calcback(datas[flag]) : datas[flag]);
        }
        newClay._exit = [];
        for (; flag < this.length; flag++) {
            newClay._exit.push(this[flag]);
        }
        return newClay;
    } else {
        for (flag = 0; flag < this.length; flag++) {
            temp[flag] = this[flag]._data;
        }
        return temp;
    }

};
// 把过滤出来多于结点的数据部分变成结点返回
// 需要传递一个字符串来标明新创建元素是什么
clay.prototype.enter = function (str) {

    var flag, node, newClay = clay();
    for (flag = 0; this._enter && flag < this._enter.length; flag++) {
        node = clay.toNode(str);
        node._data = this._enter[flag];
        newClay[flag] = node;
        newClay.length += 1;
    }
    delete this._enter;
    return newClay;

};
// 把过滤出来多于数据的结点部分返回
clay.prototype.exit = function () {

    var flag, newClay = clay();
    for (flag = 0; this._exit && flag < this._exit.length; flag++) {
        newClay[flag] = this._exit[flag];
        newClay.length += 1;
    }
    delete this._exit;
    return newClay;

};
// Hermite三次插值
clay.math.hermite = function () {

    var scope = { "u": 0.5 };

    // 根据x值返回y值
    var hermite = function (x) {

        if (scope.MR) {
            var sx = (x - scope.a) / (scope.b - scope.a),
                sx2 = sx * sx,
                sx3 = sx * sx2;
            var sResult = sx3 * scope.MR[0] + sx2 * scope.MR[1] + sx * scope.MR[2] + scope.MR[3];
            return sResult * (scope.b - scope.a);
        } else {
            throw new Error('You shoud first set the position!');
        }

    };

    // 设置张弛系数【应该在点的位置设置前设置】
    hermite.setU = function (t) {

        if (typeof t === 'number') {
            scope.u = (1 - t) * 0.5;
        } else {
            throw new Error('Unsupported data!');
        }
        return hermite;

    };

    // 设置点的位置
    hermite.setP = function (x1, y1, x2, y2, s1, s2) {

        if (x1 < x2) {
            // 记录原始尺寸
            scope.a = x1; scope.b = x2;
            var p3 = scope.u * s1,
                p4 = scope.u * s2;
            // 缩放到[0,1]定义域
            y1 /= (x2 - x1);
            y2 /= (x2 - x1);
            scope.MR = [
                2 * y1 - 2 * y2 + p3 + p4,
                3 * y2 - 3 * y1 - 2 * p3 - p4,
                p3,
                y1
            ];
        } else {
            throw new Error('Unsupported data!');
        }
        return hermite;

    };

    return hermite;
};