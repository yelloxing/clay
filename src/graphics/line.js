// 任意曲线
var _line = function (painter) {

    var scope = {

    };


    var line = function () {

    };

    return line;

};

// 采用SVG绘制任意曲线
clay.svg.line = function () {
    return _line(
        function (

        ) {
            var d;
            return d;
        }
    );
};

// 采用Canvas绘制任意曲线
clay.canvas.line = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _line, function (

            ) {
                obj._painter.beginPath();

                return obj._painter;

            });

    return obj;

};
