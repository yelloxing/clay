$$(function () {

    $$('<g class="verline1"></g>').appendTo('svg');
    $$('<g class="verline2"></g>').appendTo('svg');
    $$('<g class="line"></g>').appendTo('svg');
    $$('<g class="point5"></g>').appendTo('svg');
    $$('<g class="point10"></g>').appendTo('svg');
    $$('<g class="point20"></g>').appendTo('svg');
    $$('<g class="point30"></g>').appendTo('svg');

    // 画柱状图
    $$('.verline1').find('path').data(lineData).enter('path').appendTo('.verline1');
    $$('.verline2').find('path').data(lineData).enter('path').appendTo('.verline2');

    var smailWidth = 800 / lineData.length;

    $$('.verline2').find('path').attr('d', function (data, index) {
        return 'M' + ((index + 0.5) * smailWidth - 2.5) + " " + (500 - data[1] + 2100) + "L" +
            ((index + 0.5) * smailWidth + 2.5) + " " + (500 - data[1] + 2100) + "," +
            ((index + 0.5) * smailWidth + 2.5) + " " + (500 - data[2] + 2100) + "," +
            ((index + 0.5) * smailWidth - 2.5) + " " + (500 - data[2] + 2100);
    }).attr('fill', function (data) {
        if (data[1] < data[2])
            return "red";
        else
            return "green";
    });
    $$('.verline1').find('path').attr('d', function (data, index) {
        return 'M' + ((index + 0.5) * smailWidth - 0.5) + " " + (500 - data[3] + 2100) + "L" +
            ((index + 0.5) * smailWidth + 0.5) + " " + (500 - data[3] + 2100) + "," +
            ((index + 0.5) * smailWidth + 0.5) + " " + (500 - data[4] + 2100) + "," +
            ((index + 0.5) * smailWidth - 0.5) + " " + (500 - data[4] + 2100);
    }).attr('fill', function (data) {
        if (data[1] < data[2])
            return "red";
        else
            return "green";
    });

    // 计算MA
    function splitData(rawData) {
        var categoryData = [];
        var values = []
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }
    var data = splitData(lineData);
    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    var MA5 = calculateMA(5),
        MA10 = calculateMA(10),
        MA20 = calculateMA(20),
        MA30 = calculateMA(30);

    // 画圈
    $$('.point5').find('circle').data(MA5).enter('circle').appendTo('.point5');
    $$('.point10').find('circle').data(MA10).enter('circle').appendTo('.point10');
    $$('.point20').find('circle').data(MA20).enter('circle').appendTo('.point20');
    $$('.point30').find('circle').data(MA30).enter('circle').appendTo('.point30');

    var drawerCircle = function (num, color) {
        $$('.point' + num).find('circle').attr('cx', function (data, index) {
            return (index + 0.5) * smailWidth;
        })
            .attr('cy', function (data, index) {
                if (data == '-') {
                    return -100;
                } else {
                    return 500 - data + 2100;
                }
            })
            .attr('r', '2')
            .attr('stroke', color)
            .attr('fill', 'white')
            .attr('stroke-width', '2');
    };

    drawerCircle(5, 'red');
    drawerCircle(10, '#0c9aec');
    drawerCircle(20, '#12e3dc');
    drawerCircle(30, '#4de312');

    // 画曲线
    var line = $$.svg.line().interpolate('cardinal').setHeight(500).setPrecision(5);
    var drawerLine = function (point, color) {
        $$('<path>').appendTo('.line').attr('d', function () {
            return line((function (point) {
                var flag = 0, temp = [];
                for (; flag < point.length; flag++) {
                    if (point[flag] != '-') {
                        temp.push([
                            (flag + 0.5) * smailWidth,
                            point[flag] - 2100
                        ]);
                    }
                }
                return temp;
            })(point));
        })
            .attr('stroke', color)
            .attr('fill', 'none')
            .attr('stroke-width', '1');
    };

    drawerLine(MA5, 'red');
    drawerLine(MA10, '#0c9aec');
    drawerLine(MA20, '#12e3dc');
    drawerLine(MA30, '#4de312');

});
