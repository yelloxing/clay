(function (window, clay, undefined) {

    'use strict';

    clay.prototype.extend({

        // 鼠标悬浮提示的canvas旋转统计图
        "barPolar": function (config) {

            var data = {
                "keys": config.keys,
                "vals": [],
                "cx": config.cx,
                "cy": config.cy,
                "R": config.R,
                "start": config.start,
                "direction": config.direction ? 1 : -1,
                "max": 0
            }, i, j;

            // 求值
            for (i in config.vals) {
                j = config.max(config.vals[i]);
                data.vals.push({
                    "min": config.min(config.vals[i]),
                    "max": j,
                    "average": config.average(config.vals[i])
                });
                if (j > data.max) data.max = j;
            }

            // 计算每个条目的位置
            var deg = Math.PI * 2 / data.vals.length;
            for (i = 0; i < data.vals.length; i++) {
                // 角度、内外半径
                data.vals[i].deg = data.start + deg * data.direction * (i + 0.5);
                data.vals[i].minR = data.vals[i].min / data.max * data.R;
                data.vals[i].maxR = data.vals[i].max / data.max * data.R;
                data.vals[i].averageR = data.vals[i].average / data.max * data.R;
            }

            var layer = clay.canvas.layer(this, data.cx * 2, data.cy * 2),
                // 温馨提示：后获取的图层在上层
                painter_other = layer.get('other'),
                painter_arc = layer.get('arc'),
                painter_average = layer.get('average'),
                painter_info = layer.get('info');

            // 画圆形刻度尺
            var circleRuler = clay.canvas.arcRuler(painter_other).set({
                "bigLeft": 10,
                "bigSize": 0.005,
                "num": data.vals.length,
                "cx": data.cx,
                "cy": data.cy,
                "radius": data.R
            });
            circleRuler(data.start, data.start + Math.PI * 2);
            painter_other.beginPath();
            painter_other.arc(data.cx, data.cy, data.R, 0, Math.PI * 2);
            painter_other.stroke();

            painter_other.strokeStyle = '#ccc';
            for (i = 1; i < 5; i++) {
                painter_other.beginPath();
                painter_other.arc(data.cx, data.cy, data.R / 5 * i, 0, Math.PI * 2);
                painter_other.stroke();
            }

            // 标记刻度
            var rotate = clay.math.rotate()
                .setP(data.cx, data.cy - data.R - 30)
                .setL(data.cx, data.cy), p;
            rotate(deg * (-0.5), true);
            painter_other.textAlign = 'center';//左右居中
            painter_other.textBaseline = 'middle';//上下居中
            painter_other.strokeStyle = '#000';
            for (i = 0; i < data.keys.length; i++) {
                p = rotate(deg, true);
                painter_other.strokeText(data.keys[i], p[0], p[1]);
            }

            // 垂直刻度尺
            painter_other.fillStyle = '#000';
            var lineRuler = clay.canvas.lineRuler(painter_other).set({
                "bigRight": 10,
                "bigSize": 1,
                "num": 5,
                "direction": "vertical",
                "seat": data.cx
            });
            lineRuler(data.cy, data.cy - data.R);
            painter_other.beginPath();
            painter_other.moveTo(data.cx, data.cy);
            painter_other.lineTo(data.cx, data.cy - data.R);
            painter_other.stroke();

            // 标记刻度
            painter_other.textAlign = 'right';
            for (i = 0; i < 6; i++)
                painter_other.strokeText(data.max / 5 * i, data.cx - 15, data.cy - (data.R / 5) * i);

            // 绘制区域扇形
            var arc = $$.canvas.arc(painter_arc, {
                fillStyle: "#b2453e"
            }).setCenter(data.cx, data.cy);

            deg = deg * .8;
            clay.animation(function (deep) {
                layer.clean(painter_arc);
                for (i = 0; i < data.vals.length; i++) {
                    painter_arc.beginPath();
                    arc(data.vals[i].deg - deg * deep / 2, deg * deep, data.vals[i].minR * deep, (data.vals[i].maxR - data.vals[i].minR) * deep + data.vals[i].minR);
                }
                layer.update();
            }, 1000, function () {
                // 绘制平均值
                arc.canvas(painter_average).config({
                    fillStyle: "#334553"
                });
                for (i = 0; i < data.vals.length; i++) {
                    painter_average.beginPath();
                    arc(data.vals[i].deg - deg / 2, deg, data.vals[i].averageR - 2, data.vals[i].averageR + 2);
                }
                layer.update();
            });

        }

    });

})(window, window.clay);
