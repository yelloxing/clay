// 速度verlet
// 下一时刻的位置只依赖于当前时刻的位置、速度 和 加速度
var _velocityVerlet = {

	// 传递时间差，获取下一刻位置
	getP: function (p, v, a, dt) {
		// 具体格式使用泰勒展开（在dt处展开）
		// 然后对比f(t+dt)和f(t)即可推导出
		return p + v * dt + 0.5 * a * dt * dt;
	},

	// 获取下一刻速度
	// 当前时刻的位置、速度 和 加速度 时间差 下一刻加速度
	getV: function (p, v, a, dt, na) {
		return v + (a + na) * 0.5 * dt;
	}

};
