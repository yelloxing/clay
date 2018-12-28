// 二个4x4矩阵相乘
// 或矩阵和齐次坐标相乘
var _multiply = function (matrix4, param) {
    var newParam = [], i, j;
    for (i = 0; i < 4; i++)
        for (j = 0; j < param.length / 4; j++)
            newParam[j * 4 + i] =
                matrix4[i] * param[j * 4] +
                matrix4[i + 4] * param[j * 4 + 1] +
                matrix4[i + 8] * param[j * 4 + 2] +
                matrix4[i + 12] * param[j * 4 + 3];
    return newParam;
};

// 求一个矩阵的行列式（方阵）
// 4x4 或 3x3
var _determinant = function (matrixX) {

    // 3x3
    if (matrixX.length == 9) {
        return matrixX[0] * matrixX[4] * matrixX[8] -
            matrixX[0] * matrixX[7] * matrixX[5] -
            matrixX[3] * matrixX[1] * matrixX[8] +
            matrixX[3] * matrixX[7] * matrixX[2] +
            matrixX[6] * matrixX[1] * matrixX[5] -
            matrixX[6] * matrixX[4] * matrixX[2];
    }

    // 4x4
    else if (matrixX.length == 16) {
        return matrixX[0] * _determinant([
            matrixX[5], matrixX[6], matrixX[7],
            matrixX[9], matrixX[10], matrixX[11],
            matrixX[13], matrixX[14], matrixX[15]
        ]) -
            matrixX[4] * _determinant([
                matrixX[1], matrixX[2], matrixX[3],
                matrixX[9], matrixX[10], matrixX[11],
                matrixX[13], matrixX[14], matrixX[15]
            ]) +
            matrixX[8] * _determinant([
                matrixX[1], matrixX[2], matrixX[3],
                matrixX[5], matrixX[6], matrixX[7],
                matrixX[13], matrixX[14], matrixX[15]
            ]) -
            matrixX[12] * _determinant([
                matrixX[1], matrixX[2], matrixX[3],
                matrixX[5], matrixX[6], matrixX[7],
                matrixX[9], matrixX[10], matrixX[11]
            ]);
    }

    // 其它情况
    else {
        throw new Error('Unsupported parameter!');
    }

};

// 求一个4x4矩阵的全部代数余子式Aij
var _algebraic_cofactor = function (matrix4) {
    return [

        // 0
        _determinant([
            matrix4[5], matrix4[6], matrix4[7],
            matrix4[9], matrix4[10], matrix4[11],
            matrix4[13], matrix4[14], matrix4[15]
        ]),

        // 1
        -_determinant([
            matrix4[4], matrix4[6], matrix4[7],
            matrix4[8], matrix4[10], matrix4[11],
            matrix4[12], matrix4[14], matrix4[15]
        ]),

        // 2
        _determinant([
            matrix4[4], matrix4[5], matrix4[7],
            matrix4[8], matrix4[8], matrix4[11],
            matrix4[12], matrix4[13], matrix4[15]
        ]),

        // 3
        -_determinant([
            matrix4[4], matrix4[5], matrix4[6],
            matrix4[8], matrix4[9], matrix4[10],
            matrix4[12], matrix4[13], matrix4[14]
        ]),

        // 4
        -_determinant([
            matrix4[1], matrix4[2], matrix4[3],
            matrix4[9], matrix4[10], matrix4[11],
            matrix4[13], matrix4[14], matrix4[15]
        ]),

        // 5
        _determinant([
            matrix4[0], matrix4[2], matrix4[3],
            matrix4[8], matrix4[10], matrix4[11],
            matrix4[12], matrix4[14], matrix4[15]
        ]),

        // 6
        -_determinant([
            matrix4[0], matrix4[1], matrix4[3],
            matrix4[8], matrix4[9], matrix4[11],
            matrix4[12], matrix4[13], matrix4[15]
        ]),

        // 7
        _determinant([
            matrix4[0], matrix4[1], matrix4[2],
            matrix4[8], matrix4[9], matrix4[10],
            matrix4[12], matrix4[13], matrix4[14]
        ]),

        // 8
        _determinant([
            matrix4[1], matrix4[2], matrix4[3],
            matrix4[5], matrix4[6], matrix4[7],
            matrix4[13], matrix4[14], matrix4[15]
        ]),

        // 9
        -_determinant([
            matrix4[0], matrix4[2], matrix4[3],
            matrix4[4], matrix4[6], matrix4[7],
            matrix4[12], matrix4[14], matrix4[15]
        ]),

        // 10
        _determinant([
            matrix4[0], matrix4[1], matrix4[3],
            matrix4[4], matrix4[5], matrix4[7],
            matrix4[12], matrix4[13], matrix4[15]
        ]),

        // 11
        -_determinant([
            matrix4[0], matrix4[1], matrix4[2],
            matrix4[4], matrix4[5], matrix4[6],
            matrix4[12], matrix4[13], matrix4[14]
        ]),

        // 12
        -_determinant([
            matrix4[1], matrix4[2], matrix4[3],
            matrix4[5], matrix4[6], matrix4[7],
            matrix4[9], matrix4[10], matrix4[11]
        ]),

        // 13
        _determinant([
            matrix4[0], matrix4[2], matrix4[3],
            matrix4[4], matrix4[6], matrix4[7],
            matrix4[8], matrix4[10], matrix4[11]
        ]),

        // 14
        -_determinant([
            matrix4[0], matrix4[1], matrix4[3],
            matrix4[4], matrix4[5], matrix4[7],
            matrix4[8], matrix4[9], matrix4[11]
        ]),

        // 15
        _determinant([
            matrix4[0], matrix4[1], matrix4[2],
            matrix4[4], matrix4[5], matrix4[6],
            matrix4[8], matrix4[9], matrix4[10]
        ])
    ];
};

// 求一个4x4矩阵的伴随矩阵A*
var _adjoint_matrix = function (matrix4) {
    var algebraic_cofactor = _algebraic_cofactor(matrix4);
    return [
        algebraic_cofactor[0], algebraic_cofactor[4], algebraic_cofactor[8], algebraic_cofactor[12],
        algebraic_cofactor[1], algebraic_cofactor[5], algebraic_cofactor[9], algebraic_cofactor[13],
        algebraic_cofactor[2], algebraic_cofactor[6], algebraic_cofactor[10], algebraic_cofactor[14],
        algebraic_cofactor[3], algebraic_cofactor[7], algebraic_cofactor[11], algebraic_cofactor[15]
    ];
};

// 求一个4x4矩阵的逆矩阵A'
var _inverse_matrix = function (matrix4) {
    var adjoint = _adjoint_matrix(matrix4),
        determinant = _determinant(matrix4),
        flag, newMatrix4 = [];
    if (determinant == 0) throw new Error('This matrix is irreversible!');
    for (flag = 0; flag < 16; flag++)
        newMatrix4[flag] = adjoint[flag] / determinant;
    return newMatrix4;
};
