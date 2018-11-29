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
    var i;

    // 获取xhr对象
    var xhr = window.XMLHttpRequest ?
        // IE7+, Firefox, Chrome, Opera, Safari
        new XMLHttpRequest() :
        // IE6, IE5
        new ActiveXObject("Microsoft.XMLHTTP");

    // 打开请求地址
    xhr.open(config.type, config.url, true);

    // 设置超时时间
    xhr.timeout = config.timeout;

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
    if (typeof config.success == 'function') {
        xhr.onload = function () {
            config.success({
                "response": xhr.response,
                "status": xhr.status,
                "header": xhr.getAllResponseHeaders()
            });
        };
    }

    // 错误回调
    if (typeof config.error == 'function') {
        // 请求中出错回调
        xhr.onerror = function () {
            config.error({ "type": "error" });
        };
        // 请求超时回调
        xhr.ontimeout = function () {
            config.error({ "type": "timeout" });
        };
    }

    // 配置请求头
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
            "timeout": timeout || 300,
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
            "timeout": timeout || 300,
            "header": header || {}
        });
        return get;
    };
    return get;
};
