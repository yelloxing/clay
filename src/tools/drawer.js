export default (npmDownload, painter, color, deep, height) => {

    painter
        .config("strokeStyle", color)
        .beginPath()
        .moveTo(npmDownload[0].x, height - (height - npmDownload[0].y) * deep);

    // 连线
    for (let i = 0; i < npmDownload.length; i++) {
        painter.lineTo(npmDownload[i].x, height - (height - npmDownload[i].y) * deep);

    }
    painter.stroke();

    // 添加圆圈
    for (let i = 0; i < npmDownload.length; i++) {
        painter.fillCircle(npmDownload[i].x, height - (height - npmDownload[i].y) * deep, 3);
        painter.strokeCircle(npmDownload[i].x, height - (height - npmDownload[i].y) * deep, 3);
    }

};
