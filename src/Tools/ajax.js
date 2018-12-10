var _ajaxConfig = {
    "headers": {},
    "timeout": 3000,
    "context": "",
    "request": function (config) {
        return config;
    },
    "success": function (data, doback) {
        if (typeof doback == 'function') {
            doback(data);
        }
    },
    "error": function (error, doback) {
        if (typeof doback == 'function') {
            doback(error);
        }
    }
};
_provider.$httpProvider = function (config) {
    var row;
    for (row in config) {
        _ajaxConfig[row] = config[row];
    }
};

/**
 * XMLHttpRequest
 *
 * config={
 * "type":"POST"|"GET",
 * "url":地址,
 * "success":成功回调(非必须),
 * "error":错误回调(非必须),
 * "fileload":文件传输进度回调(非必须),
 * "timeout":超时时间,
 * "header":{
 *          //请求头
 *      },
 * "data":post时带的数据（非必须）
 * }
 */
var _ajax = function (config) {
    config = _ajaxConfig.request(config);
    var i;

    // 获取xhr对象
    var xhr = window.XMLHttpRequest ?
        // IE7+, Firefox, Chrome, Opera, Safari
        new XMLHttpRequest() :
        // IE6, IE5
        new ActiveXObject("Microsoft.XMLHTTP");

    // 打开请求地址
    if (!/^\//.test(config.url)) config.url = _ajaxConfig.context + "" + config.url;
    xhr.open(config.type, config.url, true);

    // 设置超时时间
    xhr.timeout = config.timeout || _ajaxConfig.timeout;

    // 文件传递进度回调
    if (typeof config.fileload == 'function') {
        var updateProgress = function (e) {
            if (e.lengthComputable)
                config.fileload(e.loaded / e.total);
        };
        xhr.onprogress = updateProgress;
        xhr.upload.onprogress = updateProgress;
    }

    // 请求成功回调
    xhr.onload = function () {
        _ajaxConfig.success({
            "response": xhr.response,
            "status": xhr.status,
            "header": xhr.getAllResponseHeaders()
        }, config.success);
    };

    // 错误回调
    // 请求中出错回调
    xhr.onerror = function () {
        _ajaxConfig.error({
            "type": "error"
        }, config.error);
    };
    // 请求超时回调
    xhr.ontimeout = function () {
        _ajaxConfig.error({
            "type": "timeout"
        }, config.error);
    };

    // 配置请求头
    for (i in _ajaxConfig.headers)
        xhr.setRequestHeader(i, _ajaxConfig.headers[i]);
    for (i in config.header)
        xhr.setRequestHeader(i, config.header[i]);

    // 发送请求
    xhr.send(config.data);
};

// post请求
clay.post = function (header, timeout) {
    var post = function (url, param, callback, errorback) {
        _ajax({
            "type": "POST",
            "url": url,
            "success": callback,
            "error": errorback,
            "timeout": timeout,
            "header": header || {},
            "data": param ? JSON.stringify(param) : ""
        });
        return post;
    };
    return post;
};

// get请求
clay.get = function (header, timeout) {
    var get = function (url, callback, errorback) {
        _ajax({
            "type": "GET",
            "url": url,
            "success": callback,
            "error": errorback,
            "timeout": timeout,
            "header": header || {}
        });
        return get;
    };
    return get;
};
