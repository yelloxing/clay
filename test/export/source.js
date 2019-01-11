import default_clay from '../../build/export';
import {
    // 全局变量
    clay, $$,
    // 布局
    treeLayout, pieLayout,
    // 比例尺
    scaleLinear,
    // 坐标变换
    rotate, move, scale,
    // 曲线插值
    hermite, cardinal, catmullRom,
    // Matrix4矩阵
    Matrix4,
    // 地球坐标映射
    map,
    // 轮询
    animaion, loop
} from '../../build/export';

console.log(default_clay, clay, $$);
console.log(treeLayout, pieLayout);
console.log(scaleLinear);
console.log(rotate, move, scale);
console.log(hermite, cardinal, catmullRom);
console.log(Matrix4);
console.log(map);
console.log(animaion, loop);
