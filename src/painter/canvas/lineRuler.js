clay.canvas.lineRuler = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _ruler, function (
                value,
                leftWidth, rightWidth, size,
                color,
                pageini
            ) {
                obj._painter.beginPath();
                for (key in obj._config)
                    obj._painter[key] = obj._config[key];

                obj._painter.fillStyle = color;

                // 绘制刻度
                if (pageini.direction === 'vertical') {
                    obj._painter.moveTo(pageini.seat - leftWidth, value - size / 2);
                    obj._painter.lineTo(pageini.seat + rightWidth, value - size / 2);
                    obj._painter.lineTo(pageini.seat + rightWidth, value + size / 2);
                    obj._painter.lineTo(pageini.seat - leftWidth, value + size / 2);
                } else {
                    obj._painter.moveTo(value - size / 2, pageini.seat - rightWidth);
                    obj._painter.lineTo(value + size / 2, pageini.seat - rightWidth);
                    obj._painter.lineTo(value + size / 2, pageini.seat + leftWidth);
                    obj._painter.lineTo(value - size / 2, pageini.seat + leftWidth);
                }

                obj._painter.closePath();
                obj._painter.fill();

                return obj._painter;

            });

    return obj;

};
