// 矩形
var _rect = function (painter) {

    var scope = {
        s: 10,
        t: ["LR"]
    };

    /**
     * 绘制矩形
     * @param {number} x 矩形起点的x坐标
     * @param {number} y 矩形起点的y坐标
     * @param {number} length 矩形长度
     * @param {number} deg 只有在使用旋转定位的时候才需要传递，表示旋转角度
     */
    var rect = function (x, y, length, deg) {
        // 记录矩形的四个角坐标
        var position, s2 = scope.s * 0.5;

        var flag = scope.t[0];

        // 分类前准备
        if (scope.t[0] == "RL" || scope.t[0] == "BT") {
            length = -length;
            flag = {
                "RL": "LR",
                "BT": "TB"
            }[scope.t[0]];
        }

        // 分类计算
        switch (flag) {
            case "LR":
                position = [
                    [x, y - s2],
                    [x + length, y - s2],
                    [x + length, y + s2],
                    [x, y + s2]
                ];
                break;
            case "TB":
                position = [
                    [x + s2, y],
                    [x + s2, y + length],
                    [x - s2, y + length],
                    [x - s2, y]
                ];
                break;
            default:
                deg = deg || 0;
                position = [
                    clay.rotate(scope.t[1], scope.t[2], deg + scope.t[0], x, y - s2),
                    clay.rotate(scope.t[1], scope.t[2], deg + scope.t[0], x + length, y - s2),
                    clay.rotate(scope.t[1], scope.t[2], deg + scope.t[0], x + length, y + s2),
                    clay.rotate(scope.t[1], scope.t[2], deg + scope.t[0], x, y + s2)
                ];
        }
        return painter(position);
    };

    // 设置矩形木棒的粗细
    rect.setSize = function (size) {
        scope.s = size;
        return rect;
    };

    // 设置矩形方向类型
    // 可以设置参数：
    // 1.垂直或水平 "LR"、"RL"、"TB"、"BT"
    // 2.任意角度 (deg,cx,cy)，deg表示初始角度，(cx,cy)表示旋转圆心
    rect.setType = function (type, cx, cy) {
        scope.t = [type, cx, cy];
        return rect;
    };

    return rect;

};

// 采用SVG绘制矩形
clay.svg.rect = function () {
    return _rect(
        function (p) {
            return "M" + p[0][0] + "," + p[0][1] + " " +
                "L" + p[1][0] + "," + p[1][1] + " " +
                "L" + p[2][0] + "," + p[2][1] + " " +
                "L" + p[3][0] + "," + p[3][1] + " " +
                "L" + p[0][0] + "," + p[0][1] + " ";
        }
    );
};

// 采用Canvas绘制矩形
clay.canvas.rect = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _rect, function (p) {
                obj._p.beginPath();
                obj._p.moveTo(p[0][0], p[0][1]);
                obj._p.lineTo(p[1][0], p[1][1]);
                obj._p.lineTo(p[2][0], p[2][1]);
                obj._p.lineTo(p[3][0], p[3][1]);
                obj._p.lineTo(p[0][0], p[0][1]);
                return obj._p;

            });

    return obj;

};
