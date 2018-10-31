// 把颜色统一转变成rgba(x,x,x,x)格式
// 返回数字数组[r,g,b,a]
clay.color = function (color) {
    var temp = clay('head').css('color', color).css('color').replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,' + _regexp.whitespace));
    return [+temp[0], +temp[1], +temp[2], temp[3] == undefined ? 1 : +temp[3]];
};

// 给一组数据，轮询执行一遍
clay.loop = function (datas, callback) {
    var flag = 0, data;
    for (data in datas)
        callback(datas[data], data, flag++);
    return clay;
};
