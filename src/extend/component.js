var _component = {
    // 挂载组件
};

/**
 * 记录挂载的组件
 * 包括预处理
 */
clay.component = function (name, content) {
    var param = [], i;
    if (content.constructor != Array) content = [content];
    for (i = 0; i < content.length - 1; i++) {
        param[i] = _service[content[i]] || undefined;
    }
    _component[name] = content[content.length - 1].apply(this, param);
    return clay;
};
