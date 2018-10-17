// 用特定色彩绘制区域
// 预定义部分常用图形
// 默认支持自定义绘图方法
var drawerRegion = function (pen, color, type, data) {
    pen.beginPath();
    pen.fillStyle = color;
    switch (type) {
        // 矩形
        case 'rectangle':
            // data=[x,y,width,height]
            pen.moveTo(data[0], data[1]);
            pen.lineTo(data[0] + data[2], data[1]);
            pen.lineTo(data[0] + data[2], data[1] + data[3]);
            pen.lineTo(data[0], data[1] + data[3]);
            break;
        // 圆
        case 'round':
            // data=[cx,cy,r]
            pen.moveTo(data[0] + data[2], data[1]);
            pen.arc(data[0], data[1], data[2], 0, Math.PI * 2);
            break;
        // 多边形
        case 'polygon':
            // data=[[x,y],[x,y],...]
            pen.moveTo(data[0][0], data[0][1]);
            var i;
            for (i = 1; i < data.length; i++)
                pen.lineTo(data[i][0], data[i][1]);
            break;
        default:
            // 默认传递绘制函数，此时data不需要传递
            type(pen);
    }
    pen.fill();
};
