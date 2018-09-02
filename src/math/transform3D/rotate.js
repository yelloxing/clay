// 围绕任意射线旋转
// 旋转方向满足右手法则
clay.math.rotate = function () {

	var scope = {};

	var rotate = function () {

	};

	// 设置旋转射线
	// ax+by+cz+d=0
	rotate.setL = function () {


		return rotate;

	};

	// 设置点最初的位置
	rotate.setP = function (x, y, z) {

		if (typeof x !== 'number' || typeof y !== 'number') throw new Error('Unsupported data!');
		if (typeof z !== 'number') z = 0;

		return rotate;

	};

	return rotate;

};
