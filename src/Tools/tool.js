var _rgb2hsl = function (R, G, B) {
    var R1 = +R / 255,
        G1 = +G / 255,
        B1 = +B / 255;
    var MAX = Math.max(R1, G1, B1);
    var MIN = Math.min(R1, G1, B1);
    var H, S, L;
    if (MAX === MIN) {
        H = 0;
    } else if (MAX === R1) {
        H = 60 * (G1 - B1) / (MAX - MIN);
    } else if (MAX === G1) {
        H = 60 * (B1 - R1) / (MAX - MIN) + 120;
    } else if (MAX === B1) {
        H = 60 * (R1 - G1) / (MAX - MIN) + 240;
    }
    if (H < 0) {
        H += 360;
    }
    L = (MAX + MIN) / 2;
    if (L === 0 || MAX === MIN) {
        S = 0;
    } else if (L > 0 && L <= 0.5) {
        S = (MAX - MIN) / (MAX + MIN);
    } else if (L > 0.5) {
        S = (MAX - MIN) / (2 - MAX - MIN);
    }
    return [+H.toFixed(2), +S.toFixed(2), +L.toFixed(2)];
}, _hsl2rgb = function (h, s, l) {
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = l - c / 2;
    var r, g, b;
    if (h >= 0 && h < 60) {
        r = (c + m) * 255;
        g = (x + m) * 255;
        b = m * 255;
    } else if (h >= 60 && h < 120) {
        r = (x + m) * 255;
        g = (c + m) * 255;
        b = m * 255;
    } else if (h >= 120 && h < 180) {
        r = m * 255;
        g = (c + m) * 255;
        b = (x + m) * 255;
    } else if (h >= 180 && h < 240) {
        r = m * 255;
        g = (x + m) * 255;
        b = (c + m) * 255;
    } else if (h >= 240 && h < 300) {
        r = (x + m) * 255;
        g = m * 255;
        b = (c + m) * 255;
    } else if (h >= 300 && h < 360) {
        r = (c + m) * 255;
        g = m * 255;
        b = (x + m) * 255;
    }
    return [+r.toFixed(0), +g.toFixed(0), +b.toFixed(0)];
}, _randomColors = function (num) {
    if (_is_number(num) && num > 3) {
        var temp = [], flag = 0;
        for (flag = 1; flag <= num; flag++)
            temp.push('rgb(' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ')');
        return temp;
    } else {
        return ['red', 'green', 'blue'];
    }
};

// 把颜色统一转变成rgba(x,x,x,x)格式
// 返回数字数组[r,g,b,a]
clay.color = function (color) {
    var temp = clay('head').css('color', color).css('color').replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,' + _regexp_whitespace));
    return [+temp[0], +temp[1], +temp[2], temp[3] == undefined ? 1 : +temp[3]];
};

// 获取一组色彩
clay.getColors = function (num, range, rgb) {
    if (!range) return _randomColors(num);

    //num：需要的颜色个数
    //range:数组，取值0-360，色彩范围
    //rgb: 可选，数组，参考颜色，是一组rgb
    var temp = (range[1] - range[0]) / num;
    var s, l;
    if (rgb) {
        var hsl = _rgb2hsl(rgb[0], rgb[1], rgb[2]);
        s = hsl[1]; l = hsl[2];
    } else {
        s = 0.78; l = 0.4;
    }
    var array = [];
    for (var i = 0; i < num; i++) {
        rgb = _hsl2rgb(temp * i + range[0], s, l);
        array.push("rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")");
    }
    return array;
};

// 给一组数据，轮询执行一遍
clay.loop = function (datas, callback) {
    var flag = 0,
        data;
    for (data in datas)
        callback(datas[data], data, flag++);
    return clay;
};
