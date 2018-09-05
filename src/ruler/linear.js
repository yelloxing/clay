// 线性刻度尺
clay.ruler.linear = function () {

	var scope = {};

	// 返回定义域的值对应的值域的值
	var linear = function (domain) {

		if (typeof domain === 'number')
			if (!scope.scaleCalc)
				throw new Error('You shoud first set the domain and range!');
			else if (domain <= scope.domains[0])
				return scope.ranges[0];
			else if (domain >= scope.domains[1])
				return scope.ranges[1];
			else
				return (domain - scope.domains[0]) * scope.scaleCalc + scope.ranges[0];
		else
			throw new Error('A number is required!');


	};

	linear.getDomain = function (range) {

		if (typeof range === 'number')
			if (!scope.scaleCalc)
				throw new Error('You shoud first set the domain and range!');
			else if (range <= scope.ranges[0])
				return scope.domains[0];
			else if (range >= scope.ranges[1])
				return scope.domains[1];
			else
				return (range - scope.ranges[0]) / scope.scaleCalc + scope.domains[0];
		else
			throw new Error('A number is required!');

	};

	// 设置或者获取定义域
	linear.domain = function (domains) {

		if (domains.constructor === Array && domains.length >= 2)
			scope.domains = domains;
		else
			return scope.domains;

		// 如果定义域和值域都已经设置
		// 更新计算方法
		if (scope.ranges)
			scope.scaleCalc = (scope.ranges[1] - scope.ranges[0]) / (scope.domains[1] - scope.domains[0]);
		return linear;

	};


	// 设置或者获取值域
	linear.range = function (ranges) {

		if (ranges.constructor === Array && ranges.length >= 2)
			scope.ranges = ranges;
		else
			return scope.ranges;

		// 如果定义域和值域都已经设置
		// 更新计算方法
		if (scope.domains)
			scope.scaleCalc = (scope.ranges[1] - scope.ranges[0]) / (scope.domains[1] - scope.domains[0]);
		return linear;

	};

	return linear;

};
