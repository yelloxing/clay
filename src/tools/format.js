import $$ from 'image2d';

export default (oralJSON, paramJSON) => {

    let maxValue = 0, number = 0;

    let downloads = {};
    for (let key in oralJSON) {

        // 如果是null说明npm没有这个包
        if (oralJSON[key] != null) {
            number += 1;

            downloads[key] = [];

            let temp = {
                number: 0,
                begin: oralJSON[key].downloads[1].day
            };
            for (let i = 1; i < oralJSON[key].downloads.length - 1; i++) {
                temp.number += oralJSON[key].downloads[i].downloads;
                if (i % paramJSON.interval == 0) {

                    // 记录在区间中间
                    temp.end = oralJSON[key].downloads[i].day;
                    temp.position = i - paramJSON.interval / 2;

                    // 记录最大值
                    if (maxValue < temp.number) maxValue = temp.number;

                    // 更新
                    downloads[key].push(temp);

                    temp = {
                        number: 0,
                        begin: oralJSON[key].downloads[i + 1].day
                    };
                }
            }

        }
    }

    let canvas = $$('canvas');
    let width = (+canvas.attr('width')) / 2;
    let height = (+canvas.attr('height')) / 2 - 50;

    let formatDownloads = {};
    for (let key in downloads) {
        formatDownloads[key] = [];
        for (let i = 0; i < downloads[key].length; i++) {
            formatDownloads[key].push(downloads[key][i]);
            formatDownloads[key][i].x = (width / 366) * downloads[key][i].position;
            formatDownloads[key][i].y = height - (downloads[key][i].number / maxValue) * height + 10;
        }
    }



    return {
        downloads: formatDownloads,
        number,
        width,
        height,
        maxValue
    };
};
