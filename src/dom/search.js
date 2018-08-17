(function (window, $$, undefined) {

    'use strict';

    // 查找方法中只有这个会主动new一个新对象
    $$.node.prototype.find = function (selector) {
        var _this = $$.sizzle(selector, this.count > 0 ? this.collection[0] : this.content);
        _this.namespace = this.namespace;
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

    // 返回第一个被选元素的所有祖先元素（不包括祖先的兄弟）,只支持二类选择器
    $$.node.prototype.parents = function (filterback) {

        filterback = filterback || '';
        var flag, parent, temp = this.collection;
        this.collection = [];
        for (flag = 0; flag < this.count; flag++) {
            parent = temp[flag].parentNode;
            while (parent && parent.nodeType !== 1 && parent.nodeType !== 11 && parent.nodeType !== 9 && parent.parentNode) {
                parent = parent.parentNode;
            }
            if (parent && (parent.nodeType === 1 || parent.nodeType === 11 || parent.nodeType === 9)) {
                if (typeof filterback !== 'function' || filterback(parent, flag)) {
                    this.collection.push(parent);
                }
            }
        }
        if (typeof filterback === 'string') {
            this.collection = $$.sizzle.tool.filter(this.collection, filterback);
        }
        this.count = this.collection.length;
        this.selector += ":parents(" + filterback + ")";
        return this;

    };

    // 返回第一个被选元素的全部孩子,只支持二类选择器
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
        if (typeof filterback === 'string') {
            this.collection = $$.sizzle.tool.filter(this.collection, filterback);
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

    // 返回第一个被选元素的所有跟随的同胞元素,只支持二类选择器
    $$.node.prototype.nextAll = function (filterback) {

        filterback = filterback || '';
        var flag,
            next = this.collection[0],
            tempResult = [];
        while (next && next.nextSibling) {
            next = next.nextSibling;
            if (next.nodeType === 1 || next.nodeType === 11 || next.nodeType === 9) {
                tempResult.push(next);
            }
        }
        if (typeof filterback === 'function') {
            var _tempResult = tempResult;
            tempResult = [];
            for (flag = 0; flag < _tempResult.length; flag++) {
                if (filterback(_tempResult[flag], flag)) {
                    tempResult.push(_tempResult[flag]);
                }
            }
        } else {
            tempResult = $$.sizzle.tool.filter(tempResult, filterback);
        }
        for (flag = tempResult.length; flag < this.count; flag++) {
            delete this.collection[flag];
        }
        this.count = tempResult.length;
        for (flag = 0; flag < tempResult.length; flag++) {
            this.collection[flag] = tempResult[flag];
        }
        this.selector = this.selector + ":nextAll('" + filterback + "')";
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

    // 返回第一个被选元素的所有之前的同胞元素，只支持二类选择器
    $$.node.prototype.prevAll = function (filterback) {

        filterback = filterback || '';
        var flag,
            prev = this.collection[0],
            tempResult = [];
        while (prev && prev.previousSibling) {
            prev = prev.previousSibling;
            if (prev.nodeType === 1 || prev.nodeType === 11 || prev.nodeType === 9) {
                tempResult.push(prev);
            }
        }
        if (typeof filterback === 'function') {
            var _tempResult = tempResult;
            tempResult = [];
            for (flag = 0; flag < _tempResult.length; flag++) {
                if (filterback(_tempResult[flag], flag)) {
                    tempResult.push(_tempResult[flag]);
                }
            }
        } else {
            tempResult = $$.sizzle.tool.filter(tempResult, filterback);
        }
        for (flag = tempResult.length; flag < this.count; flag++) {
            delete this.collection[flag];
        }
        this.count = tempResult.length;
        for (flag = 0; flag < tempResult.length; flag++) {
            this.collection[flag] = tempResult[flag];
        }
        this.selector = this.selector + ":prevAll('" + filterback + "')";
        return this;

    };

    // 根据选择器过滤已经选择的节点，只支持二类选择器
    $$.node.prototype.filter = function (selector) {

        selector = selector || '';
        var flag, tempResult = [];
        for (flag = 0; flag < this.count; flag++) {
            tempResult.push(this.collection[flag]);
        }
        tempResult = $$.sizzle.tool.filter(tempResult, selector);
        for (flag = tempResult.length; flag < this.count; flag++) {
            delete this.collection[flag];
        }
        this.count = tempResult.length;
        for (flag = 0; flag < tempResult.length; flag++) {
            this.collection[flag] = tempResult[flag];
        }
        this.selector += ":filter('" + selector + "')";
        return this;

    };

})(window, window.clay);