// 贝塞尔曲线
var _bezier = function (painter) {

    var scope = {

    };


    var bezier = function () {

    };

    return bezier;

};

// 采用SVG绘制贝塞尔曲线
clay.svg.bezier = function () {
    return _bezier(
        function (

        ) {
            var d;
            return d;
        }
    );
};

// 采用Canvas绘制贝塞尔曲线
clay.canvas.bezier = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _bezier, function (

            ) {
                obj._painter.beginPath();

                return obj._painter;

            });

    return obj;

};
