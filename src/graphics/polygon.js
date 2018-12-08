// 多边形
var _polygon = function (painter) {

    var scope = {
        /*
         * 连接两点的曲线其实使用path的多段(L x,y)拼接而成，这些x,y就是由插值算法计算得出
         * 设置d可以设置精度，d越大，精度越高，但是相应的计算量也会增加（计算时间增加）
         */
        d: 100
    };
    var catmullRom = function (points, x) {
        /*
         *  catmull-rom插值
         *  给定四个点p0,p1,p2,p3，可以计算出p1,p2之间的插值，其中的p0,p3为控制点
         *  x为偏移量  x的取值范围为[0,1]，x取0将得出p1的y值，x取1将得出p2的y值
         * 
         *  points : [[x0,y0],[x1,y1],[x2,y2],[x3,y3]]  包含四个点的数组，每个点用数组描述
         *  x : 偏移量
         */
        var x2 = x * x;
        var x3 = x2 * x;
        var Xp = clay.Matrix4([-1, 2, -1, 0, 3, -5, 0, 2, -3, 4, 1, 0, 1, -1, 0, 0]).use(points[0][0], points[1][0], points[2][0], points[3][0]);
        Xp = Xp[0] * x3 + Xp[1] * x2 + Xp[2] * x + Xp[3] * 1;
        Xp *= 0.5;
        var Yp = clay.Matrix4([-1, 2, -1, 0, 3, -5, 0, 2, -3, 4, 1, 0, 1, -1, 0, 0]).use(points[0][1], points[1][1], points[2][1], points[3][1]);
        Yp = Yp[0] * x3 + Yp[1] * x2 + Yp[2] * x + Yp[3] * 1;
        Yp *= 0.5;
        return [Xp, Yp];
    }

    var polygon = function (pointsList) {
        if (pointsList.length === 1) {
            return "M" + expandArray[0][0] + " " + expandArray[0][1] + " ";
        } else if (pointsList.length === 0) {
            return "M0 0 ";
        }
        //添加首尾控制点，用于绘制完整曲线
        var dx = pointsList[1][0] - pointsList[0][0];
        var dy = pointsList[1][1] - pointsList[0][1];
        var expandArray = JSON.parse(JSON.stringify(pointsList));
        expandArray.unshift([pointsList[0][0] - dx, pointsList[0][1] - dy]);
        var length = pointsList.length;
        dx = pointsList[length - 1][0] - pointsList[length - 2][0];
        dy = pointsList[length - 1][1] - pointsList[length - 2][1];
        expandArray.push([pointsList[length - 1][0] + dx, pointsList[length - 1][1] + dy]);

        var i = 1,
            temp = "M" + expandArray[1][0] + " " + expandArray[1][1] + " ";
        for (; i < expandArray.length - 2; i++) {
            temp = painter(
                function (dx) {
                    return catmullRom(expandArray.slice(i - 1, i + 3), dx);
                }, 0, 1 / scope.d, temp);
        }
        return temp;
    };

    polygon.setD = function (dis) {
        //设置进度（即将p1,p2两点间的曲线段分成的段数）
        scope.d = dis;
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
                obj._p.beginPath();
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
