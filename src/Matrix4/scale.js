// 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
var scale = function (xTimes, yTimes, zTimes) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        xTimes, yTimes, zTimes, 1
    ];
};
