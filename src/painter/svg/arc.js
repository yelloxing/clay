clay.svg.arc = function () {

	return _arc(
		// 圆心（cx,cy）
		// 内半径，外半径
		// 开始弧度，结束弧度
		function (
			cx, cy,
			rmin, rmax,
			beginA, endA,
			begInnerX, begInnerY,
			begOuterX, begOuterY,
			endInnerX, endInnerY,
			endOuterX, endOuterY
		) {

			var f = (endA - beginA) > Math.PI ? 1 : 0,
				d = "M" + begInnerX + " " + begInnerY;
			d +=
				// 横半径 竖半径 x轴偏移角度 0小弧/1大弧 0逆时针/1顺时针 终点x 终点y
				"A" + rmin + " " + rmin + " 0 " + f + " 1 " + endInnerX + " " + endInnerY;
			d += "L" + endOuterX + " " + endOuterY;
			d += "A" + rmax + " " + rmax + " 0 " + f + " 0 " + begOuterX + " " + begOuterY;
			d += "L" + begInnerX + " " + begInnerY;

			return d;

		});

};
