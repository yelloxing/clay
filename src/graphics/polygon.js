// 多边形
var _polygon = function (painter) {

    var scope = {

    };


    var polygon = function () {



        return painter(

        );
    };

    polygon.setX = function () {
        //todo
    };

    return polygon;

};

// 采用SVG绘制多边形
clay.svg.polygon = function () {
    return _polygon(
        function (

        ) {
            var d = "";
            return d;
        }
    );
};

// 采用Canvas绘制多边形
clay.canvas.polygon = function (selector, config) {

    var key,
        obj =

            _canvas(selector, config, _polygon, function (

            ) {
                obj._p.beginPath();

                return obj._p;

            });

    return obj;

};
