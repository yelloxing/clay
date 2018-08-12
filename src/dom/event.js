(function (window, $$, undefined) {

    'use strict';

    // 添加绑定事件
    $$.node.prototype.bind = function (eventType, callback, useCapture) {
        var flag;
        if (window.attachEvent) {
            for (flag = 0; flag < this.count; flag++) {
                this.collection[flag].attachEvent("on" + eventType, callback);
            }
        } else {
            //默认捕获
            useCapture = useCapture || false;
            for (flag = 0; flag < this.count; flag++) {
                this.collection[flag].addEventListener(eventType, callback, useCapture);
            }
        }
        return this;
    };

    // 解除绑定事件
    $$.node.prototype.unbind = function (eventType, callback, useCapture) {
        var flag;
        if (window.detachEvent) {
            for (flag = 0; flag < this.count; flag++) {
                this.collection[flag].detachEvent("on" + eventType, callback);
            }
        } else {
            //默认捕获
            useCapture = useCapture || false;
            for (flag = 0; flag < this.count; flag++) {
                this.collection[flag].removeEventListener(eventType, callback, useCapture);
            }
        }
        return this;
    };

    // 在特定元素上面触发特定事件
    $$.node.prototype.trigger = function (eventType, useCapture) {
        var event, flag;
        useCapture = useCapture || false;
        //创建event的对象实例。
        if (document.createEventObject) {
            // IE浏览器支持fireEvent方法
            event = document.createEventObject();
            for (flag = 0; flag < this.count; flag++) {
                this.collection[flag].fireEvent('on' + eventType, event);
            }
        } else {
            // 其他标准浏览器使用dispatchEvent方法
            event = document.createEvent('HTMLEvents');
            // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
            event.initEvent(eventType, !useCapture, false);
            for (flag = 0; flag < this.count; flag++) {
                this.collection[flag].dispatchEvent(event);
            }
        }
        return this;
    };

    // 取消冒泡事件
    $$.node.prototype.cancelBubble = function (event) {
        event = event || window.event;
        if (event && event.stopPropagation) { //这是其他非IE浏览器
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
        return this;
    };

    // 阻止默认事件
    $$.node.prototype.preventDefault = function (event) {
        event = event || window.event;
        if (event && event.stopPropagation) { //这是其他非IE浏览器
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
        return this;
    };

})(window, window.clay);