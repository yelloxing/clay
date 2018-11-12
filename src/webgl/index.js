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

// 启动webgl绘图
clay.prototype.webgl = function (opts) {
    if (this.length > 0 && (this[0].nodeName != 'CANVAS' && this[0].nodeName != 'canvas'))
        throw new Error('Webgl is not a function!');
    var gl = _getCanvasWebgl(this, opts),
        glObj = {
            "painter": function () {
                return gl;
            },

            // 启用着色器
            "shader": function (vshaderSource, fshaderSource) {
                gl.program = _useShader(gl, vshaderSource, fshaderSource);
                return glObj;
            },

            // 缓冲区
            "buffer": function (isElement) {
                // 创建缓冲区
                var buffer = _newBuffer(gl, isElement),
                    bufferData,
                    bufferObj = {
                        // 写入数据
                        "write": function (data, usage) {
                            usage = usage || gl.STATIC_DRAW;
                            _writeBuffer(gl, data, usage, isElement);
                            bufferData = data;
                            return bufferObj;
                        },
                        // 分配使用
                        "use": function (location, size, stride, offset, type, normalized) {
                            var fsize = bufferData.BYTES_PER_ELEMENT;
                            type = type || gl.FLOAT;
                            stride = stride || 0;
                            offset = offset || 0;
                            type = type || gl.FLOAT;
                            _useBuffer(gl, location, size, type, stride * fsize, offset * fsize, normalized);
                            return bufferObj;
                        },
                        // 关闭退出
                        "close": function () {
                            _deleteBuffer(gl, buffer);
                            return glObj;
                        }
                    };
                return bufferObj;
            }

        };

    return glObj;
};
