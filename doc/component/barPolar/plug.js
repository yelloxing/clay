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
                "max": 0,
                "during": config.during || 1000,
                "text": [],
                "textMaxChart": [],
                "valColor": config.valColor || "#b2453e",
                "averageColor": config.averageColor || "#334553"
            }, i, j, k, temp;

            // 求值
            for (i in config.vals) {
                j = config.max(config.vals[i]);
                data.vals.push({
                    "min": config.min(config.vals[i]),
                    "max": j,
                    "average": config.average(config.vals[i])
                });
                if (config.text) {
                    data.textMaxChart[i] = 0;
                    data.text.push(config.text(config.vals[i], config.keys[i]));
                    for (k = 0; k < data.text[i].length; k++) {
                        temp = data.text[i][k].replace(/[\u0391-\uFFE5]/g, "aa").length / 2;
                        if (temp > data.textMaxChart[i]) {
                            data.textMaxChart[i] = temp;
                        }
                    }
                }

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
                .setP(data.cx + data.R + 30, data.cy)
                .setL(data.cx, data.cy), p;
            rotate(data.start + deg * (-0.5), true);
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
                "bigLeft": 10,
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
                fillStyle: data.valColor
            }).setCenter(data.cx, data.cy);

            deg = deg * .8;
            var _this = this, cos1, cos2, sin1, sin2;
            clay.animation(function (deep) {
                layer.clean(painter_arc);
                for (i = 0; i < data.vals.length; i++) {
                    painter_arc.beginPath();
                    arc(data.vals[i].deg - deg * deep / 2, deg * deep, data.vals[i].minR * deep, (data.vals[i].maxR - data.vals[i].minR) * deep + data.vals[i].minR * deep);
                }
                layer.update();
            }, data.during, function () {

                // 绘制平均值
                arc.canvas(painter_average).config({
                    fillStyle: data.averageColor
                });
                for (i = 0; i < data.vals.length; i++) {
                    painter_average.beginPath();
                    arc(data.vals[i].deg - deg / 2, deg, data.vals[i].averageR - 2, data.vals[i].averageR + 2);

                    // 记录边界sin和cos值
                    cos1 = Math.cos(data.vals[i].deg - deg / 2);
                    cos2 = Math.cos(data.vals[i].deg - deg / 2 + deg);
                    sin1 = Math.sin(data.vals[i].deg - deg / 2);
                    sin2 = Math.sin(data.vals[i].deg - deg / 2 + deg);
                    if (cos1 > cos2) {
                        data.vals[i].cos1 = cos2; data.vals[i].cos2 = cos1;
                    } else { data.vals[i].cos1 = cos1; data.vals[i].cos2 = cos2; }
                    if (sin1 > sin2) {
                        data.vals[i].sin1 = sin2; data.vals[i].sin2 = sin1;
                    } else { data.vals[i].sin1 = sin1; data.vals[i].sin2 = sin2; }
                }
                layer.update();

                if (data.text) {
                    var pos, width, height, d2, cos, sin;

                    var showText = function (x, y, texts, num) {
                        x += 10;
                        y += 10;
                        height = texts.length * 16 + 8;
                        width = num * 16;
                        painter_info.beginPath();
                        painter_info.rect(x, y, width, height);
                        painter_info.fill();
                        for (i = 0; i < texts.length; i++)
                            painter_info.strokeText(texts[i], x + 8, y + i * 16 + 7 + 4);
                    }

                    painter_info.textBaseline = 'middle';//上下居中
                    painter_info.fillStyle = 'rgba(120,120,120,.7)';
                    painter_info.strokeStyle = 'rgb(250,250,250)';
                    _this.bind('mousemove', function (event) {
                        layer.clean(painter_info);

                        event = event || window.event;
                        pos = _this.position(event);

                        d2 = Math.sqrt((pos.x - data.cx) * (pos.x - data.cx) + (pos.y - data.cy) * (pos.y - data.cy));
                        cos = (pos.x - data.cx) / d2;
                        sin = (pos.y - data.cy) / d2;

                        for (i = 0; i < data.vals.length; i++) {

                            if (
                                data.vals[i].cos1 <= cos && cos <= data.vals[i].cos2 &&
                                data.vals[i].sin1 <= sin && sin <= data.vals[i].sin2
                            ) {
                                if (d2 >= data.vals[i].minR && d2 <= data.vals[i].maxR) {
                                    showText(pos.x, pos.y, data.text[i], data.textMaxChart[i]);
                                    _this.css('cursor', 'pointer');
                                }
                                break
                            }
                            _this.css('cursor', 'auto');
                        }

                        layer.update();
                    });
                }

            });

        }

    });

})(window, window.clay);
