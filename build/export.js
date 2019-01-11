import clay from './clay-core';

let treeLayout = clay.treeLayout;
let pieLayout = clay.pieLayout;

let scaleLinear = clay.scaleLinear;

let rotate = clay.rotate;
let move = clay.move;
let scale = clay.scale;

let hermite = clay.hermite;
let cardinal = clay.cardinal;
let catmullRom = clay.catmullRom;

let Matrix4 = clay.Matrix4;

let map = clay.map;

let animaion = clay.animaion;
let loop = clay.loop;

export {

    // 全局变量
    clay as default,
    clay,
    clay as $$,

    // 布局
    treeLayout,
    pieLayout,

    // 比例尺
    scaleLinear,

    // 坐标变换
    rotate,
    move,
    scale,

    // 曲线插值
    hermite,
    cardinal,
    catmullRom,

    // Matrix4矩阵
    Matrix4,

    // 地球坐标映射
    map,

    // 轮询
    animaion,
    loop

};
