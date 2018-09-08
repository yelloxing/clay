// 绘制任意2D曲线
clay.svg.line = function () {

	var scope = {
		interpolate: 'line',
		dis: 5,
		t: 0
	};

	// points代表曲线的点集合[[x,y],[x,y],...]
	// flag可以不传递，默认false，表示y坐标轴方向和数学上保存一致
	// 只有在设置为true的时候，才会使用浏览器的方式
	var line = function (points, flag) {

		if (typeof scope.h === 'number') {
			var cardinal, i,
				d = "M" + points[0][0] + " " + (flag ? points[0][1] : scope.h - points[0][1]) + "L";

			// cardinal插值法，目前只支持函数
			if (scope.interpolate === 'cardinal') {
				cardinal = clay.math.cardinal().setU(scope.t).setP(points);
				for (i = points[0][0] + scope.dis; i < points[points.length - 1][0]; i += scope.dis)
					d += i + " " + (flag ? cardinal(i) : scope.h - cardinal(i)) + ",";
			}

			// 默认或错误设置都归结为line
			else {
				for (i = 1; i < points.length; i++)
					d += points[i][0] + " " + (flag ? points[i][1] : scope.h - points[i][1]) + ",";
			}

			d = d.replace(/,$/, '');
			// 返回d属性的路径字符串
			return d;
		} else {
			throw new Error('You need to set the height first!');
		}

	};

	// 设置所在组的高
	// 参数应该是一个数字
	line.setHeight = function (height) {

		if (typeof height !== 'number' || height <= 0)
			throw new Error('Unsupported data!');
		scope.h = height;
		return line;

	};

	// 设置张弛系数
	line.setT = function (t) {

		if (typeof t === 'number') {
			scope.t = t;
		} else {
			throw new Error('Unsupported data!');
		}
		return line;

	};

	// 设置精度
	line.setPrecision = function (dis) {

		if (typeof dis === 'number') {
			scope.dis = dis;
		} else {
			throw new Error('Unsupported data!');
		}
		return line;

	};

	// 设置曲线插值方法
	line.interpolate = function (type) {

		scope.interpolate = type;
		return line;

	};

	return line;

};
