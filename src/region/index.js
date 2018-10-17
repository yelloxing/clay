// 区域对象，用于存储区域信息
// 初衷是解决类似canvas交互问题
// 可以用于任何标签的区域控制
clay.region = function (selector, width, height) {

    var regions = {},//区域映射表
        canvas = document.createElement('canvas'),
        rgb = [0, 0, 0],//区域标识色彩,rgb(0,0,0)表示空白区域
        p = 'r';//色彩增值位置

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    var _this = clay(selector);

    // 用于计算包含关系的画板
    var canvas2D = canvas.getContext("2d"),

        regionManger = {

            // 绘制（添加）区域范围
            /**
             * region_id：区域唯一标识（一个标签上可以维护多个区域）
             * type：扩展区域类型
             * data：区域位置数据
             */
            "drawer": function (region_id, type, data) {
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
                }[p];
                drawerRegion(canvas2D, regions[region_id], type, data);
                return regionManger;
            },

            // 擦除区域范围
            "erase": function (type, data) {
                drawerRegion(canvas2D, 'rgb(0,0,0)', type, data);
                return regionManger;
            },

            // 在指定区域绑定事件
            "bind": function (region_id, eventType, callback) {
                var targetColor = regions[region_id], currentRGBA, pos;
                _this.bind(eventType, function (event) {

                    event = event || window.event;
                    pos = _this.position(event);
                    currentRGBA = canvas2D.getImageData(pos.x - 0.5, pos.y - 0.5, 1, 1).data;
                    if ("rgb(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + ")" == targetColor)
                        callback(event, pos.x, pos.y);

                });
                return regionManger;
            }
        };

    return regionManger;

};
