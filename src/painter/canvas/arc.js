clay.canvas.arc = function (selector, config) {

	var key,
		obj = _canvas(selector, config, _line, function () {

			for (key in obj._config)
				obj._painter[key] = obj._config[key];

			return obj._painter;

		});

	return obj;

};
