(function (window, undefined) {

    'use strict';

    // 标签命名空间
    window.clay.namespace = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };

    // 绘图
    window.clay.svg = {};

    // 工具
    window.clay.math = {};

})(typeof window !== "undefined" ? window : this);