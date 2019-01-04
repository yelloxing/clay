/**
 * 扩展配置常规属性
 * 包括额外方法
 */
clay.config = function ($provider, content) {
    _provider[$provider](content);
    return clay;
};
