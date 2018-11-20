QUnit.test('XOY旋转', 1, function () {

    var rotate2D = clay.rotate(2, 1, Math.PI, 2, 0);
    ok(rotate2D[0] == 2 && rotate2D[1] == 2, '2D旋转');

});
