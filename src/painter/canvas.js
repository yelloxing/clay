// 获取canvas2D对象
function _getCanvas2D(selector) {

    if (selector && selector.constructor === CanvasRenderingContext2D)
        return selector;
    else {
        var canvas = clay(selector);
        if (canvas.length > 0)
            return canvas[0].getContext("2d");
    }

}

// 基本的canvas对象
// config采用canvas设置属性的api
// 前二个参数不是必输项
// 绘制前再提供下面提供的方法设置也是可以的
// 第三个参数代表图形绘制控制方法
// 最后一个是配置给控制方法的参数
var _canvas = function (_selector, config, painterback, param) {

    var key, temp = painterback(param);
    temp._config = config || {};
    temp._painter = _getCanvas2D(_selector);

    // 获取画笔
    temp.canvas = function (selector) {
        temp._painter = _getCanvas2D(selector);
        return temp;
    };

    // 配置画笔
    temp.config = function (_config) {
        for (key in _config)
            temp._config[key] = _config[key];
        return temp;
    };

    return temp;

};

// 考虑到canvas画图时就一个图层会有诸多不便
// 提供一个可以使用图层绘制的canvas对象
// 考虑到效率问题，和绘画独立出来
clay.canvas.layer = function (selector, width, height) {
    // 画笔
    var painter = selector ? _getCanvas2D(selector) : undefined,
        canvas = [],
        // 图层集合
        layer = {};
    var layerManager = {
        "get": function (index) {
            if (!layer[index] || layer[index].constructor !== CanvasRenderingContext2D) {

                canvas.push(document.createElement('canvas'));
                // 设置大小才会避免莫名其妙的错误
                canvas[canvas.length - 1].setAttribute('width', width);
                canvas[canvas.length - 1].setAttribute('height', height);

                layer[index] = canvas[canvas.length - 1].getContext('2d');
            }
            return layer[index];
        },
        "painter": function (selector) {
            if (selector)
                painter = _getCanvas2D(selector);
            return painter;
        },
        "clean": function (ctx2D) {
            ctx2D.clearRect(0, 0, width, height);
            return layerManager;
        },
        "update": function () {
            if (painter && painter.constructor === CanvasRenderingContext2D) {
                var flag;
                painter.clearRect(0, 0, width, height);
                painter.save();
                // 混合模式等先不考虑
                for (flag = 0; flag < canvas.length; flag++) {
                    painter.drawImage(canvas[flag], 0, 0, width, height, 0, 0, width, height);
                }
                painter.restore();
            }
            return layerManager;
        }
    };

    return layerManager;

};
