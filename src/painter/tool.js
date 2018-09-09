// 获取canvas2D对象
function _getCanvas2D(selector) {

	if (selector && selector.constructor === CanvasRenderingContext2D)
		return selector;
	else {
		var canvas = clay(selector);
		if (canvas.length > 0)
			return canvas[0].getContext("2d");
	}

}

// 基本的canvas对象
// config采用canvas设置属性的api
// 前二个参数不是必输项
// 绘制前再提供下面提供的方法设置也是可以的
// 第三个参数代表图形绘制控制方法
// 最后一个是配置给控制方法的参数
var _canvas = function (_selector, config, painterback, param) {

	var key, temp = painterback(param);
	temp._config = config || {};
	temp._painter = _getCanvas2D(_selector);

	// 获取画笔
	temp.canvas = function (selector) {
		temp._painter = _getCanvas2D(selector);
		return temp;
	};

	// 配置画笔
	temp.config = function (_config) {
		for (key in _config)
			temp._config[key] = _config[key];
		return temp;
	};

	return temp;

};
