/**
 * 纹理方法
 * --------------------------------------------
 * 在绘制的多边形上贴图
 * 丰富效果
 */

// 初始化一个纹理对象
// type有两个选择gl.TEXTURE_2D代表二维纹理，gl.TEXTURE_CUBE_MAP 立方体纹理
var _initTexture = function (gl, unit, type) {
    // 创建纹理对象
    var texture = gl.createTexture();
    // 开启纹理单元，unit表示开启的编号
    gl.activeTexture(gl['TEXTURE' + unit]);
    // 绑定纹理对象到目标上
    gl.bindTexture(type, texture);
    return texture;
};

// 配置纹理
var _configTexture = function (gl, type, config) {
    var key;
    for (key in config) {
        /**
         *
         * 可配置项有四个：
         *  1. gl.TEXTURE_MAX_FILTER：放大方法
         *  2. gl.TEXTURE_MIN_FILTER：缩小方法
         *  3. gl.TEXTURE_WRAP_S：水平填充方法
         *  4. gl.TEXTURE_WRAP_T：垂直填充方法
         *
         */
        gl.texParameteri(type, gl[key], gl[config[key]]);
    }
};

// 链接资源图片
// level默认传入0即可，和金字塔纹理有关
// format表示图像的内部格式：
//      gl.RGB(红绿蓝)
//      gl.RGBA(红绿蓝透明度)
//      gl.ALPHA(0.0,0.0,0.0,透明度)
//      gl.LUMINANCE(L、L、L、1L:流明)
//      gl.LUMINANCE_ALPHA(L、L、L,透明度)
// textureType表示纹理数据的格式：
//      gl.UNSIGNED_BYTE: 表示无符号整形，每一个颜色分量占据1字节
//      gl.UNSIGNED_SHORT_5_6_5: 表示RGB，每一个分量分别占据占据5, 6, 5比特
//      gl.UNSIGNED_SHORT_4_4_4_4: 表示RGBA，每一个分量分别占据占据4, 4, 4, 4比特
//      gl.UNSIGNED_SHORT_5_5_5_1: 表示RGBA，每一个分量分别占据占据5比特，A分量占据1比特
var _linkImage = function (gl, type, level, format, textureType, image) {
    gl.texImage2D(type, level, format, format, textureType, image);
};

// 删除纹理
var _deleteTexture = function (gl, texture) {
    gl.deleteTexture(texture);
};
