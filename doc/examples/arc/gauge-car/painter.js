// 不借助布局实现
// 本用例用于测试使用简单方法计算是否方便开发

$$(function () {

    $$('<g class="left"></g>').appendTo('svg');
    $$('<g class="right"></g>').appendTo('svg');
    $$('<g class="center"></g>').appendTo('svg');

    // 配置数据
    var left = { cx: 100, cy: 350, radius: 100, width: 10 },
        center = { cx: 300, cy: 300, radius: 160, width: 15 },
        right = { cx: 500, cy: 350, radius: 100, width: 10 }, flag;

    // 1.画弧
    var arc = $$.svg.arc().setCenter(left.cx, left.cy).setRadius(left.radius - left.width, left.radius);
    $$('<path>').appendTo('.left').attr('d', function () { return arc(Math.PI / 4 * 3, Math.PI / 4); }).attr('fill', '#7dccaf');
    $$('<path>').appendTo('.left').attr('d', function () { return arc(Math.PI, Math.PI / 2); }).attr('fill', '#5b86a0');
    $$('<path>').appendTo('.left').attr('d', function () { return arc(Math.PI / 2 * 3, Math.PI / 4); }).attr('fill', '#d40918');
    var colors = ['#7dccaf', '#7dccaf', "#5b86a0", "#5b86a0", "#5b86a0", "#5b86a0", "#d40918", "#d40918"];
    // 画刻度
    arc.setRadius(left.radius - 2.4 * left.width, left.radius);
    for (flag = 0; flag < 8; flag++) {
        $$('<path>').appendTo('.left').attr('d', function () { return arc(Math.PI * (1 / 4 * 3 + 1 / 7 * flag), 0.02); }).attr('fill', colors[flag]);
    }
    arc.setRadius(left.radius - 1.6 * left.width, left.radius);
    for (flag = 0; flag < 35; flag++) {
        $$('<path>').appendTo('.left').attr('d', function () { return arc(Math.PI * (1 / 4 * 3 + 1 / 35 * flag), 0.01); }).attr('fill', (function (flag) {
            if (flag < 9) {
                return "#7dccaf";
            } else if (flag < 27) {
                return "#5b86a0";
            } else {
                return "#d40918";
            }
        })(flag));
    }

    // 画第二个仪表盘的时候，修改基本配置
    arc.setCenter(center.cx, center.cy).setRadius(center.radius - center.width, center.radius);
    $$('<path>').appendTo('.center').attr('d', function () { return arc(Math.PI / 4 * 3, Math.PI / 8 * 3); }).attr('fill', '#7dccaf');
    $$('<path>').appendTo('.center').attr('d', function () { return arc(Math.PI / 8 * 9, Math.PI / 8 * 6); }).attr('fill', '#5b86a0');
    $$('<path>').appendTo('.center').attr('d', function () { return arc(Math.PI / 8 * 15, Math.PI / 8 * 3); }).attr('fill', '#d40918');
    arc.setRadius(center.radius - 1.4 * center.width, center.radius);
    for (flag = 0; flag < 55; flag++) {
        $$('<path>').appendTo('.center').attr('d', function () { return arc(Math.PI * (1 / 4 * 3 + 3 / 110 * flag), 0.01); }).attr('fill', (function (flag) {
            if (flag < 14) {
                return "#7dccaf";
            } else if (flag < 42) {
                return "#5b86a0";
            } else {
                return "#d40918";
            }
        })(flag));
    }
    arc.setRadius(center.radius - 2 * center.width, center.radius);
    for (flag = 0; flag < 12; flag++) {
        $$('<path>').appendTo('.center').attr('d', function () { return arc(Math.PI * (1 / 4 * 3 + 3 / 22 * flag), 0.02); }).attr('fill', (function (flag) {
            if (flag < 3) {
                return "#7dccaf";
            } else if (flag < 9) {
                return "#5b86a0";
            } else {
                return "#d40918";
            }
        })(flag));
    }

    // 第三个
    arc.setCenter(right.cx, right.cy).setRadius(right.radius - right.width, right.radius);
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI / 4 * 5, Math.PI / 8); }).attr('fill', '#7dccaf');
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI / 8 * 11, Math.PI / 4); }).attr('fill', '#5b86a0');
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI / 8 * 13, Math.PI / 8); }).attr('fill', '#d40918');

    arc.setRadius(right.radius - 1.7 * right.width, right.radius);
    for (flag = 0; flag < 10; flag++) {
        $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI * (1 / 4 * 5 + 1 / 20 * flag), 0.01); }).attr('fill', (function (flag) {
            if (flag < 3) {
                return "#7dccaf";
            } else if (flag < 8) {
                return "#5b86a0";
            } else {
                return "#d40918";
            }
        })(flag));
    }

    arc.setRadius(right.radius - 2 * right.width, right.radius);
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI * 5 / 4, 0.02); }).attr('fill', '#7dccaf');
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI * 3 / 2, 0.02); }).attr('fill', '#5b86a0');
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI * 7 / 4, 0.02); }).attr('fill', '#d40918');

    arc.setRadius(right.radius - right.width, right.radius);
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI / 4, Math.PI / 8); }).attr('fill', '#7dccaf');
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI / 8 * 3, Math.PI / 4); }).attr('fill', '#5b86a0');
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI / 8 * 5, Math.PI / 8); }).attr('fill', '#d40918');

    arc.setRadius(right.radius - 2 * right.width, right.radius);
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI * 1 / 4, 0.02); }).attr('fill', '#7dccaf');
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI * 1 / 2, 0.02); }).attr('fill', '#5b86a0');
    $$('<path>').appendTo('.right').attr('d', function () { return arc(Math.PI * 3 / 4 - 0.02, 0.02); }).attr('fill', '#d40918');


    // 2.刻度数字
    var rotate = clay.math.rotate().setL(left.cx, left.cy + 2).setP(left.cx + left.radius - 32, left.cy);
    var p = rotate(Math.PI / 4 * 3, true);
    for (flag = 0; flag < colors.length; flag++) {
        $$('<text x=' + (p[0] - 3) + ' y=' + p[1] + ' fill="' + colors[flag] + '" style="font-size:10px">' + flag + '</text>').appendTo('.left');
        p = rotate(Math.PI / 7, true);
    }

    rotate.setL(center.cx - 4, center.cy).setP(center.cx + center.radius - 48, center.cy);
    p = rotate(Math.PI / 4 * 3 - Math.PI / 40, true);
    for (flag = 0; flag < 12; flag++) {
        $$('<text x=' + (p[0] - 6) + ' y=' + p[1] + ' fill="#000" style="font-size:14px">' + flag * 20 + '</text>').appendTo('.center');
        p = rotate(Math.PI / 7, true);
    }

    rotate.setL(right.cx, right.cy + 3).setP(right.cx + right.radius - 30, right.cy);
    var help = [['H', '#7dccaf', Math.PI / 4], ['Water', '#5b86a0', Math.PI / 10 * 3], ['O', '#d40918', Math.PI / 10 * 2], ['E', '#7dccaf', Math.PI / 2], ['Gas', '#5b86a0', Math.PI / 4], ['F', '#d40918', Math.PI / 4]];
    for (flag = 0; flag < help.length; flag++) {
        p = rotate(help[flag][2], true);
        $$('<text x=' + (p[0] - 6) + ' y=' + p[1] + ' fill="' + help[flag][1] + '" style="font-size:14px">' + help[flag][0] + '</text>').appendTo('.right');

    }

    // 添加指示文字
    $$('<text style="font-size:14px;" x=' + (left.cx - 40) + ' y=' + (left.cy - 30) + '>x1000 r/min</text>').appendTo('.left');
    $$('<text style="font-size:22px;" x=' + (center.cx - 30) + ' y=' + (center.cy - 60) + '>km/h</text>').appendTo('.center');

    // 初始化指针和值
    $$('<polygon id="leftNode" style="transform-origin:' + left.cx + 'px ' + left.cy + 'px;transform: rotate(135deg);" fill="#7dccaf" points="'
        + (left.cx - 10) + ',' + left.cy + ' '
        + left.cx + ',' + (left.cy + 6) + ' '
        + (left.cx + 60) + ',' + left.cy + ' '
        + left.cx + ',' + (left.cy - 6) + ' "/>').appendTo('.left');
    $$('<polygon id="centerNode" style="transform-origin:' + center.cx + 'px ' + center.cy + 'px;transform: rotate(135deg);" fill="#7dccaf" points="'
        + (center.cx - 15) + ',' + center.cy + ' '
        + center.cx + ',' + (center.cy + 10) + ' '
        + (center.cx + 100) + ',' + center.cy + ' '
        + center.cx + ',' + (center.cy - 10) + ' "/>').appendTo('.center');
    $$('<polygon id="rightNode1" style="transform-origin:' + right.cx + 'px ' + right.cy + 'px;transform: rotate(45deg);" fill="#7dccaf" points="'
        + (right.cx - 10) + ',' + right.cy + ' '
        + right.cx + ',' + (right.cy + 6) + ' '
        + (right.cx + 60) + ',' + right.cy + ' '
        + right.cx + ',' + (right.cy - 6) + ' "/>').appendTo('.right');
    $$('<polygon id="rightNode2" style="transform-origin:' + right.cx + 'px ' + right.cy + 'px;transform: rotate(225deg);" fill="#7dccaf" points="'
        + (right.cx - 10) + ',' + right.cy + ' '
        + right.cx + ',' + (right.cy + 6) + ' '
        + (right.cx + 60) + ',' + right.cy + ' '
        + right.cx + ',' + (right.cy - 6) + ' "/>').appendTo('.right');

    $$('<text id="lnum" fill="#7dccaf" style="font-size:30px;" x=' + (left.cx - 30) + ' y=' + (left.cy - (-40)) + '>00.0</text>').appendTo('.left');

    var preLVal = 0, preCVal = 0, preRVal1 = 0, preRVal2 = 0;
    var lClay = $$('#leftNode'), cClay = $$('#centerNode'), rClay1 = $$('#rightNode1'), rClay2 = $$('#rightNode2');
    var lnumClay = $$('#lnum');
    function setData(lVal, cVal, rVal1, rVal2) {

        var ldis = lVal - preLVal,
            cdis = cVal - preCVal,
            rdis1 = rVal1 - preRVal1,
            rdis2 = rVal2 - preRVal2;
        $$.animation(function (deep) {
            lClay.css('transform', 'rotate(' + (135 - -((ldis * deep) + preLVal) / 7 * 180) + 'deg)');
            cClay.css('transform', 'rotate(' + (135 - -((cdis * deep) + preCVal) / 220 * 270) + 'deg)');
            rClay1.css('transform', 'rotate(' + (45 - -((rdis1 * deep) + preRVal1) / 2 * 90) + 'deg)');
            rClay2.css('transform', 'rotate(' + (225 - -((rdis2 * deep) + preRVal2) / 2 * 90) + 'deg)');
            //改变色彩
            if ((ldis * deep) + preLVal < 1.75) {
                lClay.attr('fill', '#7dccaf');
                lnumClay.attr('fill', '#7dccaf');
            } else if ((ldis * deep) + preLVal < 5.22) {
                lClay.attr('fill', '#5b86a0');
                lnumClay.attr('fill', '#5b86a0');
            } else {
                lClay.attr('fill', '#d40918');
                lnumClay.attr('fill', '#d40918');
            }

            lnumClay[0].textContent = ((ldis * deep) + preLVal).toFixed(2);

            if ((cdis * deep) + preCVal < 47.5)
                cClay.attr('fill', '#7dccaf');
            else if ((cdis * deep) + preCVal < 162.22)
                cClay.attr('fill', '#5b86a0');
            else {
                cClay.attr('fill', '#d40918');
            }

            if ((rdis1 * deep) + preRVal1 < 0.5)
                rClay1.attr('fill', '#7dccaf');
            else if ((rdis1 * deep) + preRVal1 < 1.5)
                rClay1.attr('fill', '#5b86a0');
            else {
                rClay1.attr('fill', '#d40918');
            }

            if ((rdis2 * deep) + preRVal2 < 0.5)
                rClay2.attr('fill', '#7dccaf');
            else if ((rdis2 * deep) + preRVal2 < 1.5)
                rClay2.attr('fill', '#5b86a0');
            else {
                rClay2.attr('fill', '#d40918');
            }

        }, 500, function () {
            // 更新数据
            preLVal = lVal;
            preCVal = cVal;
            preRVal1 = rVal1;
            preRVal2 = rVal2;
        });

    }

    // 模拟真实数据
    setInterval(function () {

        setData(
            (Math.random() * 7).toFixed(2) - 0,
            (Math.random() * 220).toFixed(2) - 0,
            (Math.random() * 2).toFixed(1) - 0,
            (Math.random() * 2).toFixed(1) - 0
        );

    }, 1000);

});
