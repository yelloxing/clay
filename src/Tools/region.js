// 用特定色彩绘制区域
var _drawerRegion = function (pen, color, drawback, regionManger) {
    pen.beginPath();
    pen.fillStyle = color;
    pen.strokeStyle = color;
    if (typeof drawback != "function") return pen;
    drawback(pen);
    return regionManger;
};

// 区域对象，用于存储区域信息
// 初衷是解决类似canvas交互问题
// 可以用于任何标签的区域控制
_clay_prototype.region = function (width, height) {

    var regions = {},//区域映射表
        canvas = document.createElement('canvas'),
        rgb = [0, 0, 0],//区域标识色彩,rgb(0,0,0)表示空白区域
        p = 'r';//色彩增值位置

    if (!_is_number(width)) width = this[0].offsetWidth;//内容+内边距+边框
    if (!_is_number(height)) height = this[0].offsetHeight;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    var _this = this;

    // 用于计算包含关系的画板
    var canvas2D = canvas.getContext("2d"),

        regionManger = {

            // 绘制（添加）区域范围
            /**
             * region_id：区域唯一标识（一个标签上可以维护多个区域）
             * type：扩展区域类型
             * data：区域位置数据
             */
            "drawer": function (region_id, drawback) {
                if (regions[region_id] == undefined) regions[region_id] = {
                    'r': function () {
                        rgb[0] += 1;
                        p = 'g';
                        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                    },
                    'g': function () {
                        rgb[1] += 1;
                        p = 'b';
                        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                    },
                    'b': function () {
                        rgb[2] += 1;
                        p = 'r';
                        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                    }
                }[p]();
                return _drawerRegion(canvas2D, regions[region_id], drawback, regionManger);
            },

            // 擦除区域范围
            "erase": function (drawback) {
                // 如果没有传递擦除方法
                // 擦除全部
                if (!_is_function(drawback)) drawback = function (pen) {
                    pen.clearRect(0, 0, width, height);
                };
                return _drawerRegion(canvas2D, 'rgb(0,0,0)', drawback, regionManger);
            },

            // 获取此刻鼠标所在区域
            "getRegion": function (event) {
                var pos = _this.position(event), i;
                pos.x -= _this.css('border-left-width').replace('px', '');
                pos.y -= _this.css('border-top-width').replace('px', '');
                var currentRGBA = canvas2D.getImageData(pos.x - 0.5, pos.y - 0.5, 1, 1).data;
                for (i in regions) {
                    if ("rgb(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + ")" == regions[i]) {
                        return [i, pos.x, pos.y];
                    }
                }
                return undefined;
            }
        };

    return regionManger;

};
