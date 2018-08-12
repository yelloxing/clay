(function (window, undefined) {

    'use strict';

    // 返回计算弧度路径函数
    window.clay.svg.arc = function () {

        var scope = {
            innerRadius: 0,
            outerRadius: 10
        };

        // 输入经过饼状图布局处理后的一个数据，返回对应的path标签的d属性值
        var arc = function (pieData, dis) {
            dis = typeof dis === 'number' ? dis : 0;
            var sinStartAngle = Math.sin(pieData.startAngle),
                sinEndAngle = Math.sin(pieData.endAngle),
                cosStartAngle = Math.cos(pieData.startAngle),
                cosEndAngle = Math.cos(pieData.endAngle);
            var startInnerX = cosStartAngle * scope.innerRadius + scope.outerRadius,
                startInnerY = sinStartAngle * scope.innerRadius + scope.outerRadius,
                startOuterX = (1 + cosStartAngle) * scope.outerRadius,
                startOuterY = (1 + sinStartAngle) * scope.outerRadius,
                endInnerX = cosEndAngle * scope.innerRadius + scope.outerRadius,
                endInnerY = sinEndAngle * scope.innerRadius + scope.outerRadius,
                endOuterX = (1 + cosEndAngle) * scope.outerRadius,
                endOuterY = (1 + sinEndAngle) * scope.outerRadius;
            // 移动计算
            if (dis != 0) {
                var a = startOuterX + endOuterX - startInnerX - endInnerX;
                var b = startOuterY + endOuterY - startInnerY - endInnerY;
                var x = a * dis / Math.sqrt(a * a + b * b);
                var y = b * x / a;
                startInnerX += x;
                startInnerY += y;
                startOuterX += x;
                startOuterY += y;
                endInnerX += x;
                endInnerY += y;
                endOuterX += x;
                endOuterY += y;
            }
            var angleDis = pieData.angle > Math.PI ? 1 : 0;
            return "M" + startInnerX + " " + startInnerY +
                "L" + startOuterX + " " + startOuterY +
                "A" + scope.outerRadius + " " + scope.outerRadius + " 0 " + angleDis + " 1 " + endOuterX + " " + endOuterY +
                "L" + endInnerX + " " + endInnerY +
                "A" + scope.innerRadius + " " + scope.innerRadius + " 0 " + angleDis + " 0 " + startInnerX + " " + startInnerY;
        };

        // 设置内半径
        arc.innerRadius = function (radius) {

            if (typeof radius === 'number' && radius < scope.outerRadius) {
                scope.innerRadius = radius;
            } else {
                throw new Error('Unsupported data!');
            }
            return arc;

        };

        // 设置外半径
        arc.outerRadius = function (radius) {

            if (typeof radius === 'number' && radius > scope.innerRadius) {
                scope.outerRadius = radius;
            } else {
                throw new Error('Unsupported data!');
            }
            return arc;

        };

        return arc;

    };

})(typeof window !== "undefined" ? window : this);