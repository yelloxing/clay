QUnit.test('线性刻度尺', 6, function () {

	var linear = clay.ruler.linear().domain([0, 8]).range([1, 57]);
	equal(linear(0), 1, '获取值域值1');
	equal(linear(8), 57, '获取值2');
	equal(linear(1), 8, '获取值3');

	equal(linear.getDomain(1), 0, '获取定义域值1');
	equal(linear.getDomain(57), 8, '获取定义域值2');
	equal(linear.getDomain(8), 1, '获取定义域值3');

});
