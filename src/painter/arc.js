// 2D弧
var _arc = function (type, painter) {

	var scope = {
		c: [0, 0]
	};

	var arc = function () {

		// svg作为画板
		if (type === 'svg') {
			return painter();
		}
		// canvas作为画板
		else {
			return painter();
		}

	};

	// 设置弧中心
	arc.setCenter = function (x, y) {

		if (typeof x !== 'number' || typeof y !== 'number')
			throw new Error('Unsupported data!');
		scope.c = [x, y];
		return arc;

	};

	return arc;

};
