// 2D弧
var _arc = function (painter) {

	var scope = {
		c: [0, 0],
		r: [100, 140]
	},
		// 辅助计算的旋转对象
		rotate = clay.math.rotate().setL(0, 0);

	// r1和r2，内半径和外半径
	// beginA起点弧度，rotateA旋转弧度式
	var arc = function (beginA, rotateA, r1, r2) {

		if (typeof r1 !== 'number') r1 = scope.r[0];
		if (typeof r2 !== 'number') r2 = scope.r[1];

		var temp = [], p;

		// 内部
		rotate.setP(scope.c[0] + r1, scope.c[1]);
		p = rotate(beginA, true);
		temp[0] = p[0];
		temp[1] = p[1];
		p = rotate(rotateA);
		temp[2] = p[0];
		temp[3] = p[1];

		// 外部
		rotate.setP(scope.c[0] + r2, scope.c[1]);
		p = rotate(beginA, true);
		temp[4] = p[0];
		temp[5] = p[1];
		p = rotate(rotateA);
		temp[6] = p[0];
		temp[7] = p[1];

		return painter(
			scope.c[0], scope.c[1],
			r1, r2,
			beginA, beginA + rotateA,
			temp[0], temp[1],
			temp[4], temp[5],
			temp[2], temp[3],
			temp[6], temp[7]
		);
	};

	// 设置内外半径
	arc.setRadius = function (r1, r2) {

		scope.r = [r1, r2];
		return arc;

	};

	// 设置弧中心
	arc.setCenter = function (x, y) {

		rotate.setL(x, y);
		scope.c = [x, y];
		return arc;

	};

	return arc;

};
