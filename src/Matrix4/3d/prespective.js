// 透视投影
clay.prespective = function () {

    var matrix4,

        // 这是一个一点透视
        prespective = {
            "set": function (
                // 垂直视角，也就是视野的顶面和底面夹角
                fov,
                // 视野的宽/高
                aspect,
                // 近裁剪面和远裁剪面
                near, far
            ) {



                return prespective;
            },
            "value": function () {
                return matrix4.value();
            }
        };

    return prespective;

};
