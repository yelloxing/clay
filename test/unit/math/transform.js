QUnit.test('3D移动', 2, function () {

	var move2D = clay.math.move().setD(3, 4).setP(1, 2)(5);
	ok(move2D[0] == 4 && move2D[1] == 6, '平面移动');

	var move3D = clay.math.move().setD(3, 4, 0).setP(1, 1, 1)(5);
	ok(move3D[0] == 4 && move3D[1] == 5 && move3D[2] == 1, '立体移动');

});

QUnit.test('3D旋转', 1, function () {

	var rotate2D = clay.math.rotate().setL(2, 1).setP(2, 0)(Math.PI / 2);
	ok(rotate2D[0] == 3 && rotate2D[1] == 2 && rotate2D[2] == 0, '2D旋转');

});

QUnit.test('3D缩放', 1, function () {

	var scale = clay.math.scale().setC(3, 4, 1).setP(0, 0, 1)(2);
	ok(scale[0] == -3 && scale[1] == -4 && scale[2] == 1, '立体缩放');

});
