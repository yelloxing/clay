import $$ from 'image2d';
import format from './tools/format';
import get from './tools/get';
import param from './tools/param';
import drawer from './tools/drawer';
import colors from './tools/colors';
import __ from '@yelloxing/core.js/';

// 兼容文件
import 'promise-polyfill/src/polyfill';

// 加载样式
import '@yelloxing/normalize.css';
import './style/root.scss';

// 获取npm包名和时间长度
let paramJSON = param(window.location.href);

let canvas = $$('canvas'), layer = canvas.layer(), painterInfo = layer.painter('npm-downloads').config('fillStyle', 'white');

// 添加加载中提示
let x = (+canvas.attr('width')) / 4, y = (+canvas.attr('height')) / 4 - 50;
painterInfo.config({
    textBaseline: "middle",
    textAlign: "center"
});

let stop, loadingFlag, loadingFun = () => {
    if (loadingFlag) return;
    stop = $$.animation((deep) => {
        painterInfo.clearRect();
        painterInfo.config('font-size', (deep > 0.5 ? deep : 1 - deep) * 30).fillText('正在为您请求数据，请稍等片刻......', x, y);
        layer.update();
    }, 2000, loadingFun);
};
loadingFun();

// 获取包下载量数据
let doIt = (data,painter,isLast) => {

    if(!isLast) return;

    // 请求返回的时候，停止加载提示动画
    stop(); loadingFlag = true;

    painter.clearRect();
    layer.update();

    try {

        // 获取格式化后的数据
        // 根据时间长度格式化
        let formatData = format(data, paramJSON);

        let colorsRGBA = colors(formatData.number);

        let template = "";

        // 绘制线条
        $$.animation(deep => {
            painter.clearRect();
            painterInfo.clearRect();
            let i = 0;
            for (let key in formatData.downloads) {
                let color = colorsRGBA[i];
                i += 1;
                drawer(formatData.downloads[key], painter, color, deep, formatData.height);
            }
            layer.update();
        }, 1000, () => {

            // 添加标志说明
            for (let key in formatData.downloads) {
                template = "<li style='--color:" + colorsRGBA.shift() + "'>"
                    + key
                    + "<em onclick=\"reload('" + key + "')\">X</em>"
                    + "</li>";
                $$('#npm-packages')[0].innerHTML += template;
            }

            // 绑定悬浮事件
            let hover_painter = layer.painter('hover');
            $$('canvas').bind('mousemove', (event) => {
                let position = canvas.position(event || window.event), index = -1, info = [], begin, end, x;
                for (let key in formatData.downloads) {

                    // 寻找合适的index,只需要寻找一次
                    if (index == -1) {
                        let minDis = (formatData.downloads[key][0].x - (
                            formatData.downloads[key].length < 2 ?
                                formatData.width : formatData.downloads[key][1].x
                        )) * 0.5;
                        for (index = 0; index < formatData.downloads[key].length; index++) {
                            if (
                                position.x - formatData.downloads[key][index].x < -1 * minDis &&
                                position.x - formatData.downloads[key][index].x > minDis
                            ) {
                                begin = formatData.downloads[key][index].begin;
                                end = formatData.downloads[key][index].end;
                                x = formatData.downloads[key][index].x;
                                break;
                            }
                        }
                    }

                    if (index >= formatData.downloads[key].length) return;

                    info.push({
                        name: key,
                        y: formatData.downloads[key][index].y,
                        value: formatData.downloads[key][index].number
                    });

                }

                hover_painter.clearRect();

                // 画竖直的线条
                hover_painter.beginPath()
                    .moveTo(x, 0).lineTo(x, formatData.height + 50)
                    .config({
                        "strokeStyle": "red",
                        "fillStyle": "white",
                        "lineWidth": 2
                    })
                    .stroke();

                let hover_text = [
                    begin + " 至 " + end
                ], hover_length = hover_text[0].length;

                for (let index = 0; index < info.length; index++) {

                    // 画圈
                    hover_painter.config("lineWidth", 4)
                        .strokeCircle(x, info[index].y, 7)
                        .fillCircle(x, info[index].y, 7);


                    let temp = info[index].name + " : " + info[index].value;
                    if (temp.length > hover_length) hover_length = temp.length;
                    hover_text.push(temp);

                }

                let xx = position.x, yy = position.y, width = hover_length * 12, height = info.length * 20 + 50;

                // 不同位置寻找更好的坐标
                if (xx > formatData.width * 0.5) {
                    xx -= (width + 20);
                } else {
                    xx += 20;
                }
                if (yy > formatData.height * 0.5) {
                    yy -= (height + 20);
                } else {
                    yy += 20;
                }

                // 绘制提示文字
                hover_painter.beginPath()
                    .config({
                        "fillStyle": "rgba(200,200,200,0.5)"
                    })
                    .fillRect(xx, yy, width, height)
                    .config({
                        'fillStyle': 'rgb(244,100,200)',
                        'font-size': 14
                    }).fillText(hover_text[0], xx + 30, yy + 30)
                    .config({
                        'fillStyle': 'white'
                    });
                for (let index = 1; index < hover_text.length; index++)
                    hover_painter.fillText(hover_text[index], xx + 30, yy + 30 + 20 * index);

                layer.update();
            });

        });

    } catch (e) {
        $$(`<div style='background-color: red;position:fixed;line-height: 3em;width:100vw;height:100vh;text-align:center;padding-top:20vh;'>
                <span style='vertical-align:middle;padding:.1rem;color:white;'>运行错误，错误信息为：`+ e + `，访问地址为：` + window.location.href + `，请提
                <a style='color:black;background-color:white;padding:.03rem .1rem;border-radius:.1rem;' href='https://github.com/yelloxing/npm-downloads/issues'>issue</a>
                告知开发人员！</span>
            </div>`).appendTo('body');

        throw e;

    }

};

let packages = __.split(paramJSON.packages, ",");
let datas = {}, flag = 1;
for (let i = 0; i < packages.length; i++) {
    get(packages[i]).then(data => {
        datas[packages[i]] = JSON.parse(data);
        flag += 1;
        if (flag >= packages.length) doIt(
            datas,
            layer.painter('pkg-'+packages[i]).clearRect().config('fillStyle', 'white'),
            flag>=packages.length+1
            );
    });
}



