clay.canvas.arc = function (selector, config) {

	var key,
		obj = _canvas(selector, config, _arc, function (
			cx, cy,
			rmin, rmax,
			beginA, endA,
			begInnerX, begInnerY,
			begOuterX, begOuterY,
			endInnerX, endInnerY,
			endOuterX, endOuterY
		) {

			obj._painter.moveTo(begInnerX, begInnerY);
			obj._painter.arc(cx, cy, rmin, beginA, endA, false);
			obj._painter.lineTo(endOuterX, endOuterY);
			obj._painter.arc(cx, cy, rmax, endA, beginA, true);
			obj._painter.lineTo(begInnerX, begInnerY);

			for (key in obj._config)
				obj._painter[key] = obj._config[key];
			obj._painter.fill();
			return obj._painter;

		});

	return obj;

};
