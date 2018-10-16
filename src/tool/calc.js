// 把颜色统一转变成rgba(x,x,x,x)格式
// 返回数字数组[r,g,b,a]
clay.color = function (color) {

    var temp = clay('head').css('color', color).css('color').replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,' + _regexp.whitespace));
    return [+temp[0], +temp[1], +temp[2], temp[3] == undefined ? 1 : +temp[3]];

};

// 返回不少于指定个数的颜色值数组
clay.getColors = function (num) {

    if (typeof num == 'number' && num > 3) {

        var temp = [], flag = 0;
        for (flag = 1; flag <= num; flag++)
            temp.push('rgb(' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ')');
        return temp;

    } else {
        return ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)'];
    }

};

// 返回最大值
clay.max = function (array, valback) {

    valback = typeof valback === 'function' ? valback : function (data) { return data; };
    var flag = 1, max = array[0], maxval = valback(array[0], 0), nowval;
    for (; flag < array.length; flag++) {
        nowval = valback(array[flag], flag);
        if (maxval < nowval) {
            max = array[flag];
            maxval = nowval;
        }
    }
    return max;

};

// 返回最小值
clay.min = function (array, valback) {

    valback = typeof valback === 'function' ? valback : function (data) { return data; };
    var flag = 1, min = array[0], minval = valback(array[0], 0), nowval;
    for (; flag < array.length; flag++) {
        nowval = valback(array[flag], flag);
        if (minval > nowval) {
            min = array[flag];
            minval = nowval;
        }
    }
    return min;

};

// 给一组数据，轮询执行一遍
clay.loop = function (datas, callback) {
    var flag = 0, data;
    for (data in datas) {
        callback(datas[data], flag, data);
        flag += 1;
    }
    return clay;

};
