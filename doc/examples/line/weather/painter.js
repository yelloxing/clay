$$(function () {

    var svg = $$('svg');
    $$('<g class="minC"></g>').appendTo(svg);
    $$('<g class="maxC"></g>').appendTo(svg);
    $$('<g class="line"></g>').appendTo(svg);
    $$('<g class="minPoint"></g>').appendTo(svg);
    $$('<g class="maxPoint"></g>').appendTo(svg);

    var data = (function (weatherData) {
        var temp = [], flag;
        for (flag = 0; flag < weatherData.length; flag++) {
            var c = /(\d{1,})℃ {1,}\/ {1,}(\d{1,})℃/.exec(weatherData[flag][2]);
            temp.push({
                oral: weatherData[flag],
                c: [c[1] * 5, c[2] * 5, '℃']
            });
        }
        return temp;
    })(window.weatherData);

    $$('.minC').find('line').data(data).enter('line').appendTo('.minC');
    $$('.maxC').find('line').data(data).enter('line').appendTo('.maxC');
    $$('.minPoint').find('circle').data(data).enter('circle').appendTo('.minPoint');
    $$('.maxPoint').find('circle').data(data).enter('circle').appendTo('.maxPoint');

    var minC = $$('.minC').find('line'),
        maxC = $$('.maxC').find('line'),
        minPoint = $$('.minPoint').find('circle'),
        maxPoint = $$('.maxPoint').find('circle');

    var perW = 1000 / 7;

    minC
        .attr('x1', function (data, index) { return (index + 0.5) * perW })
        .attr('y1', 300)
        .attr('y2', 300)
        .attr('x2', function (data, index) { return (index + 0.5) * perW })
        .css({
            "stroke": "green",
            "stroke-width": "50"
        });

    maxC
        .attr('x1', function (data, index) { return (index + 0.5) * perW })
        .attr('y1', 300)
        .attr('y2', 300)
        .attr('x2', function (data, index) { return (index + 0.5) * perW })
        .css({
            "stroke": "red",
            "stroke-width": "25"
        });

    minPoint
        .attr('cx', function (data, index) { return (index + 0.5) * perW })
        .attr('cy', 300)
        .attr('r', 10)
        .attr('stroke', 'black')
        .attr('stroke-width', 4)
        .attr('fill', 'white');

    maxPoint
        .attr('cx', function (data, index) { return (index + 0.5) * perW })
        .attr('cy', 300)
        .attr('r', 10)
        .attr('stroke', 'black')
        .attr('stroke-width', 4)
        .attr('fill', 'white');

    var line = $$.svg.line().interpolate('cardinal').setHeight(600).setPrecision(5).setFlag(true);
    // max
    $$('<path></path>').appendTo('.line').datum((function (orldata) {
        var flag, temp = [];
        for (flag = 0; flag < orldata.length; flag++) {
            temp.push([
                (flag + 0.5) * perW,
                orldata[flag].c[0] + 50
            ]);
        }
        return [temp, "max"];
    })(data)).attr('stroke', 'red');
    // min
    $$('<path></path>').appendTo('.line').datum((function (orldata) {
        var flag, temp = [];
        for (flag = 0; flag < orldata.length; flag++) {
            temp.push([
                (flag + 0.5) * perW,
                600 - (orldata[flag].c[1] + 50)
            ]);
        }
        return [temp, "min"];
    })(data)).attr('stroke', 'green');

    var lines = $$('.line')
        .find('path')
        .attr('fill', 'none');

    $$.animation(function (deep) {

        minC.attr('y2', function (mindata) {
            return 300 - (mindata.c[1] * deep + 50);
        });
        maxC.attr('y2', function (maxdata) {
            return maxdata.c[0] * deep + 350;
        });
        minPoint.attr('cy', function (mindata) {
            return 300 - (mindata.c[1] * deep + 50);
        });
        maxPoint.attr('cy', function (maxdata) {
            return maxdata.c[0] * deep + 350;
        });

        lines.attr('d', function (pathdata) {
            var newData = [], flag;
            for (flag = 0; flag < pathdata[0].length; flag++) {
                newData.push(
                    [pathdata[0][flag][0],
                    pathdata[1] == 'min' ? (250 + pathdata[0][flag][1] * deep - 550 * deep) : (pathdata[0][flag][1] - 50) * deep + 350
                    ]);
            }

            return line(newData);
        });

    }, 1000);

});
