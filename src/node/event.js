clay.prototype.bind = function (eventType, callback) {

    var flag;
    if (window.attachEvent)
        for (flag = 0; flag < this.length; flag++)
            // 后绑定的先执行
            this[flag].attachEvent("on" + eventType, callback);
    else
        for (flag = 0; flag < this.length; flag++)
            // 捕获
            this[flag].addEventListener(eventType, callback, false);
    return this;

};

clay.prototype.unbind = function (eventType, callback) {

    var flag;
    if (window.detachEvent)
        for (flag = 0; flag < this.length; flag++)
            this[flag].detachEvent("on" + eventType, callback);
    else
        for (flag = 0; flag < this.length; flag++)
            this[flag].removeEventListener(eventType, callback, false);
    return this;
};

/*
 ************************************
 * 针对canvas的事件相关方法
 */
