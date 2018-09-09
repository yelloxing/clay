// config采用canvas设置属性的api
// 这二个参数不是必输项
// 绘制前再提供下面提供的方法设置也是可以的
clay.canvas.line = function (_selector, config) {
	config = config || {};
	var painter = _selector && _selector.constructor === CanvasRenderingContext2D ? _selector : clay(_selector)[0].getContext("2d"),
		key;
	var temp = _line({
		init: function (x, y) {
			painter.moveTo(x, y);
			return painter;
		},
		draw: function (painter, x, y) {
			painter.lineTo(x, y);
			return painter;
		},
		end: function (painter) {
			for (key in config)
				painter[key] = config[key];
			painter.stroke();
			return painter;
		}
	});

	// 设置画笔
	temp.canvas = function (selector) {
		painter = selector && selector.constructor === CanvasRenderingContext2D ? selector : clay(selector)[0].getContext("2d");
		return temp;
	};

	// 配置画笔
	temp.config = function (_config) {
		for (key in _config)
			config[key] = _config[key];
		return temp;
	};

	return temp;

};
