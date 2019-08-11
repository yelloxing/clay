import $$ from 'image2d';

export default function (key, npmDownload, painter, color, deep, width, height) {
    height *= 0.5;
    width *= 0.5;

    painter
        .config("strokeStyle", color)
        .beginPath()
        .moveTo(width - (width - npmDownload[0].x) * deep, height - (height - npmDownload[0].y) * deep);

    // 连线
    for (let i = 0; i < npmDownload.length; i++) {
        painter.lineTo(width - (width - npmDownload[i].x) * deep, height - (height - npmDownload[i].y) * deep);

    }
    painter.stroke();

    // 添加圆圈
    for (let i = 0; i < npmDownload.length; i++) {
        painter.fillCircle(width - (width - npmDownload[i].x) * deep, height - (height - npmDownload[i].y) * deep, 3);
        painter.strokeCircle(width - (width - npmDownload[i].x) * deep, height - (height - npmDownload[i].y) * deep, 3);
    }

};
