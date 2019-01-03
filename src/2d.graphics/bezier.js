// 贝塞尔曲线
var _bezier = function (painter) {

    var scope = {},

        /**
         * 绘制贝塞尔曲线（主要是连接关系点的时候用）
         * @param {number} bx 起点坐标(bx,by)
         * @param {number} by
         * @param {number} ex 终点坐标(ex,ey)
         * @param {number} ey
         */
        bezier = function (bx, by, ex, ey) {
            var bdirection, edirection;
            if (scope.t[2] == 'normal') {
                bdirection = [scope.t[0], scope.t[1]];
                edirection = [-scope.t[0], -scope.t[1]];
            } else if (scope.t[2] == 'circle') {
                bdirection = [bx - scope.t[0], by - scope.t[1]];
                if (
                    (scope.t[0] - bx) * (scope.t[0] - bx) + (scope.t[1] - by) * (scope.t[1] - by) ==
                    (scope.t[0] - ex) * (scope.t[0] - ex) + (scope.t[1] - ey) * (scope.t[1] - ey)
                )
                    bdirection = [scope.t[0] - bx, scope.t[1] - by];
                else
                    bdirection = [bx - scope.t[0], by - scope.t[1]];
                edirection = [scope.t[0] - ex, scope.t[1] - ey];
            } else {
                throw new Error('Illegal type!');
            }
            return painter(
                [bx, by], //起点
                [ex, ey], //终点
                clay.move(bdirection[0], bdirection[1], scope.l, bx, by), //起点控制点
                clay.move(edirection[0], edirection[1], scope.l, ex, ey) //终点控制点
            );
        };

    // 设置曲线类型，可选类型有二种：
    // 1.type="normal",(dx,dy)是参考方向
    // 2.type="circle",(dx,dy)是参考中心
    // 缺省类型是"normal"
    bezier.setType = function (dx, dy, type) {
        if (!type) type = 'normal';
        scope.t = [dx, dy, type];
        return bezier;
    };

    // 设置控制把柄的长度
    bezier.setL = function (length) {
        scope.l = length;
        return bezier;
    };

    return bezier;

};

// 采用SVG绘制贝塞尔曲线
clay.svg.bezier = function () {
    return _bezier(
        function (
            beginP, endP, beginCtrlP, endCtrlP
        ) {
            return "M" + beginP[0] + "," + beginP[1] + " " +
                "C" + beginCtrlP[0] + "," + beginCtrlP[1] + " " +
                endCtrlP[0] + "," + endCtrlP[1] + " " +
                endP[0] + "," + endP[1];
        }
    );
};

// 采用Canvas绘制贝塞尔曲线
clay.canvas.bezier = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _bezier, function (
                beginP, endP, beginCtrlP, endCtrlP
            ) {
                obj._p.beginPath();
                obj._p.moveTo(beginP[0], beginP[1]);
                obj._p.bezierCurveTo(
                    beginCtrlP[0],// 第一个贝塞尔控制点的 x 坐标
                    beginCtrlP[1],// 第一个贝塞尔控制点的 y 坐标
                    endCtrlP[0],// 第二个贝塞尔控制点的 x 坐标
                    endCtrlP[1],// 第二个贝塞尔控制点的 y 坐标
                    endP[0], endP[1]);
                return obj._p;

            });

    return obj;

};
