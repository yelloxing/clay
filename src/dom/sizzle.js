(function (window, $$, undefined) {

    'use strict';

    $$.node = function () { };

    $$.selectAll = function (selector, content) {

        var nodeObj = new $$.node(), flag, temp;

        nodeObj.selector = selector || '';
        nodeObj.content = content || document;
        nodeObj.collection = [];

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

        return nodeObj;

    };

})(window, window.quickES);