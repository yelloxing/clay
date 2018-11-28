QUnit.test('XOY旋转', 1, function () {

    var rotate2D = clay.rotate(2, 1, Math.PI, 2, 0);
    ok(rotate2D[0] == 2 && rotate2D[1] == 2, '2D旋转');

});


QUnit.test('XOY移动', 1, function () {

    var move2D = clay.move(3, 4, 5, 1, 2);
    ok(move2D[0] == 4 && move2D[1] == 6, '2D移动');

});

QUnit.test('XOY缩放', 2, function () {

    var scale2D = clay.scale(3, 4, 5, 3, 4);
    ok(scale2D[0] == 3 && scale2D[1] == 4, '2D缩放（缩放中心和原坐标一致）');

    scale2D = clay.scale(3, 4, 2, 0, 0);
    ok(scale2D[0] == -3 && scale2D[1] == -4, '2D缩放');

});
