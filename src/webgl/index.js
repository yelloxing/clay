// 获取webgl上下文
function _getCanvasWebgl(node, opts) {
    var names = _webgl_types,
        context = null, i;
    for (i = 0; i < names.length; i++) {
        try {
            context = node.getContext(names[i], opts);
        } catch (e) { }
        if (context) break;
    }
    return context;
}

// 启动webgl绘图
_clay_prototype.webgl = function (opts) {
    var gl = _getCanvasWebgl(this[0], opts),
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
                            if (_is_string(location)) location = gl.getAttribLocation(gl.program, location);
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
            },

            // 纹理
            "texture": function (unit, type) {
                type = type || gl.TEXTURE_2D;
                // 创建纹理
                var texture = _initTexture(gl, unit, type);
                var textureObj = {
                    // 配置纹理对象
                    "config": function (config) {
                        _configTexture(gl, type, config);
                        return textureObj;
                    },
                    // 链接图片资源
                    "use": function (level, format, textureType, image) {
                        _linkImage(gl, type, level, format, textureType, image);
                        return textureObj;
                    },
                    // 关闭纹理
                    "close": function () {
                        _deleteTexture(gl, texture);
                        return glObj;
                    }
                };
                return textureObj;
            }

        };

    return glObj;
};
