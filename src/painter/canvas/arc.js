clay.canvas.arc = function (selector, config) {

	var key,
		obj =
			// 返回画扇形图的流程控制函数
			// 并且返回的函数挂载了canvas特有的方法和属性
			// 因此称之为基本的canvas对象
			_canvas(selector, config, _arc, function (
				cx, cy,
				rmin, rmax,
				beginA, endA,
				begInnerX, begInnerY,
				begOuterX, begOuterY,
				endInnerX, endInnerY,
				endOuterX, endOuterY
			) {

				obj._painter.moveTo(begInnerX, begInnerY);
				obj._painter.arc(
					// (圆心x，圆心y，半径，开始角度，结束角度，true逆时针/false顺时针)
					cx, cy, rmin, beginA, endA, false);
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
