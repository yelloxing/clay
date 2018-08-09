(function (window, $$, undefined) {

    'use strict';

    // 针对需要过渡的属性定义处理方法
    $$.node.prototype.animation.attrback = function () {
        return {
            'fill': function (nodeObj, index, startVal, endVal, duration, ease, delay) {

                

            }
        };
    };

})(window, window.quickES);