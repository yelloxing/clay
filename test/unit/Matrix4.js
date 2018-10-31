QUnit.test('旋转矩阵', 3, function () {

    var rotate2D = clay.Matrix4().rotate(Math.PI / 2, 2, 1).use(2, 0);
    ok(rotate2D[0] == 3 && rotate2D[1] == 1 && rotate2D[2] == 0, '2D旋转');

    var rotateLine = clay.Matrix4().rotate(Math.PI / 3 * 2, 1, 1, 1).use(0, 1, 0);
    ok(rotateLine[0] == 0 && rotateLine[1] == 0 && rotateLine[2] == 1, '来自圆心的射线旋转');

    var rotate3D = clay.Matrix4().rotate(Math.PI / 3 * 4, 1, 0, 1, 2, 1, 2).use(1, 1, 1);
    ok(rotate3D[0] == 2 && rotate3D[1] == 0 && rotate3D[2] == 1, '任意射线旋转');

});

QUnit.test('缩放矩阵', 1, function () {

    var scale = clay.Matrix4().scale(1, 2, 7, 3, 4, 1).use(0, 0, 1);
    ok(scale[0] == 0 && scale[1] == -4 && scale[2] == 1, '立体缩放');

});

QUnit.test('移动矩阵', 2, function () {

    var move2D = clay.Matrix4().move(5, 3, 4).use(1, 2);
    ok(move2D[0] == 4 && move2D[1] == 6, '平面移动');

    var move3D = clay.Matrix4().move(5, 3, 4, 0).use(1, 1, 1);
    ok(move3D[0] == 4 && move3D[1] == 5 && move3D[2] == 1, '立体移动');

});

QUnit.test('多变换矩阵', 1, function () {

    var multiTransform = clay.Matrix4().scale(0.5, 0.5, 0.5, 1, 0, 0).move(Math.sqrt(14), -1, -2, -3).rotate(Math.PI / 3 * 4, 1, 0, 1, 2, 1, 2).use(3, 6, 8);
    ok(multiTransform[0] == 2 && multiTransform[1] == 0 && multiTransform[2] == 1, '缩放-》移动-》旋转');

});
