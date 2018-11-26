// 文字
var _text = function (painter) {

    var scope = {};

    /**
     * 绘制文字
     * @param {number} x 文字坐标
     * @param {number} y
     * @param {string|number} text 绘制的文字
     */
    var text = function (x, y, text, deg) {
        deg = deg ? 0 : (deg * 180 / Math.PI);
        return painter(x, y, text, deg, scope.p[0], scope.p[1], scope.c || "#000", scope.s || 16);
    };

    // 设置对齐方式
    text.setAlign = function (horizontal, vertical) {
        scope.p = [horizontal, vertical];
        return text;
    };

    // 设置字体大小
    text.setSize = function (size) {
        scope.s = size;
    };

    // 设置字颜色
    text.setColor = function (color) {
        scope.c = color;
    };

    return text;

};

// 采用SVG绘制文字
clay.svg.text = function () {
    return _text(
        function (
            x, y, text, deg, horizontal, vertical, color, fontSize
        ) {
            var rotate = deg == 0 ? "" : "transform='rotate(" + deg + "," + x + "," + y + ")'";
            return clay('<text fill=' + color + ' x="' + x + '" y="' + y + '" ' + rotate + '>' + text + '</text>').css({
                // 文本水平
                "text-anchor": {
                    "left": "start",
                    "right": "end"
                }[horizontal] || "middle",
                // 本垂直
                "dominant-baseline": {
                    "top": "text-after-edge",
                    "bottom": "text-before-edge"
                }[vertical] || "middle",
                "font-size": fontSize
            });
        }
    );
};

// 采用Canvas绘制文字
clay.canvas.text = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _text, function (
                x, y, text, deg, horizontal, vertical, color, fontSize
            ) {
                obj._p.save();
                obj._p.beginPath();
                obj._p.textAlign = {
                    "left": "start",
                    "right": "end"
                }[horizontal] || "center";
                obj._p.textBaseline = {
                    "top": "top",
                    "bottom": "bottom"
                }[vertical] || "middle";
                obj._p.font = fontSize + 'px sans-serif';//字体大小
                obj._p.translate(x, y);
                obj._p.rotate(deg);
                obj._p.fillStyle = color;
                obj._p.fillText(text, x, y);
                obj._p.restore();
                return obj._p;
            });

    return obj;

};
