// 多边形
var _polygon = function (painter) {

    var scope = {
        /*
         * 连接两点的曲线其实使用path的多段(L x,y)拼接而成，这些x,y就是由插值算法计算得出
         * 设置d可以设置精度，d越大，精度越高，但是相应的计算量也会增加（计算时间增加）
         */
        d: 100
    },
        // 多边形插值方法
        catmullRom = clay.catmullRom();

    var polygon = function (point) {
        var p = point.slice();
        p.push(p[0]);

        var l = p.length;
        //添加首尾控制点，用于绘制完整曲线
        p.unshift(p[l - 2]);
        p.push(p[2]);

        var i = 1,
            temp = "M" + p[1][0] + " " + p[1][1] + " ";
        for (; i < l; i++) {
            var points = p.slice(i - 1, i + 3);
            catmullRom.setP(points[0], points[1], points[2], points[3]);
            temp = painter(catmullRom, 0, 1 / scope.d, temp);
        }
        // 闭合
        if (typeof temp == 'string') temp += " Z"; else temp.closePath();
        return temp;
    };

    polygon.setNum = function (num) {
        //设置进度（即将p1,p2两点间的曲线段分成的段数）
        scope.d = num;
        return polygon;
    };

    return polygon;

};

// 采用SVG绘制多边形
clay.svg.polygon = function () {
    return _polygon(
        function (
            calcFn, start, dx, temp
        ) {
            for (; start <= 1; start += dx) {
                var point = calcFn(start);
                temp = temp + " L" + point[0] + "," + point[1];
            }
            return temp;
        }
    );
};

// 采用Canvas绘制多边形
clay.canvas.polygon = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _polygon, function (
                calcFn, start, dx, temp
            ) {

                var point = calcFn(start);
                if (typeof temp == 'string') {
                    obj._p.moveTo(point[0], point[1]);
                }
                for (; start <= 1; start += dx) {
                    point = calcFn(start);
                    obj._p.lineTo(point[0], point[1]);
                }
                return obj._p;
            });

    return obj;

};
