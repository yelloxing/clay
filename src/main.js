import $$ from 'image2d';
import format from './tools/format';
import get from './tools/get';
import param from './tools/param';
import drawer from './tools/drawer';
import colors from './tools/colors';

// 兼容文件
import 'promise-polyfill/src/polyfill';

// 加载样式
import './style/root.scss';

// 获取npm包名和时间长度
let paramJSON = param(window.location.href);

let painter = $$('canvas').painter().config('fillStyle', 'white');

// 获取包下载量数据
get(paramJSON.packages).then(function (data) {

    try {

        // 获取格式化后的数据
        // 根据时间长度格式化
        let formatData = format(data, paramJSON);

        let colorsRGBA = colors(formatData.number);

        let template = "";

        // 绘制线条
        $$.animation(function (deep) {
            painter.clearRect();
            let i = 0;
            for (let key in formatData.downloads) {
                let color = colorsRGBA[i];
                i += 1;
                drawer(key, formatData.downloads[key], painter, color, deep, formatData.width, formatData.height);
            }
        }, 1000, function () {

            // 添加标志说明
            for (let key in formatData.downloads) {
                template += "<li style='--color:" + colorsRGBA.shift() + "'>"
                    + key
                    + "<em onclick=\"reload('" + key + "')\">X</em>"
                    + "</li>";
                $$('#npm-packages')[0].innerHTML = template;
            }



        });

    } catch (e) {

        $$(`<div style='width:100vw;height:100vh;text-align:center;padding-top:50vh;'>
            <span style='vertical-align:middle;background-color:red;padding:.1rem;'>运行错误，错误信息为：`+ e + `，访问地址为：` + window.location.href + `，请提
            <a style='color:white;background-color:green;padding:.03rem .1rem;border-radius:.1rem;' href='https://github.com/yelloxing/npm-downloads/issues'>issue</a>
            告知开发人员！</span>
        </div>`).appendTo('body');

        throw e;

    }

});
