clay.canvas.arcRuler = function (selector, config) {

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

                // 绘制刻度
                clay.canvas.arc(obj._painter, {
                    'fillStyle': color
                })
                    .setCenter(pageini.cx, pageini.cy)
                    (value - size / 2, size, pageini.radius - rightWidth, pageini.radius + leftWidth);

                return obj._painter;

            });

    return obj;

};
