// 2D刻度尺
var _ruler = function (painter) {

    var scope = {
        // 间距个数
        'n': 1,
        // 前进方向左侧刻度长度和右侧长度、粗度
        'small': [0, 0, 1],
        'big': [0, 0, 2],
        'color': '#000'
    };

    var ruler = function (begin, end) {

        var flag, dis = (end - begin) / scope.n;
        for (flag = begin; (dis > 0 && flag <= end) || (dis < 0 && flag >= end); flag += dis) {
            // 大刻度
            painter(flag, scope.big[0], scope.big[1], scope.big[2], typeof scope.color == 'function' ? scope.color(flag) : scope.color, scope);
            if (flag + dis / 5 * 4 < end) {

                // 小刻度
                painter(flag + dis / 5, scope.small[0], scope.small[1], scope.small[2], typeof scope.color == 'function' ? scope.color(flag + dis / 5) : scope.color, scope);
                painter(flag + dis / 5 * 2, scope.small[0], scope.small[1], scope.small[2], typeof scope.color == 'function' ? scope.color(flag + dis / 5 * 2) : scope.color, scope);
                painter(flag + dis / 5 * 3, scope.small[0], scope.small[1], scope.small[2], typeof scope.color == 'function' ? scope.color(flag + dis / 5 * 3) : scope.color, scope);
                painter(flag + dis / 5 * 4, scope.small[0], scope.small[1], scope.small[2], typeof scope.color == 'function' ? scope.color(flag + dis / 5 * 4) : scope.color, scope);
            }
        }

    };

    // set={

    // 【公共参数】
    //     "smallLeft":number
    //     "smallRight":number
    //     "smallSize":number
    //     "bigLeft":number
    //     "bigRight":number
    //     "bigSize":number
    //     "color":string/function
    //     "num":number

    // 【扇形刻度尺特有参数】
    //     "cx":number,
    //     "cy":number,
    //     "radius":number,

    //  【直线刻度尺特有参数】
    //     "direction":"horizontal|vertical",
    //     "seat":number

    // }
    ruler.set = function (config) {

        if (typeof config.smallLeft === 'number') scope.small[0] = config.smallLeft;
        if (typeof config.smallRight === 'number') scope.small[1] = config.smallRight;
        if (typeof config.smallSize === 'number') scope.small[2] = config.smallSize;
        if (typeof config.bigLeft === 'number') scope.big[0] = config.bigLeft;
        if (typeof config.bigRight === 'number') scope.big[1] = config.bigRight;
        if (typeof config.bigSize === 'number') scope.big[2] = config.bigSize;
        if (typeof config.color === 'string' || typeof config.color === 'function') scope.color = config.color;
        if (typeof config.num === 'number') scope.n = config.num;
        if (typeof config.cx === 'number') scope.cx = config.cx;
        if (typeof config.cy === 'number') scope.cy = config.cy;
        if (typeof config.radius === 'number') scope.radius = config.radius;
        if (typeof config.seat === 'number') scope.seat = config.seat;
        if (config.direction === 'horizontal' || config.direction === 'vertical') scope.direction = config.direction;
        return ruler;
    };

    return ruler;

};
