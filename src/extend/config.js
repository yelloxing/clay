/**
 * 扩展配置常规属性
 * 包括额外方法
 */
clay.config = function ($provider, content) {
    var param = [], i;
    if (content.constructor != Array) content = [content];
    for (i = 0; i < content.length - 1; i++) {
        param[i] = _service[content[i]] || undefined;
    }
    var config = content[content.length - 1].apply(this, param);
    _provider[$provider](config);
    return clay;
};
