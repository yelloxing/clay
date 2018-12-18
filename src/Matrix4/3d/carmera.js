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

                /**
                 * 视点移动至原点
                 */
                cX -= eX;
                cY -= eY;
                cZ -= eZ;

                // 初始化矩阵
                matrix4 = clay.Matrix4([
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    -eX, -eY, -eZ, 1
                ]);

                /**
                 * 上方向旋转成Oy轴方向
                 */

                // 转至xOy平面
                var sqrt = Math.sqrt(upX * upX + upZ * upZ),
                    cos = upX / sqrt,
                    sin = upZ / sqrt;
                cX = cZ * sin + cX * cos;
                cZ = cZ * cos - cX * sin;

                matrix4.multiply([
                    cos, 0, -sin, 0,
                    0, 1, 0, 0,
                    sin, 0, cos, 0,
                    0, 0, 0, 1
                ]);

                upX = sqrt * (upX > 0 ? 1 : -1);

                // 转至Oy轴上，正方向
                sqrt = Math.sqrt(upX * upX + upY * upY);
                cos = upY / sqrt;
                sin = upX / sqrt;
                cX = cX * cos - cY * sin;
                cY = cX * sin + cY * cos;

                matrix4.multiply([
                    cos, sin, 0, 0,
                    -sin, cos, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ]);

                /**
                 * 观察中心旋转至-Oz轴上
                 */

                // 转至yOz平面
                sqrt = Math.sqrt(cX * cX + cZ * cZ);
                cos = cZ / sqrt;
                sin = -cX / sqrt;

                matrix4.multiply([
                    cos, 0, -sin, 0,
                    0, 1, 0, 0,
                    sin, 0, cos, 0,
                    0, 0, 0, 1
                ]);

                cZ = sqrt * (cZ > 0 ? 1 : -1);

                // 转至Oz轴上，负方向
                sqrt = Math.sqrt(cY * cY + cZ * cZ);
                cos = -cX / sqrt;
                sin = -cZ / sqrt;

                matrix4.multiply([
                    1, 0, 0, 0,
                    0, cos, sin, 0,
                    0, -sin, cos, 0,
                    0, 0, 0, 1
                ]);

                return carmera;
            },

            // 获取视图矩阵数组表示
            "value": function () {
                return matrix4.value();
            }

        };

    return carmera;

};
