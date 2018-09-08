// Cardinal三次插值
clay.math.cardinal = function () {

	var scope = { "t": 0 };

	// 根据x值返回y值
	var i;
	var cardinal = function (x) {

		if (scope.hs) {

			i = -1;
			while (i + 1 < scope.hs.x.length && (x > scope.hs.x[i + 1] || (i == -1 && x >= scope.hs.x[i + 1]))) {
				i += 1;
			}
			if (i == -1 || i >= scope.hs.h.length)
				throw new Error('Coordinate crossing!');
			return scope.hs.h[i](x);
		} else {
			throw new Error('You shoud first set the position!');
		}

	};

	// 设置张弛系数【应该在点的位置设置前设置】
	cardinal.setU = function (t) {

		if (typeof t === 'number') {
			scope.t = t;
		} else {
			throw new Error('Unsupported data!');
		}
		return cardinal;

	};

	// 设置点的位置
	// 参数格式：[[x,y],[x,y],...]
	// 至少二个点
	cardinal.setP = function (points) {

		scope.hs = {
			"x": [],
			"h": []
		};
		var flag,
			slope = (points[1][1] - points[0][1]) / (points[1][0] - points[0][0]),
			temp;
		scope.hs.x[0] = points[0][0];
		for (flag = 1; flag < points.length; flag++) {
			if (points[flag][0] <= points[flag - 1][0]) throw new Error('The point position should be increamented!');
			scope.hs.x[flag] = points[flag][0];
			// 求点斜率
			temp = flag < points.length - 1 ?
				(points[flag + 1][1] - points[flag - 1][1]) / (points[flag + 1][0] - points[flag - 1][0]) :
				(points[flag][1] - points[flag - 1][1]) / (points[flag][0] - points[flag - 1][0]);
			scope.hs.h[flag - 1] = clay.math.hermite().setU(scope.t).setP(points[flag - 1][0], points[flag - 1][1], points[flag][0], points[flag][1], slope, temp);
			slope = temp;
		}
		return cardinal;

	};

	return cardinal;
};
