clay.svg.line = function () {

	return _line({
		init: function (x, y) {
			return "M" + x + " " + y + "L";
		},
		draw: function (d, x, y) {
			return d + "" + x + " " + y + ",";
		},
		end: function (d) {
			return d.replace(/,$/, '');
		}
	});

};
