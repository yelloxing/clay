// 透视投影
clay.perspective = function () {

    var matrix4,

        // 这是一个一点透视
        perspective = {

            // 设置或重置透视容器
            "set": function (
                // 垂直视角，也就是视野的顶面和底面夹角
                fov,
                // 视野的宽/高
                aspect,
                // 近裁剪面和远裁剪面
                near, far
            ) {

                matrix4 = clay.Matrix4([

                ]);

                return perspective;
            },

            // 获取透视矩阵数组表示
            "value": function () {
                return matrix4.value();
            }

        };

    return perspective;

};
