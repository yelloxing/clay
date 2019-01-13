import default_clay from '../../build/export';
import {
    // 全局变量
    clay, $$,
    // 布局
    treeLayout,
    // 坐标变换
    rotate, move, scale,
    // 曲线插值
    hermite, cardinal, catmullRom,
    // Matrix4矩阵
    Matrix4,
    // 地球坐标映射
    map,
    // 轮询
    animation, loop
} from '../../build/export';

function doTest() {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i]) {
            console.log(arguments[i]);
        } else {
            console.error(arguments[i]);
        }
    }
}

doTest(default_clay, clay, $$);
doTest(treeLayout);
doTest(rotate, move, scale);
doTest(hermite, cardinal, catmullRom);
doTest(Matrix4);
doTest(map);
doTest(animation, loop);
