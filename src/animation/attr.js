(function (window, $$, undefined) {

    'use strict';

    // 色彩处理方法
    var colorback = function (nodeObj, index, startVal, endVal, duration, ease, delay) {

    };

    // 针对需要过渡的属性定义处理方法
    $$.node.prototype.animation.attrback = function () {
        return {
            'fill': colorback,
            'stroke': colorback
        };
    };

})(window, window.quickES);