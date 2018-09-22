// 由于clay专注绘图
// 其它方法不提供
// 实际开发可借助专门的库
// 或直接使用原生
// 我们不喜欢clay给你太多约束
// 你是自由的

/*
 ************************************
 * 对clay进行扩展
 */

// 绑定事件
clay.prototype.bind = function (eventType, callback, useCapture) {

    var flag;
    if (window.attachEvent) {
        for (flag = 0; flag < this.length; flag++)
            this[flag].attachEvent("on" + eventType, callback);
    } else {
        //默认捕获
        useCapture = useCapture || false;
        for (flag = 0; flag < this.length; flag++)
            this[flag].addEventListener(eventType, callback, useCapture);
    }
    return this;

};

/*
 ************************************
 * 辅助方法
 */

// 返回鼠标相对文档的位置
function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return { 'x': x, 'y': y };
}

function calcViewportLocation(element) {
    var currentWindow = window;
    var rect = element.getBoundingClientRect(); // 元素的位置
    var top = rect.top;
    var left = rect.left;
    while (currentWindow.frameElement != null) { // 处理父级 Window
        element = currentWindow.frameElement;
        currentWindow = currentWindow.parent;
        rect = element.getBoundingClientRect();
        if (rect.top > 0) { top += rect.top; }
        if (rect.left > 0) { left += rect.left; }
    }
    return [Math.round(left), Math.round(top)];
}
