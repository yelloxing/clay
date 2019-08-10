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

let painter = $$('canvas').painter();

// 获取包下载量数据
get(paramJSON.packages).then(function (data) {

    // 获取格式化后的数据
    // 根据时间长度格式化
    let formatData = format(data, paramJSON);

    let colorsRGBA = colors(formatData.number);

    let template = "", color;

    for (let key in formatData.downloads) {
        color = colorsRGBA.pop();

        template += "<li style='--color:" + color + "'>" + key + "<em onclick=\"reload('" + key + "')\">X</em></li>";

        // 绘制线条
        painter.config("strokeStyle", color);
        drawer(key, formatData.downloads[key], painter);
    }

    $$('.npm-colors')[0].innerHTML = template;

});
