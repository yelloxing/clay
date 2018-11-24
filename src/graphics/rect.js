// 矩形
var _rect = function (painter) {

    var scope = {

    };


    var rect = function () {

    };

    return rect;

};

// 采用SVG绘制矩形
clay.svg.rect = function () {
    return _rect(
        function (

        ) {
            var d;
            return d;
        }
    );
};

// 采用Canvas绘制矩形
clay.canvas.rect = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _rect, function (

            ) {
                obj._painter.beginPath();

                return obj._painter;

            });

    return obj;

};
