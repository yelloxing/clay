// 获取webgl上下文
function _getCanvasWebgl(selector, opts) {
    if (selector && selector.constructor === WebGLRenderingContext) return selector;
    var canvas = clay(selector),
        names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
        context = null, i;
    if (canvas.length > 0) {
        for (i = 0; i < names.length; i++) {
            try {
                context = canvas[0].getContext(names[i], opts);
            } catch (e) { }
            if (context) break;
        }
    }
    return context;
}

// 获取3D画笔
clay.prototype.webgl = function (opts) {
    if (this.length > 0 && (this[0].nodeName != 'CANVAS' && this[0].nodeName != 'canvas'))
        throw new Error('Webgl is not a function!');
    return _getCanvasWebgl(this, opts);
};
