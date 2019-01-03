// 照相机
clay.camera = function () {

    var scope = {};

    // 求解出最终的相机矩阵
    var camera = function () {
        var matrix;
        if (scope.e && scope.c && scope.u) {
            matrix = clay.Matrix4(_lookAt(
                scope.e[0], scope.e[1], scope.e[2],
                scope.c[0], scope.c[1], scope.c[2],
                scope.u[0], scope.u[1], scope.u[2]
            ));
        } else {
            matrix = clay.Matrix4();
        }
        if (scope.f && scope.b) {
            matrix.multiply(_orthogonal_projection(
                scope.b[3], scope.b[1],
                scope.b[0], scope.b[2],
                scope.f[0], scope.f[1]
            ));
        }
        return matrix.value();
    };

    // 视点
    camera.setEye = function (eX, eY, eZ) {
        scope.e = [eX, eY, eZ];
        return camera;
    };

    // 观察目标中心点
    camera.setCenter = function (cX, cY, cZ) {
        scope.c = [cX, cY, cZ];
        return camera;
    };

    // 上方向
    camera.setUp = function (upX, upY, upZ) {
        scope.u = [upX, upY, upZ];
        return camera;
    };

    // 设置裁剪面
    camera.setFace = function (near, far) {
        scope.f = [near, far];
        return camera;
    };

    // 设置边界
    camera.setBorder = function (top, right, bottom, left) {
        scope.b = [top, right, bottom, left];
        return camera;
    };

    return camera;

};
