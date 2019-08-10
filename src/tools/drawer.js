export default function (key, npmDownload, painter) {

    painter.beginPath();
    painter.moveTo(npmDownload[0].x, npmDownload[0].y);
    for (let i = 1; i < npmDownload.length; i++) {
        painter.lineTo(npmDownload[i].x, npmDownload[i].y);
    }
    painter.stroke();

};
