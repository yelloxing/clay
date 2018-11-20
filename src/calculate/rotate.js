/**
 * 点（x,y）围绕中心（cx,cy）旋转deg度
 */
clay.rotate = function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        ((x - cx) * cos - (y - cy) * sin + cx) * 100000000000000 / 100000000000000,
        ((x - cx) * sin + (y - cy) * cos + cy) * 100000000000000 / 100000000000000
    ];
};
