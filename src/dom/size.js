(function (window, $$, undefined) {

    'use strict';

    $$.node.prototype.size = function (type) {
        var elemHeight, elemWidth;
        if (this.count <= 0) {
            return {
                width: 0,
                height: 0
            };
        } else if (type == 'content') { //内容
            elemWidth = this.collection[0].clientWidth - ((this.css('padding-left') + "").replace('px', '')) - ((this.css('padding-right') + "").replace('px', ''));
            elemHeight = this.collection[0].clientHeight - ((this.css('padding-top') + "").replace('px', '')) - ((this.css('padding-bottom') + "").replace('px', ''));
        } else if (type == 'padding') { //内容+内边距
            elemWidth = this.collection[0].clientWidth;
            elemHeight = this.collection[0].clientHeight;
        } else if (type == 'border') { //内容+内边距+边框
            elemWidth = this.collection[0].offsetWidth;
            elemHeight = this.collection[0].offsetHeight;
        } else if (type == 'scroll') { //滚动的宽（不包括border）
            elemWidth = this.collection[0].scrollWidth;
            elemHeight = this.collection[0].scrollHeight;
        } else {
            elemWidth = this.collection[0].offsetWidth;
            elemHeight = this.collection[0].offsetHeight;
        }
        return {
            width: elemWidth,
            height: elemHeight
        };
    };

})(window, window.clay);