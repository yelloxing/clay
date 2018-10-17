(function (window, clay, undefined) {

    'use strict';

    clay.prototype.extend({

        // 地图展示区域信息，悬浮canvas提供统计数据
        "mapData": function (config) {

            var map = clay.scale.map()
                .center(config.longitude, config.latitude)
                .scale(config.s), i, j, k, pen, features, pos,

                // 获取图层管理者
                layer = clay.canvas.layer(this, config.cx * 2, config.cy * 2);

            var colors = clay.getColors(config.geoJSON.features.length);

            var colorsJSON = {};
            for (i = 0; i < colors.length; i++) colorsJSON[colors[i]] = i;

            // 具体的根据经纬度集合绘制区域地图
            function drawer(canvas2D, coordinates) {
                canvas2D.beginPath();
                pos = map(coordinates[0][0], coordinates[0][1]);
                canvas2D.moveTo(pos[0] + config.cx, pos[1] + config.cy);
                for (k = 1; k < coordinates.length; k++) {
                    pos = map(coordinates[k][0], coordinates[k][1]);
                    canvas2D.lineTo(pos[0] + config.cx, pos[1] + config.cy);
                }
                canvas2D.fill();
                canvas2D.stroke();
            }

            // 绘制地图
            for (i = 0; i < config.geoJSON.features.length; i++) {
                features = config.geoJSON.features[i];
                pen = layer.get(config.id(features));
                pen.strokeStyle = '#fff';
                pen.fillStyle = colors[i];
                if (features.geometry.type == 'Polygon')
                    drawer(pen, features.geometry.coordinates[0]);
                else if (features.geometry.type == 'MultiPolygon')
                    for (j = 0; j < features.geometry.coordinates.length; j++)
                        drawer(pen, features.geometry.coordinates[j][0]);
            }

            // 绘制区域名称
            pen = layer.get('nameLayer');
            pen.textAlign = 'left';
            pen.textBaseline = 'middle';
            pen.fillStyle = '#000';
            pen.strokeStyle = '#f00';
            pen.font = '12px Arial';
            for (i = 0; i < config.geoJSON.features.length; i++) {
                features = config.geoJSON.features[i];
                pos = map(config.center(features)[0], config.center(features)[1]);
                pen.fillText(config.name(features), pos[0] + config.cx + 10, pos[1] + config.cy);
                pen.beginPath();
                pen.arc(pos[0] + config.cx, pos[1] + config.cy, 2, 0, Math.PI * 2);
                pen.stroke();
            }

            layer.update();

            // 鼠标悬浮
            if (config.text) {
                var _pen = layer.get('info');
                _pen.textBaseline = 'middle';
                var _this = this, rgba, temp, len, tempLen, height, width;
                var showText = function (x, y, texts, num) {
                    x += 10;
                    y += 10;
                    height = texts.length * 16 + 8;
                    width = num * 16;
                    _pen.beginPath();
                    _pen.rect(x, y, width, height);
                    _pen.fillStyle = 'rgba(120,120,120,.7)';
                    _pen.fill();
                    _pen.fillStyle = 'rgb(250,250,250)';
                    for (i = 0; i < texts.length; i++)
                        _pen.fillText(texts[i], x + 8, y + i * 16 + 7 + 4);
                }
                pen = _this[0].getContext('2d');
                _this.bind('mousemove', function (event) {
                    layer.clean(_pen);

                    event = event || window.event;
                    pos = _this.position(event);
                    rgba = pen.getImageData(pos.x - 0.5, pos.y - 0.5, 1, 1).data;
                    k = colorsJSON["rgb(" + rgba[0] + "," + rgba[1] + "," + rgba[2] + ")"];
                    if (k != undefined) {
                        _this.css('cursor', 'pointer');
                        temp = config.text(config.geoJSON.features[k]);
                        len = 0;
                        for (j = 0; j < temp.length; j++) {
                            // 计算中文长度
                            tempLen = temp[j].replace(/[\u0391-\uFFE5]/g, "aa").length / 2;
                            if (tempLen > len) len = tempLen;
                        }
                        // 调用方法绘制提示信息
                        showText(pos.x, pos.y, temp, len);
                    } else {
                        _this.css('cursor', 'auto');
                    }

                    layer.update();
                });
            }


        }

    });

})(window, window.clay);
