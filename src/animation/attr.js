(function (window, $$, undefined) {

    'use strict';

    // 色彩处理方法
    var colorback = function (key, nodeObj, index, startVal, endVal, duration, ease) {
        // 获取渲染后的值
        var stVal = $$.sizzle('head').css('color', startVal).css('color').replace(/^rgba?\(([^)]+)\)$/, '$1').split(',');
        var etVal = $$.sizzle('head').css('color', endVal).css('color').replace(/^rgba?\(([^)]+)\)$/, '$1').split(',');
        // 统一透明度
        if (stVal.length == 3) stVal[3] = 1;
        if (etVal.length == 3) etVal[3] = 1;
        var easeFunction = typeof ease === 'function' ? ease : $$.math.ease(ease);
        //启动动画
        $$.animation(function (deep) {
            deep = easeFunction(deep);
            nodeObj.attr(key, 'rgba(' +
                (deep * (etVal[0] - stVal[0]) * 0.01 - (-stVal[0])) + ',' +
                (deep * (etVal[1] - stVal[1]) * 0.01 - (-stVal[1])) + ',' +
                (deep * (etVal[2] - stVal[2]) * 0.01 - (-stVal[2])) + ',' +
                (deep * (etVal[3] - stVal[3]) * 0.01 - (-stVal[3])) +
                ')', true);
        }, duration, function () {
            nodeObj.attr(key, endVal, true);
        });
    };

    // 尺寸处理方法
    var sizeback = function (key, nodeObj, index, startVal, endVal, duration, ease) {
        var startValArray = /^([\d.]+)(.*)$/.exec(startVal);
        var endValArray = /^([\d.]+)(.*)$/.exec(endVal);
        var unit = endValArray[2];
        if (startValArray && startValArray[2] == '') startValArray[2] = 'px';
        if (endValArray && endValArray[2] == '') endValArray[2] = 'px';
        var etVal = endValArray[1], stVal;
        if (!startValArray || startValArray[2] != unit) {
            stVal = 0;
        } else {
            stVal = startValArray[1];
        }
        var easeFunction = typeof ease === 'function' ? ease : $$.math.ease(ease);
        //启动动画
        $$.animation(function (deep) {
            deep = easeFunction(deep);
            nodeObj.attr(key, (deep * (etVal - stVal) * 0.01 - (-stVal)) + unit, true);
        }, duration, function () {
            nodeObj.attr(key, endVal, true);
        });
    };

    // 针对需要过渡的属性定义处理方法
    $$.node.prototype.animation.attrback = function () {
        return {
            'fill': colorback,
            'stroke': colorback,
            'width': sizeback,
            'height': sizeback,
            'x': sizeback,
            'y': sizeback,
            'left': sizeback,
            'right': sizeback,
            'top': sizeback,
            'bottom': sizeback
        };
    };

})(window, window.clay);