// 投影
// 这里采用右手坐标系
// https://www.codeguru.com/cpp/misc/misc/graphics/article.php/c10123/Deriving-Projection-Matrices.htm
// -1<=x<=1
// -1<=y<=1
// -1<=z<=1

// 一点透视
// 物体限制在四棱锥中
var _perspective_projection = function (
    // 裁剪面边界
    left, right, top, bottom,
    // 近裁剪面和远裁剪面
    near, far
) {
    // 特别注意：求出的新坐标为（x'z,y'z,z'z,z）
    return [
        2 * near / (right - left), 0, 0, 0,
        0, 2 * near / (top - bottom), 0, 0,
        (left + right) / (left - right),
        (bottom + top) / (bottom - top),
        (far + near) / (near - far),
        1,
        0, 0, far * far * 2 / (near - far), 0
    ];
};

// 正交投影
// 投影向量和观察平面垂直
// 物体坐标沿观察坐标系的z轴平行投影到观察平面上
// 观察点和观察平面间的距离不会影响物体的投影大小
// 取景范围是一个长方体
// 只有在这个长方体中的景物才会被绘制出来
var _orthogonal_projection = function (
    // 裁剪面边界
    left, right, top, bottom,
    // 近裁剪面和远裁剪面
    near, far
) {
    return [
        2 / (right - left), 0, 0, 0,
        0, 2 / (top - bottom), 0, 0,
        0, 0, 2 / (near - far), 0,
        (right + left) / (left - right),
        (top + bottom) / (bottom - top),
        (far + near) / (far - near),
        1
    ];
};
