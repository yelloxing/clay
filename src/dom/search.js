(function (window, $$, undefined) {

    'use strict';

    $$.node.prototype.selectAll = function (selector) {
        var _this= $$.selectAll(selector, this.count > 0 ? this.collection[0] : this.content);
        _this.namespace=this.namespace;
        return _this;
    };

    // 返回全部被选元素的父亲
    $$.node.prototype.parent = function (filterback) {
        var flag, parent, temp = this.collection;
        this.collection = [];
        for (flag = 0; flag < this.count; flag++) {
            parent = temp[flag].parentNode;
            if (parent) {
                if (typeof filterback !== 'function' || filterback(parent, flag)) {
                    this.collection.push(parent);
                }
            }
        }
        this.count = this.collection.length;
        this.selector += ":parent()";
        return this;

    };

    // 返回第一个被选元素的全部孩子
    $$.node.prototype.children = function (filterback) {

        var flag, children, temp = this.collection;
        this.collection = [];
        children = temp[0] ? temp[0].childNodes : [];
        for (flag = 0; flag < children.length; flag++) {
            if (children[flag].nodeType === 1 || children[flag].nodeType === 11 || children[flag].nodeType === 9) {
                if (typeof filterback !== 'function' || filterback(children[flag])) {
                    this.collection.push(children[flag]);
                }
            }
        }
        this.count = this.collection.length;
        this.selector += ":children()";
        return this;

    };

    // 返回全部被选元素的后一个兄弟
    $$.node.prototype.next = function (filterback) {

        var flag, next, temp = this.collection;
        this.collection = [];
        for (flag = 0; flag < this.count; flag++) {
            next = temp[flag].nextSibling;
            while (next && next.nodeType !== 1 && next.nodeType !== 11 && next.nodeType !== 9 && next.nextSibling) {
                next = next.nextSibling;
            }
            if (next && (next.nodeType === 1 || next.nodeType === 11 || next.nodeType === 9)) {
                if (typeof filterback !== 'function' || filterback(next, flag)) {
                    this.collection.push(next);
                }
            }
        }
        this.count = this.collection.length;
        this.selector += ":next()";
        return this;

    };

    // 返回全部被选元素的前一个兄弟
    $$.node.prototype.prev = function (filterback) {

        var flag, prev, temp = this.collection;
        this.collection = [];
        for (flag = 0; flag < this.count; flag++) {
            prev = temp[flag].previousSibling;
            while (prev && prev.nodeType !== 1 && prev.nodeType !== 11 && prev.nodeType !== 9 && prev.previousSibling) {
                prev = prev.previousSibling;
            }
            if (prev && (prev.nodeType === 1 || prev.nodeType === 11 || prev.nodeType === 9)) {
                if (typeof filterback !== 'function' || filterback(prev, flag)) {
                    this.collection.push(prev);
                }
            }
        }
        this.count = this.collection.length;
        this.selector += ":prev()";
        return this;

    };

})(window, window.clay);