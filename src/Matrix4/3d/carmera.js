// 视图
clay.carmera = function () {

    var matrix4,
        carmera = {

            // 设置或重置观察"姿势"
            "lookAt": function (
                // 视点
                eX, eY, eZ,
                // 观察目标中心点
                cX, cY, cZ,
                // 上方向
                upX, upY, upZ
            ) {

                throw new Error('温馨提示：由完成状态切回开发状态！');

                // return carmera;
            },

            // 获取视图矩阵数组表示
            "value": function () {
                return matrix4.value();
            }

        };

    return carmera;

};
