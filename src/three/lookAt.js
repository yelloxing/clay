//计算获得单位向量
var _getUnitVector = function (x, y, z) {
    var d = Math.sqrt(x * x + y * y + z * z);
    return [x / d, y / d, z / d];
},
    //计算获得v1,v2两个向量的叉积
    _getXMultiplyResult = function (v1, v2) {
        return [
            v1[1] * v2[2] - v1[2] * v2[1],
            v1[2] * v2[0] - v1[0] * v2[2],
            v1[0] * v2[1] - v1[1] * v2[0]
        ];
    };

// 视图
var _lookAt = function (
    // 视点
    eX, eY, eZ,
    // 观察目标中心点
    cX, cY, cZ,
    // 上方向
    upX, upY, upZ
) {
    eX = eX || 0; eY = eY || 0; eZ = eZ === 0 ? 0 : 1;
    cX = cX || 0; cY = cY || 0; cZ = cZ || 0;
    upX = upX || 0; upY = upY === 0 ? 0 : 1; upZ = upZ || 0;

    if (upX === 0 && upY === 0 && upZ === 0)
        throw new Error("The orientation above the camera cannot be a zero vector!");

    if (eX === cX && eY === cY && eZ === cZ)
        throw new Error("Viewpoint cannot coincide with target point!");

    //获得相机拍摄方向的单位向量
    var visualVector = _getUnitVector(cX - eX, cY - eY, cZ - eZ);
    //获得上方向的单位向量
    var upVector = _getUnitVector(upX, upY, upZ);
    //根据visualVector和upVector叉积，求得右手螺旋定则的另一轴单位向量（x轴）
    //visualVector X upVector
    var xRailVector = _getXMultiplyResult(visualVector, upVector);
    //计算该坐标系下原点位置
    var O = [eX + visualVector[0], eY + visualVector[1], eZ + visualVector[2]];
    /**
     * 由此可以根据物体原坐标[OriginX,OriginY,OriginZ],计算出物体新坐标 [x,y,z] ：
     *
     *      i               j               k         z轴与相机拍摄方向相反，故取负号
     *
     * xRailVector[0]   upVector[0]   -visualVector[0]       x     OriginX     O[0]
     * xRailVector[1]   upVector[1]   -visualVector[1]   X   y  =  OriginY  -  O[1]
     * xRailVector[2]   upVector[2]   -visualVector[2]       z     OriginZ     O[2]
     *
     * 简写形式： AX=Ox-B
     * 则         X=(A^-1)(Ox-B)
     *
     */
    return clay.Matrix4([
        xRailVector[0], xRailVector[1], xRailVector[2], 0,
        upVector[0], upVector[1], upVector[2], 0,
        -visualVector[0], -visualVector[1], -visualVector[2], 0,
        0, 0, 0, 1
    ]).inverse().multiply([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -O[0], -O[1], -O[2], 1
    ], true).value();
};
