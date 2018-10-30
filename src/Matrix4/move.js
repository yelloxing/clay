// 在x、y和z方向位移分别为dx、dy和dz
var move = function (dx, dy, dz) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        dx, dy, dz, 1
    ];
};
