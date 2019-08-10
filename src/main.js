import Abandon from 'abandon';
import loadData from './loadData';
import $$ from 'image2d';
import getColors from './getColors';

// 兼容文件
import 'promise-polyfill/src/polyfill';

// 加载样式
import './style/root.scss';

//根对象
new Abandon({

    //挂载点
    el: "#root",

    // 数据
    data: {
        maxValue: 0, //最大值
        interval: -1, // 统计间隔
        num: 0, //有效的统计条数,
        rateY: 1, // Y轴缩放比例
        rateX: 1
    },

    // 挂载执行
    mounted() {

        var svg = document.getElementsByTagName('svg')[0];
        var frame = document.getElementById('root');
        svg.setAttribute('width', frame.offsetWidth);
        svg.setAttribute('height', frame.offsetHeight - 42);

        this.rateX = (frame.offsetWidth - 10) / 366;

        // 获取参数
        let urlSearchParams = new URLSearchParams((window.location.href + "").replace(/^[^?]+/, '').replace(/^\?/, ''));
        let url = urlSearchParams.get('packages');
        this.interval = urlSearchParams.get('interval');
        let _this = this;

        // 请求数据
        loadData(url).then(function (data) {

            // 统一数据格式
            if (!/,/.test(url)) {
                let temp = {};
                temp[url] = JSON.parse(data);
                data = temp;
            } else data = JSON.parse(data);

            // 数据预处理
            let downloads = {}; // npm install下载量统计
            for (let key in data) {
                if (data[key] !== null) {
                    downloads[key] = _this.preDispose(data[key]);
                    _this.num = _this.num - (-1);
                }
            }

            // 求解Y最佳缩放比
            _this.rateY = (frame.offsetHeight - 42) / _this.maxValue;

            let colors = getColors(_this.num);

            let index = 30;
            for (let key in downloads) {
                _this.drawerLine(key, downloads[key], colors.pop(), index);
                index += 20;
            }

            // 添加悬浮提示
            $$('body').bind('mousemove', function (event) {
                let position = $$('body').position(event || window.event);
                let y = (frame.offsetHeight - 42 - position.y) / _this.rateY;

                $$('svg')

                    // 绘制提示文字
                    .painter('#move-text').config({
                        "strokeStyle": "rgba(255,0,0,0.2)",
                        "fillStyle": "red",
                        "textAlign": "center",
                        "lineWidth": 10,
                        "font-size": 30
                    }).fillText(y.toFixed(0), position.x, position.y < 100 ? position.y + 40 : position.y - 40)

                    .bind('#move-circle').fillCircle(position.x, position.y, 2)


                    .config({
                        "strokeStyle": "red",
                        "lineWidth": 2
                    })

                    .bind('#move-path-top')
                    .beginPath()
                    .moveTo(position.x - 10, position.y < 100 ? position.y + 20 : position.y - 20)
                    .lineTo(position.x, position.y < 100 ? position.y + 5 : position.y - 5)
                    .lineTo(position.x + 10, position.y < 100 ? position.y + 20 : position.y - 20)
                    .lineTo(position.x, position.y < 100 ? position.y + 5 : position.y - 5)
                    .lineTo(position.x, position.y < 100 ? position.y + 20 : position.y - 20)
                    .stroke();

            });

        });
    },

    // 处理方法
    methods: {

        // 数据预处理
        // 计算坐标
        preDispose(oralData) {
            let positions = [], temp = 0;
            for (let i = 1; i <= oralData.downloads.length; i++) {
                temp += oralData.downloads[i - 1].downloads;
                if (i % this.interval == 0) {
                    // 记录在区间中间
                    positions.push([i - this.interval / 2, temp]);

                    // 记录最大值
                    if (this.maxValue < temp) this.maxValue = temp;

                    temp = 0;
                }
            }
            return positions;
        },

        // 绘制线条
        drawerLine(npmName, lineDatas, color, index) {
            let _this = this;
            let cardinal = $$.cardinal().setT(-1).setP(lineDatas);
            let painter = $$('svg').painter('<path npmName="' + npmName + '"/>').config({
                "strokeStyle": color,
                "lineWidth": 1
            }).appendTo('g.line');

            $$.animation(function (deep) {
                painter.beginPath();
                painter.moveTo(lineDatas[0][0] * _this.rateX, (_this.maxValue - cardinal(lineDatas[0][0]) * deep) * _this.rateY);
                for (let x = lineDatas[0][0] + 1; x < lineDatas[lineDatas.length - 1][0]; x += 1) {
                    painter.lineTo(x * _this.rateX, (_this.maxValue - (cardinal(x) < 0 ? 0 : cardinal(x)) * deep) * _this.rateY);
                }
                painter.lineTo(lineDatas[lineDatas.length - 1][0] * _this.rateX, (_this.maxValue - lineDatas[lineDatas.length - 1][1]) * _this.rateY * deep);
                painter.stroke();

            }, 700, function () {

                $$('<li style="--color:' + color + '">' + npmName + '<em onclick="reload(\'' + npmName + '\')">X</em></li>').appendTo('ul');

                // 绘制圆球
                for (let i = 0; i < lineDatas.length; i++) {
                    $$('svg').painter('<circle npmName="' + npmName + '"/>').config({
                        "strokeStyle": color,
                        "fillStyle": "white"
                    }).appendTo('g.circle')
                        .strokeCircle(lineDatas[i][0] * _this.rateX, (_this.maxValue - lineDatas[i][1]) * _this.rateY, 3)
                        .fillCircle(lineDatas[i][0] * _this.rateX, (_this.maxValue - lineDatas[i][1]) * _this.rateY, 3);
                }

            });

        }

    }

});
