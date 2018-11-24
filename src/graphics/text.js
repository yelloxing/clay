// 文字
var _text = function (painter) {

    var scope = {

    };


    var text = function () {

    };

    return text;

};

// 采用SVG绘制文字
clay.svg.text = function () {
    return _text(
        function (

        ) {
            var d;
            return d;
        }
    );
};

// 采用Canvas绘制文字
clay.canvas.text = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _text, function (

            ) {
                obj._painter.beginPath();

                return obj._painter;

            });

    return obj;

};
