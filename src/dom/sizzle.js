(function (window, $$, undefined) {

    'use strict';

    $$.node = function () {

        // 选择集合中的某个
        this.eq = function (num) {
            this.collection = this.size > num ? [this.collection[num]] : [];
            this.size = this.collection.length;
            return this;
        };

        this.setEnvironment = function (namespace) {
            this.namespace = namespace;
            return this;
        };

        // 只有在必要的时候才应该使用clone来建立一个新的对象
        this.clone = function () {
            var nodeObj = new $$.node(), flag;
            for (var key in this) {
                try {
                    if (this.hasOwnProperty(key)) {
                        nodeObj[key] = this[key];
                    }
                } catch (e) {
                    throw new Error("Illegal property value！");
                }
            }
            return nodeObj;
        };

    };

    $$.selectAll = function (selector, content) {

        var nodeObj = new $$.node(), flag, temp;

        selector = selector || '';
        nodeObj.content = content || document;
        nodeObj.collection = [];
        nodeObj.namespace = 'html';

        if (typeof selector === 'string') {

            selector = (selector + "").trim().replace(/[\n\f\r]/g, '');

            if (/^#[\d\w_]+$/.test(selector)) {
                temp = nodeObj.content.getElementById(selector.replace(/^#/, ''));
                if (temp) {
                    nodeObj.collection.push(temp);
                }
            } else if (/^[\d\w_]+$/.test(selector)) {
                temp = nodeObj.content.getElementsByTagName(selector);
                for (flag = 0; flag < temp.length; flag++) {
                    nodeObj.collection.push(temp[flag]);
                }
            } else {
                throw new Error('Unsupported selector!');
            }

        } else if (selector.constructor === Array) {

            for (flag = 0; flag < selector.length; flag++) {
                if (selector[flag].nodeType === 1 || selector[flag].nodeType === 9 || selector[flag].nodeType === 11) {
                    nodeObj.collection.push(selector[flag]);
                } else {
                    console.warn('The existence of elements of non - node types!');
                }
            }

        } else if (selector.nodeType === 1 || selector.nodeType === 9 || selector.nodeType === 11) {

            nodeObj.collection.push(selector);

        } else {

            throw new Error("Unexcepted Error!");

        }

        nodeObj.size = nodeObj.collection.length;

        nodeObj.selector = (this.selector ? this.selector : "") + "selectAll(\"" + selector + "\")";

        return nodeObj;

    };

})(window, window.quickES);