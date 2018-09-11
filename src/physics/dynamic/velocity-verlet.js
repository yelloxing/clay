// 速度verlet
// 下一时刻的位置只依赖于当前时刻的位置、速度 和 加速度
var _velocityVerlet = function () {

	var scope = {
		p: [],
		v: [],
		a: []
	}, flag, a;

	// 传递时间差，获取下一刻位置
	var verlet = function (dt, aback) {

		// 具体格式使用泰勒展开（在dt处展开）
		// 然后对比f(t+dt)和f(t)即可推导出
		for (flag = 0; flag < scope.p.length; flag++) {
			scope.p[flag] = scope.p[flag] + scope.v[flag] * dt + 0.5 * scope.a[flag] * dt * dt;
		}
		// 前一刻加速度保留一下
		a = scope.a;
		// 下一刻加速度需要依赖具体环境的受力得出
		// 传递下一刻位置
		// 由外界给出方法计算
		scope.a = aback(scope.p);
		for (flag = 0; flag < scope.p.length; flag++) {
			scope.v[flag] = scope.v[flag] + (a[flag] + scope.a[flag]) * 0.5 * dt;
		}
		return scope.p;

	};

	// 设置前一刻的位置，速度，加速度
	verlet.set = function (position, velocity, acceleration) {

		if (
			position && position.constructor === Array &&
			velocity && velocity.constructor === Array &&
			acceleration && acceleration.constructor === Array &&
			position.length == velocity.length && velocity.length == acceleration.length
		) {
			scope.p = position;
			scope.v = velocity;
			scope.a = acceleration;
		} else {
			throw new Error('Unsupported data!');
		}
		return verlet;

	};

	return verlet;

};
