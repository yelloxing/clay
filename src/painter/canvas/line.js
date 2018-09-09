clay.canvas.line = function (selector, config) {

	var key,
		// 返回画线条的流程控制函数
		// 并且返回的函数挂载了canvas特有的方法和属性
		// 因此称之为基本的canvas对象
		obj = _canvas(selector, config, _line, {
			init: function (x, y) {
				obj._painter.moveTo(x, y);
				return obj._painter;
			},
			draw: function (painter, x, y) {
				painter.lineTo(x, y);
				return painter;
			},
			end: function (painter) {
				for (key in obj._config)
					painter[key] = obj._config[key];
				painter.stroke();
				return painter;
			}
		});

	return obj;

};
