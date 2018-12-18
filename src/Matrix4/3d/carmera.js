// 视图
clay.carmera = function () {

    var matrix4 = clay.Matrix4();

    var carmera = {
        "lookAt": function (
            // 视点
            eX, eY, eZ,
            // 观察方向
            dX, dY, dZ,
            // 上方向
            upX, upY, upZ
        ) {



            return carmera;
        },
        "value": function () {
            return matrix4.value();
        }
    };

    return carmera;

};
