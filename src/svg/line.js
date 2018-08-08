(function (window, undefined) {

    'use strict';

    // 返回计算线条路径函数
    window.quickES.svg.line = function () {

        var scope = {
            interpolate: 'line'
        };

        // 输入多个点的位置数据，返回对应的path标签的d属性值
        var line = function (points) {



        };

        // 设置曲线插值方法
        line.interpolate = function (type) {

            scope.interpolate = type;
            return line;

        };

        // 设置计算x坐标的函数
        line.x = function (xback) {

            if (typeof xback === 'function') {
                this.xback = xback;
            } else {
                throw new Error('Unsupported data!');
            }
            return line;

        };

        // 设置计算y坐标的函数
        line.y = function (yback) {

            if (typeof yback === 'function') {
                this.yback = yback;
            } else {
                throw new Error('Unsupported data!');
            }
            return line;

        };


        return line;

    };

})(typeof window !== "undefined" ? window : this);