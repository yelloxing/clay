// 判断浏览器类型
var _browser = (function () {

    var userAgent = global.navigator.userAgent;
    if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        return "Opera";
    }
    if ((userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) ||
        (userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1)) {
        return "IE";
    }
    if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
    }
    if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    }
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    }
    return -1;

})();

// 判断IE浏览器版本
var _IE = (function () {

    // 如果不是IE浏览器直接返回
    if (_browser != 'IE') return -1;

    var userAgent = global.navigator.userAgent;
    if (userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1) return 11;

    if (/MSIE 10/.test(userAgent)) return 10;
    if (/MSIE 9/.test(userAgent)) return 9;
    if (/MSIE 8/.test(userAgent)) return 8;
    if (/MSIE 7/.test(userAgent)) return 7;

    // IE版本小于7
    return 6;
})();

// 针对不支持的浏览器给出提示
if (_IE < 9 && _browser == 'IE') throw new Error('IE browser version is too low, minimum support IE9!');
