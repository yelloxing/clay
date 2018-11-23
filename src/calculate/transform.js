/**
 * 点（x,y）围绕中心（cx,cy）旋转deg度
 */
clay.rotate = function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        ((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        ((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};

/**
 * 点（x,y）沿着向量（ax,ay）方向移动距离d
 */
clay.move = function (ax, ay, d, x, y) {
    var sqrt = Math.sqrt(ax * ax + ay * ay);
    return [
        (ax * d / sqrt + x).toFixed(7),
        (ay * d / sqrt + y).toFixed(7)
    ];
};

/**
 * 点（x,y）围绕中心（cx,cy）缩放times倍
 */
clay.scale = function (cx, cy, times, x, y) {
    return [
        (times * (x - cx) + cx).toFixed(7),
        (times * (y - cy) + cy).toFixed(7)
    ];
};
