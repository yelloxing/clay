(function (window, undefined) {

    'use strict';

    // 把数据转换为方便画饼状图的数据
    window.clay.pieLayout = function () {

        var scope = {
            rotate: 0
        };

        // 根据数据返回角度值
        var pieLayout = function (datas) {

            if (scope.valueback) {
                if (datas && datas.constructor === Array) {
                    var temp = [], flag, total = 0, angle;
                    for (flag = 0; flag < datas.length; flag++) {
                        temp.push({
                            data: datas[flag],
                            value: scope.valueback(datas[flag], flag)
                        });
                        total += temp[flag].value;
                    }
                    for (flag = 0; flag < datas.length; flag++) {
                        angle = (temp[flag].value / total) * Math.PI * 2;
                        temp[flag].startAngle = flag == 0 ? scope.rotate : temp[flag - 1].endAngle;
                        temp[flag].endAngle = temp[flag].startAngle + angle;
                        temp[flag].angle=angle;
                    }
                    return temp;
                } else {
                    throw new Error('Unsupported data!');
                }
            } else {
                throw new Error('You shoud first set the valueback!');
            }

        };

        // 设置初始化旋转角度
        pieLayout.rotate = function (angle) {

            if (typeof angle === 'number') {
                scope.rotate = angle % (Math.PI * 2);
            } else {
                throw new Error('Unsupported data!');
            }
            return pieLayout;
        };

        // 保存计算条目值的函数
        pieLayout.value = function (valueback) {

            if (typeof valueback === 'function') {
                scope.valueback = valueback;
            } else {
                throw new Error('Unsupported data!');
            }
            return pieLayout;

        };

        return pieLayout;

    };

})(typeof window !== "undefined" ? window : this);