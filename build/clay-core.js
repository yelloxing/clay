/*!
* clay-core - Provide more flexible data visualization solutions!
* git+https://github.com/yelloxing/clay-core.git
* 
* author 心叶
*
* version 1.5.2next
* 
* build Sun Jul 29 2018
*
* Copyright yelloxing
* Released under the MIT license
* 
* Date:Thu Dec 13 2018 14:27:37 GMT+0800 (GMT+08:00)
*/
(function (global, factory) {

    'use strict';

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = function (target) {
            return factory(target || window);
        };
    } else {
        global.clay = global.$$ = factory(global);
    }

})(typeof window !== "undefined" ? window : this, function (global, undefined) {

    'use strict';

    var clay = function (selector, context) {
        return new clay.prototype.init(selector, context);
    };

    clay.prototype.init = function (selector, context) {

        this.context = context = context || document;
        var nodes = _sizzle(selector, context), flag;
        for (flag = 0; flag < nodes.length; flag++) {
            this[flag] = nodes[flag];
        }
        this.selector = selector;
        this.length = nodes.length;
        return this;

    };

    clay.prototype.init.prototype = clay.prototype;

    // 命名空间路径
var _namespace = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};

// 空格、标志符
var _regexp = {
    // http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace: "[\\x20\\t\\r\\n\\f]",
    // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    identifier: "(?:\\\\.|[\\w-]|[^\0-\\xa0])+"
};

// 记录需要使用xlink命名空间常见的xml属性
var _xlink = ["href", "title", "show", "type", "role", "actuate"];

// 嵌入内部提供者
var _provider = {};

var _out_sizzle;
_provider.$sizzleProvider = function (config) {
    _out_sizzle = config;
};

// 负责查找结点
function _sizzle(selector, context) {

    var temp = [], flag;
    if (typeof selector === 'string') {
        if (typeof _out_sizzle === 'function') return _out_sizzle(selector, context);
        // 去掉回车，空格和换行
        selector = (selector + "").trim().replace(/[\n\f\r]/g, '');

        // 支持的选择器包括：
        // #id .class [attr='value'] tagName
        // 包括任意组合
        // 如果选择全部元素，只可以传递一个*
        if (selector === "*") {
            return context.getElementsByTagName('*');
        }

        // 用于判断是否为合法选择器组合
        var whitespace = _regexp.whitespace,
            identifier = _regexp.identifier,
            attrReg = "\\[" + whitespace + "{0,}" + identifier + "(?:" + whitespace + "{0,}=" + whitespace + "{0,}(\\\'|\\\"){0,1}" + identifier + "\\1{0,1}){0,1}" + whitespace + "{0,}\\]",
            regexp = new RegExp("^(?:" + identifier + "){0,1}(?:(?:#|\\.)" + identifier + "|" + attrReg + "){0,}$");
        if (regexp.test(selector)) {

            // 分离出来四大选择器
            // 然后初始化容器
            var targetNodes,
                id = selector.match(new RegExp('#' + identifier, 'g')),
                cls = selector.match(new RegExp('\\.' + identifier, 'g')),
                tag = selector.match(new RegExp('^' + identifier)),
                attr = selector.match(new RegExp(attrReg, 'g'));
            if (id) {
                if (id.length > 1) {
                    return [];
                }
                // IE 6+, Firefox 3+, Safari 3+, Chrome 4+, and Opera 10+
                // 如果使用了id选择器，自动在全局查找
                targetNodes = document.getElementById((id.shift(0) + "").replace(/^#/, ''));
                targetNodes = targetNodes ? [targetNodes] : [];
            } else if (context.getElementsByClassName && cls) {

                // IE 9+, Firefox 3+, Safari4+, Chrome 4+, and Opera 10+
                targetNodes = context.getElementsByClassName((cls.shift(0) + "").replace(/^\./, ''));
            } else if (tag) {
                targetNodes = context.getElementsByTagName(tag.shift(0));
            } else {
                targetNodes = context.getElementsByTagName('*');
            }

            // 利用余下条件进行过滤
            // 只需要过滤class、tag和attr
            var t, x, y, f,
                attrSplit = "^\\[" + whitespace + "{0,}(" + identifier + ")(?:" + whitespace + "{0,}=" + whitespace + "{0,}(?:\\\'|\\\"){0,1}(" + identifier + ")(?:\\\'|\\\"){0,1}){0,1}" + whitespace + "{0,}\\]$",
                attrSplitReg = new RegExp(attrSplit);
            for (flag = 0; flag < targetNodes.length; flag++) {
                f = true;
                if (tag && tag.length > 0) {

                    // 由于标签tagName存在大小写的不同
                    // 比较的时候直接统一用大写
                    if ((tag[0] + "").toUpperCase() !== (targetNodes[flag].tagName + "").toUpperCase()) {
                        continue;
                    }
                }

                t = " " + targetNodes[flag].getAttribute('class') + " ";
                for (x = 0; f && cls && x < cls.length; x++) {
                    if (t.search(" " + (cls[x] + "").replace(/\./, '') + " ") < 0) {
                        f = false;
                        break;
                    }
                }

                for (x = 0; f && attr && x < attr.length; x++) {
                    t = attrSplitReg.exec(attr[x]);
                    y = targetNodes[flag].getAttribute(t[1]);
                    // 属性值写的时候需要相等
                    if (y === null || (t[2] && y != t[2])) {
                        f = false;
                        break;
                    }
                }
                if (f)
                    temp.push(targetNodes[flag]);
            }

            return temp;
        }

        // 其它情况一律认为希望把字符串变成结点
        else {
            try {
                return [_toNode(selector)];
            } catch (e) {
                return [];
            }
        }

    }
    // 如果是结点
    else if (selector && (selector.nodeType === 1 || selector.nodeType === 11 || selector.nodeType === 9)) {
        return [selector];
    }
    // 如果是结点集合
    else if (selector && (selector.constructor === Array || selector.constructor === HTMLCollection || selector.constructor === NodeList)) {
        for (flag = 0; flag < selector.length; flag++) {
            if (selector[flag] && (selector[flag].nodeType === 1 || selector[flag].nodeType === 11 || selector[flag].nodeType === 9)) {
                temp.push(selector[flag]);
            }
        }
        return temp;
    }
    // 如果是clay对象
    else if (selector && selector.constructor === clay) {
        return selector;
    } else {
        return [];
    }

}

// 把字符串变成结点
function _toNode(str) {
    var frame = document.createElementNS(_namespace.svg, 'svg');
    // 把传递元素类型和标记进行统一处理
    if (new RegExp("^" + _regexp.identifier + "$").test(str)) str = "<" + str + "></" + str + ">";
    frame.innerHTML = str;
    var childNodes = frame.childNodes, flag, child;
    for (flag = 0; flag < childNodes.length; flag++) {
        if (childNodes[flag].nodeType === 1 || childNodes[flag].nodeType === 9 || childNodes[flag].nodeType === 11) {
            child = childNodes[flag];
            break;
        }
    }
    // 如果不是svg元素，重新用html命名空间创建
    // 目前结点只考虑了svg元素和html元素
    // 如果考虑别的元素类型需要修改此处判断方法
    if (!child || child.tagName == 'canvas' || /[A-Z]/.test(child.tagName)) {
        frame = document.createElement("div");
        frame.innerHTML = str;
        childNodes = frame.childNodes;
        for (flag = 0; flag < childNodes.length; flag++) {
            if (childNodes[flag].nodeType === 1 || childNodes[flag].nodeType === 9 || childNodes[flag].nodeType === 11) {
                child = childNodes[flag];
                break;
            }
        }
    }
    return child;
}

// 当前维护的第一个结点作为上下文查找
clay.prototype.find = function (selector) {
    if (this.length <= 0) return clay();
    var newClay = clay(),
        nodes = _sizzle(selector, this[0]), flag;
    newClay.selector = selector;
    for (flag = 0; flag < nodes.length; flag++) {
        newClay[flag] = nodes[flag];
        newClay.length += 1;
    }
    return newClay;
};

clay.prototype.eq = function (flag) {
    return this.length <= flag ? new clay() : new clay(this[flag]);
};

clay.prototype.appendTo = function (target) {

    var newClay = clay(target), i, j;
    for (i = 0; i < newClay.length; i++)
        for (j = 0; j < this.length; j++)
            newClay[i].appendChild(this[j]);
    return this;
};

clay.prototype.remove = function () {

    var flag;
    for (flag = 0; flag < this.length; flag++)
        this[flag].parentNode.removeChild(this[flag]);
    return this;
};

// 选择器重新查找一次
clay.prototype.refresh = function () {

    var nodes = _sizzle(this.selector, this.context), flag, length = this.length;
    this.length = 0;
    for (flag = 0; flag < nodes.length; flag++) {
        this[flag] = nodes[flag];
        this.length += 1;
    }
    for (; flag < length; flag++) {
        delete this[flag];
    }
    return this;
};

clay.prototype.attr = function (attr, val) {

    if (val == null || val == undefined) {
        return this.length > 0 ? this[0].getAttribute(attr) : undefined;
    } else {
        var flag, _val;
        for (flag = 0; flag < this.length; flag++) {
            _val = typeof val === 'function' ? val(this[flag]._data, flag, this.eq(flag)) : val;
            // 如果是xml元素
            // 针对xlink使用特殊方法赋值
            if (/[A-Z]/.test(this[flag].tagName) && _xlink.indexOf(attr) >= 0) {
                this[flag].setAttributeNS(_namespace.xlink, 'xlink:' + attr, _val);
            } else {
                this[flag].setAttribute(attr, _val);
            }
        }
        return this;
    }
};

clay.prototype.css = function (name, style) {

    if (arguments.length <= 1 && typeof name !== 'object') {
        if (this.length < 1) return undefined;
        var allStyle = document.defaultView && document.defaultView.getComputedStyle ?
            document.defaultView.getComputedStyle(this[0], null) :
            this[0].currentStyle;
        return typeof name === 'string' ?
            allStyle.getPropertyValue(name) :
            allStyle;
    } else if (this.length > 0) {
        var flag, key;
        if (typeof name === 'object') {
            for (key in name)
                for (flag = 0; flag < this.length; flag++)
                    this[flag].style[key] = typeof style === 'function' ? style(this[flag]._data, flag, key, name[key]) : name[key];
        } else {
            for (flag = 0; flag < this.length; flag++)
                this[flag].style[name] = typeof style === 'function' ? style(this[flag]._data, flag) : style;
        }
    }
    return this;

};

clay.prototype.size = function (type) {
    type = type || "border";
    var elemHeight, elemWidth;
    if (type == 'content') { //内容
        elemWidth = this[0].clientWidth - ((this.css('padding-left') + "").replace('px', '')) - ((this.css('padding-right') + "").replace('px', ''));
        elemHeight = this[0].clientHeight - ((this.css('padding-top') + "").replace('px', '')) - ((this.css('padding-bottom') + "").replace('px', ''));
    } else if (type == 'padding') { //内容+内边距
        elemWidth = this[0].clientWidth;
        elemHeight = this[0].clientHeight;
    } else if (type == 'border') { //内容+内边距+边框
        elemWidth = this[0].offsetWidth;
        elemHeight = this[0].offsetHeight;
    } else if (type == 'scroll') { //滚动的宽（不包括border）
        elemWidth = this[0].scrollWidth;
        elemHeight = this[0].scrollHeight;
    }
    return {
        width: elemWidth,
        height: elemHeight
    };
};

// 用于把数据绑定到一组结点或返回第一个结点数据
// 可以传递函数对数据处理
clay.prototype.datum = function (data, calcback) {

    if (data === null || data === undefined) {
        return this.length > 0 ? this[0]._data : undefined;
    } else {
        var flag;
        for (flag = 0; flag < this.length; flag++) {
            data = typeof calcback === 'function' ? calcback(data, flag) : data;
            this[flag]._data = data;
        }
        return this;
    }

};
// 用于把一组数据绑定到一组结点或返回一组结点数据
// 可以传递函数对数据处理
clay.prototype.data = function (datas, calcback) {

    var flag, temp = [];
    if (datas && datas.constructor === Array) {
        // 创建新的对象返回，不修改原来对象
        var newClay = clay();
        newClay.selector = this.selector;
        for (flag = 0; flag < datas.length && flag < this.length; flag++) {
            this[flag]._data = typeof calcback === 'function' ? calcback(datas[flag], flag) : datas[flag];
            newClay[flag] = this[flag];
            newClay.length += 1;
        }
        // 分别记录需要去平衡的数据和结点
        newClay._enter = [];
        for (; flag < datas.length; flag++) {
            newClay._enter.push(typeof calcback === 'function' ? calcback(datas[flag], flag) : datas[flag]);
        }
        newClay._exit = [];
        for (; flag < this.length; flag++) {
            newClay._exit.push(this[flag]);
        }
        return newClay;
    } else {
        // 获取数据
        for (flag = 0; flag < this.length; flag++) {
            temp[flag] = this[flag]._data;
        }
        return temp;
    }

};
// 把过滤出来多于结点的数据部分变成结点返回
// 需要传递一个字符串来标明新创建元素是什么
clay.prototype.enter = function (str) {

    var flag, node, newClay = clay();
    newClay.selector = this.selector;
    for (flag = 0; this._enter && flag < this._enter.length; flag++) {
        node = _toNode(str);
        node._data = this._enter[flag];
        newClay[flag] = node;
        newClay.length += 1;
    }
    delete this._enter;
    return newClay;

};
// 把过滤出来多于数据的结点部分返回
clay.prototype.exit = function () {

    var flag, newClay = clay();
    newClay.selector = this.selector;
    for (flag = 0; this._exit && flag < this._exit.length; flag++) {
        newClay[flag] = this._exit[flag];
        newClay.length += 1;
    }
    delete this._exit;
    return newClay;

};

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

clay.prototype.trigger = function (eventType) {
    var flag, event;

    //创建event的对象实例。
    if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        event = document.createEventObject();
        for (flag = 0; flag < this.length; flag++) {
            this[flag].fireEvent('on' + eventType, event);
        }
    }

    // 其他标准浏览器使用dispatchEvent方法
    else {
        event = document.createEvent('HTMLEvents');
        // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
        event.initEvent(eventType, true, false);
        for (flag = 0; flag < this.length; flag++) {
            this[flag].dispatchEvent(event);
        }
    }

    return this;
};

/*
 ************************************
 * 事件相关计算方法
 */

//  获取鼠标相对特定元素左上角位置
clay.prototype.position = function (event) {

    var bounding = this[0].getBoundingClientRect();

    return {
        "x": event.clientX - bounding.left,
        "y": event.clientY - bounding.top
    };

};

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

// 获取函数名称
// 部分旧浏览器不支持
if ('name' in Function.prototype === false) {
    // https://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
    Object.defineProperty(Function.prototype, 'name', {
        get: function () {
            return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1];
        }
    });
}

// 表示二个正的浮点数之间的最新差值
// 你可以由此判断二个浮点数是否相对
// （因为js浮点运算都不是准确的，不可以简单的等号判断）
// 老火狐和IE不支持
if (Number.EPSILON === undefined) {
    // https://www.ecma-international.org/ecma-262/6.0/#sec-number.epsilon
    Number.EPSILON = Math.pow(2, - 52);
}

// 判断是不是整数
// IE浏览器不支持
if (Number.isInteger === undefined) {
    Number.isInteger = function (value) {
        // https://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };
}

var _innerHTML = {
    get: function () {
        var frame = document.createElement("div"), i;
        for (i = 0; i < this.childNodes.length; i++) {
            // 深度克隆，克隆节点以及节点下面的子内容
            frame.appendChild(this.childNodes[i].cloneNode(true));
        }
        return frame.innerHTML;
    },
    set: function (svgstring) {
        var frame = document.createElement("div"), i;
        frame.innerHTML = svgstring;
        var toSvgNode = function (htmlNode) {
            var svgNode = document.createElementNS(_namespace.svg, (htmlNode.tagName + "").toLowerCase());
            var attrs = htmlNode.attributes, i, svgNodeClay = clay(svgNode);
            for (i = 0; attrs && i < attrs.length; i++) {
                svgNodeClay.attr(attrs[i].nodeName, htmlNode.getAttribute(attrs[i].nodeName));
            }
            return svgNode;
        };
        var rslNode = toSvgNode(frame.firstChild);
        (function toSVG(pnode, svgPnode) {
            var node = pnode.firstChild;
            if (node && node.nodeType == 3) {
                svgPnode.textContent = pnode.innerText;
                return;
            }
            while (node) {
                var svgNode = toSvgNode(node);
                svgPnode.appendChild(svgNode);
                if (node.firstChild) toSVG(node, svgNode);
                node = node.nextSibling;
            }
        })(frame.firstChild, rslNode);
        this.appendChild(rslNode);
    }
};

// 针对部分浏览器svg上没有innerHTML进行加强
if ('innerHTML' in SVGElement.prototype === false) {
    Object.defineProperty(SVGElement.prototype, 'innerHTML', _innerHTML);
}
if ('innerHTML' in SVGSVGElement.prototype === false) {
    Object.defineProperty(SVGSVGElement.prototype, 'innerHTML', _innerHTML);
}

// 兼容老IE浏览器
// 请不要使用event.srcElement获取
// https://dom.spec.whatwg.org/#dom-event-srcelement
if ('target' in Event.prototype === false) {
    Object.defineProperty(Event.prototype, 'target', {
        get: function () {
            return this.srcElement;
        }
    });
}

// 取消冒泡事件
// 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理
// 此方法不会影响当前节点中的任何事件侦听器
// 如果需要取消包括本结点的方法，应该使用stopImmediatePropagation()
// https://dom.spec.whatwg.org/#dom-event-stopimmediatepropagation
if ('stopPropagation' in Event.prototype === false) {
    Event.prototype.stopPropagation = function () {
        this.cancelBubble = true;
    };
}

// 阻止默认事件
// https://dom.spec.whatwg.org/#dom-event-preventdefault
if ('preventDefault' in Event.prototype === false) {
    Event.prototype.preventDefault = function () {
        this.returnValue = false;
    };
}

var _clock = {
    //当前正在运动的动画的tick函数堆栈
    timers: [],
    //唯一定时器的定时间隔
    interval: 13,
    //指定了动画时长duration默认值
    speeds: 400,
    //定时器ID
    timerId: null
};

// 提供间隔执行方法
clay.animation = function (doback, duration, callback) {
    _clock.timer(function (deep) {
        //其中deep为0-1，表示改变的程度
        doback(deep);
    }, duration, callback);
};

//把tick函数推入堆栈
_clock.timer = function (tick, duration, callback) {
    if (typeof tick !== 'function') {
        throw new Error('tick is required!');
    }
    duration = typeof duration === 'number' ? duration : _clock.speeds;
    if (duration < 0) duration = -duration;
    _clock.timers.push({
        "createTime": new Date(),
        "tick": tick,
        "duration": duration,
        "callback": callback
    });
    _clock.start();
};

//开启唯一的定时器timerId
_clock.start = function () {
    if (!_clock.timerId) {
        _clock.timerId = setInterval(_clock.tick, _clock.interval);
    }
};

//被定时器调用，遍历timers堆栈
_clock.tick = function () {
    var createTime, flag, tick, callback, timer, duration, passTime, needStop, deep,
        timers = _clock.timers;
    _clock.timers = [];
    _clock.timers.length = 0;
    for (flag = 0; flag < timers.length; flag++) {
        //初始化数据
        timer = timers[flag];
        createTime = timer.createTime;
        tick = timer.tick;
        duration = timer.duration;
        callback = timer.callback;
        needStop = false;

        //执行
        passTime = (+new Date() - createTime) / duration;
        if (passTime >= 1) {
            needStop = true;
        }
        passTime = passTime > 1 ? 1 : passTime;
        deep = passTime;
        tick(deep);
        if (passTime < 1) {
            //动画没有结束再添加
            _clock.timers.push(timer);
        } else if (callback) {
            callback();
        }
    }
    if (_clock.timers.length <= 0) {
        _clock.stop();
    }
};

//停止定时器，重置timerId=null
_clock.stop = function () {
    if (_clock.timerId) {
        clearInterval(_clock.timerId);
        _clock.timerId = null;
    }
};

// 把颜色统一转变成rgba(x,x,x,x)格式
// 返回数字数组[r,g,b,a]
clay.color = function (color) {
    var temp = clay('head').css('color', color).css('color').replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,' + _regexp.whitespace));
    return [+temp[0], +temp[1], +temp[2], temp[3] == undefined ? 1 : +temp[3]];
};

// 获取一组色彩
clay.getColors = function (num) {
    if (typeof num == 'number' && num > 3) {
        var temp = [], flag = 0;
        for (flag = 1; flag <= num; flag++)
            temp.push('rgb(' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ')');
        return temp;
    } else {
        return ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)'];
    }
};

// 给一组数据，轮询执行一遍
clay.loop = function (datas, callback) {
    var flag = 0, data;
    for (data in datas)
        callback(datas[data], data, flag++);
    return clay;
};

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

// 用特定色彩绘制区域
var _drawerRegion = function (pen, color, drawback, regionManger) {
    pen.beginPath();
    pen.fillStyle = color;
    pen.strokeStyle = color;
    if (typeof drawback != "function") return pen;
    drawback(pen);
    return regionManger;
};

// 区域对象，用于存储区域信息
// 初衷是解决类似canvas交互问题
// 可以用于任何标签的区域控制
clay.prototype.region = function () {

    var regions = {},//区域映射表
        canvas = document.createElement('canvas'),
        rgb = [0, 0, 0],//区域标识色彩,rgb(0,0,0)表示空白区域
        p = 'r';//色彩增值位置

    canvas.setAttribute('width', this[0].offsetWidth);//内容+内边距+边框
    canvas.setAttribute('height', this[0].offsetHeight);

    var _this = this;

    // 用于计算包含关系的画板
    var canvas2D = canvas.getContext("2d"),

        regionManger = {

            // 绘制（添加）区域范围
            /**
             * region_id：区域唯一标识（一个标签上可以维护多个区域）
             * type：扩展区域类型
             * data：区域位置数据
             */
            "drawer": function (region_id, drawback) {
                if (regions[region_id] == undefined) regions[region_id] = {
                    'r': function () {
                        rgb[0] += 1;
                        p = 'g';
                        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                    },
                    'g': function () {
                        rgb[1] += 1;
                        p = 'b';
                        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                    },
                    'b': function () {
                        rgb[2] += 1;
                        p = 'r';
                        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                    }
                }[p]();
                return _drawerRegion(canvas2D, regions[region_id], drawback, regionManger);
            },

            // 擦除区域范围
            "erase": function (drawback) {
                return _drawerRegion(canvas2D, 'rgb(0,0,0)', drawback, regionManger);
            },

            // 获取此刻鼠标所在区域
            "getRegion": function (event) {
                var pos = _this.position(event), i;
                pos.x -= _this.css('border-left-width').replace('px', '');
                pos.y -= _this.css('border-top-width').replace('px', '');
                var currentRGBA = canvas2D.getImageData(pos.x - 0.5, pos.y - 0.5, 1, 1).data;
                for (i in regions) {
                    if ("rgb(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + ")" == regions[i]) {
                        return [i, pos.x, pos.y];
                    }
                }
                return undefined;
            }
        };

    return regionManger;

};

// 获取canvas2D对象
function _getCanvas2D(selector) {
    if (selector && selector.constructor === CanvasRenderingContext2D)
        return selector;
    else {
        var canvas = clay(selector);
        if (canvas.length > 0)
            return canvas[0].getContext("2d");
    }
}

// 直接使用canvas2D绘图
clay.prototype.painter = function () {
    if (this.length > 0 && (this[0].nodeName != 'CANVAS' && this[0].nodeName != 'canvas'))
        throw new Error('painter is not function');
    return _getCanvas2D(this);
};

// 使用图层绘图
clay.prototype.layer = function () {
    if (this.length > 0 && (this[0].nodeName != 'CANVAS' && this[0].nodeName != 'canvas'))
        throw new Error('layer is not function');
    // 画笔
    var painter = _getCanvas2D(this),
        canvas = [],
        // 图层集合
        layer = {};
    var width = this[0].clientWidth,//内容+内边距
        height = this[0].clientHeight;
    var layerManager = {
        "painter": function (index) {
            if (!layer[index] || layer[index].constructor !== CanvasRenderingContext2D) {

                canvas.push(document.createElement('canvas'));
                // 设置大小才会避免莫名其妙的错误
                canvas[canvas.length - 1].setAttribute('width', width);
                canvas[canvas.length - 1].setAttribute('height', height);

                layer[index] = canvas[canvas.length - 1].getContext('2d');
            }
            return layer[index];
        },
        "clean": function (ctx2D) {
            if (ctx2D) {
                if (ctx2D.constructor !== CanvasRenderingContext2D)
                    ctx2D = layerManager.painter(ctx2D);
                ctx2D.clearRect(0, 0, width, height);
            }
            return layerManager;
        },
        "update": function () {
            if (painter && painter.constructor === CanvasRenderingContext2D) {
                var flag;
                painter.clearRect(0, 0, width, height);
                painter.save();
                // 混合模式等先不考虑
                for (flag = 0; flag < canvas.length; flag++) {
                    painter.drawImage(canvas[flag], 0, 0, width, height, 0, 0, width, height);
                }
                painter.restore();
            }
            return layerManager;
        }
    };

    return layerManager;

};

// 在(a,b,c)方向位移d
var _move = function (d, a, b, c) {
    c = c || 0;
    var sqrt = Math.sqrt(a * a + b * b + c * c);
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        a * d / sqrt, b * d / sqrt, c * d / sqrt, 1
    ];
};

// 围绕0Z轴旋转
// 其它的旋转可以借助transform实现
// 旋转角度单位采用弧度制
var _rotate = function (deg) {
    var sin = Math.sin(deg),
        cos = Math.cos(deg);
    return [
        cos, sin, 0, 0,
        -sin, cos, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
};

// 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
var _scale = function (xTimes, yTimes, zTimes, cx, cy, cz) {
    cx = cx || 0; cy = cy || 0; cz = cz || 0;
    return [
        xTimes, 0, 0, 0,
        0, yTimes, 0, 0,
        0, 0, zTimes, 0,
        cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1
    ];
};

// 针对任意射线(a1,b1,c1)->(a2,b2,c2)
// 计算出二个变换矩阵
// 分别为：任意射线变成OZ轴变换矩阵 + OZ轴变回原来的射线的变换矩阵
var _transform = function (a1, b1, c1, a2, b2, c2) {

    if (typeof a1 === 'number' && typeof b1 === 'number') {

        // 如果设置二个点
        // 表示二维上围绕某个点旋转
        if (typeof c1 !== 'number') {
            c1 = 0; a2 = a1; b2 = b1; c2 = 1;
        }
        // 只设置三个点(设置不足六个点都认为只设置了三个点)
        // 表示围绕从原点出发的射线旋转
        else if (typeof a2 !== 'number' || typeof b2 !== 'number' || typeof c2 !== 'number') {
            a2 = a1; b2 = b1; c2 = c1; a1 = 0; b1 = 0; c1 = 0;
        }

        if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error('It\'s not a legitimate ray!');

        var sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
            cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
            sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,

            b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
            c = c2 - c1,

            sqrt2 = Math.sqrt(b * b + c * c),
            cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
            sin2 = sqrt2 != 0 ? b / sqrt2 : 0;

        return [

            // 任意射线变成OZ轴变换矩阵
            [
                cos1, cos2 * sin1, sin1 * sin2, 0,
                -sin1, cos1 * cos2, cos1 * sin2, 0,
                0, -sin2, cos2, 0,
                b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1
            ],

            // OZ轴变回原来的射线的变换矩阵
            [
                cos1, -sin1, 0, 0,
                cos2 * sin1, cos2 * cos1, -sin2, 0,
                sin1 * sin2, cos1 * sin2, cos2, 0,
                a1, b1, c1, 1
            ]

        ];
    } else {
        throw new Error('a1 and b1 is required!');
    }
};

// 二个4x4矩阵相乘
// 或矩阵和齐次坐标相乘
var _multiply = function (matrix4, param) {
    var newParam = [], i, j;
    for (i = 0; i < 4; i++)
        for (j = 0; j < param.length / 4; j++)
            newParam[j * 4 + i] =
                matrix4[i] * param[j * 4] +
                matrix4[i + 4] * param[j * 4 + 1] +
                matrix4[i + 8] * param[j * 4 + 2] +
                matrix4[i + 12] * param[j * 4 + 3];
    return newParam;
};

/**
 * 4x4矩阵
 * 列主序存储
 */
clay.Matrix4 = function (initMatrix4) {

    var matrix4 = initMatrix4 || [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    var matrix4Obj = {
        "move": function (dis, a, b, c) {
            matrix4 = _multiply(_move(dis, a, b, c), matrix4);
            return matrix4Obj;
        },
        "rotate": function (deg, a1, b1, c1, a2, b2, c2) {
            var matrix4s = _transform(a1, b1, c1, a2, b2, c2);
            matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
            return matrix4Obj;
        },
        "scale": function (xTimes, yTimes, zTimes, cx, cy, cz) {
            matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
            return matrix4Obj;
        },
        // 乘法
        // 可以传入一个矩阵(matrix4,flag)
        "multiply": function (newMatrix4, flag) {
            matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
            return matrix4Obj;
        },
        // 对一个坐标应用变换
        // 齐次坐标(x,y,z,w)
        "use": function (x, y, z, w) {
            // w为0表示点位于无穷远处，忽略
            z = z || 0; w = w || 1;
            var temp = _multiply(matrix4, [x, y, z, w]);
            temp[0] = temp[0].toFixed(7);
            temp[1] = temp[1].toFixed(7);
            temp[2] = temp[2].toFixed(7);
            return temp;
        },
        "value": function () {
            return matrix4;
        }
    };

    return matrix4Obj;
};

// Hermite三次插值
clay.hermite = function () {

    var scope = { "u": 0.5 };

    // 根据x值返回y值
    var hermite = function (x) {

        if (scope.MR) {
            var sx = (x - scope.a) / (scope.b - scope.a),
                sx2 = sx * sx,
                sx3 = sx * sx2;
            var sResult = sx3 * scope.MR[0] + sx2 * scope.MR[1] + sx * scope.MR[2] + scope.MR[3];
            return sResult * (scope.b - scope.a);
        } else {
            throw new Error('You shoud first set the position!');
        }

    };

    // 设置张弛系数【应该在点的位置设置前设置】
    hermite.setU = function (t) {

        if (typeof t === 'number') {
            scope.u = (1 - t) * 0.5;
        } else {
            throw new Error('Expecting a figure!');
        }
        return hermite;

    };

    // 设置点的位置
    hermite.setP = function (x1, y1, x2, y2, s1, s2) {

        if (x1 < x2) {
            // 记录原始尺寸
            scope.a = x1; scope.b = x2;
            var p3 = scope.u * s1,
                p4 = scope.u * s2;
            // 缩放到[0,1]定义域
            y1 /= (x2 - x1);
            y2 /= (x2 - x1);
            // MR是提前计算好的多项式通解矩阵
            // 为了加速计算
            // 如上面说的
            // 统一在[0,1]上计算后再通过缩放和移动恢复
            // 避免了动态求解矩阵的麻烦
            scope.MR = [
                2 * y1 - 2 * y2 + p3 + p4,
                3 * y2 - 3 * y1 - 2 * p3 - p4,
                p3,
                y1
            ];
        } else {
            throw new Error('The point position should be increamented!');
        }
        return hermite;

    };

    return hermite;
};

clay.cardinal = function () {

    var scope = { "t": 0 };

    // 根据x值返回y值
    var i;
    var cardinal = function (x) {

        if (scope.hs) {
            i = -1;
            // 寻找记录x实在位置的区间
            // 这里就是寻找对应的拟合函数
            while (i + 1 < scope.hs.x.length && (x > scope.hs.x[i + 1] || (i == -1 && x >= scope.hs.x[i + 1]))) {
                i += 1;
            }
            if (i == -1 || i >= scope.hs.h.length)
                throw new Error('Coordinate crossing!');
            return scope.hs.h[i](x);
        } else {
            throw new Error('You shoud first set the position!');
        }

    };

    // 设置张弛系数【应该在点的位置设置前设置】
    cardinal.setU = function (t) {

        if (typeof t === 'number') {
            scope.t = t;
        } else {
            throw new Error('Expecting a figure!');
        }
        return cardinal;

    };

    // 设置点的位置
    // 参数格式：[[x,y],[x,y],...]
    // 至少二个点
    cardinal.setP = function (points) {

        scope.hs = {
            "x": [],
            "h": []
        };
        var flag,
            slope = (points[1][1] - points[0][1]) / (points[1][0] - points[0][0]),
            temp;
        scope.hs.x[0] = points[0][0];
        for (flag = 1; flag < points.length; flag++) {
            if (points[flag][0] <= points[flag - 1][0]) throw new Error('The point position should be increamented!');
            scope.hs.x[flag] = points[flag][0];
            // 求点斜率
            temp = flag < points.length - 1 ?
                (points[flag + 1][1] - points[flag - 1][1]) / (points[flag + 1][0] - points[flag - 1][0]) :
                (points[flag][1] - points[flag - 1][1]) / (points[flag][0] - points[flag - 1][0]);
            // 求解二个点直接的拟合方程
            // 第一个点的前一个点直接取第一个点
            // 最后一个点的后一个点直接取最后一个点
            scope.hs.h[flag - 1] = clay.hermite().setU(scope.t).setP(points[flag - 1][0], points[flag - 1][1], points[flag][0], points[flag][1], slope, temp);
            slope = temp;
        }
        return cardinal;

    };

    return cardinal;
};

clay.catmullRom = function () {

    var scope = {};

    // deep为偏移量  deep的取值范围为[0,1]，deep取0将得出p1点，deep取1将得出p2点
    var catmull = function (deep) {
        var deep2 = deep * deep, deep3 = deep2 * deep;
        return [
            0.5 * (scope.x[0] * deep3 + scope.x[1] * deep2 + scope.x[2] * deep + scope.x[3]),
            0.5 * (scope.y[0] * deep3 + scope.y[1] * deep2 + scope.y[2] * deep + scope.y[3])
        ];
    };

    // 设置一组点
    // 四个点 p1,p2,p3,p4
    catmull.setP = function (p1, p2, p3, p4) {
        scope.x = clay.Matrix4([-1, 2, -1, 0, 3, -5, 0, 2, -3, 4, 1, 0, 1, -1, 0, 0]).use(p1[0], p2[0], p3[0], p4[0]);
        scope.y = clay.Matrix4([-1, 2, -1, 0, 3, -5, 0, 2, -3, 4, 1, 0, 1, -1, 0, 0]).use(p1[1], p2[1], p3[1], p4[1]);
        return catmull;
    };

    return catmull;
};

var
    // 围绕X轴旋转
    _rotateX = function (deg, x, y, z) {
        var cos = Math.cos(deg), sin = Math.sin(deg);
        return [x, y * cos - z * sin, y * sin + z * cos];
    },
    // 围绕Y轴旋转
    _rotateY = function (deg, x, y, z) {
        var cos = Math.cos(deg), sin = Math.sin(deg);
        return [z * sin + x * cos, y, z * cos - x * sin];
    },
    // 围绕Z轴旋转
    _rotateZ = function (deg, x, y, z) {
        var cos = Math.cos(deg), sin = Math.sin(deg);
        return [x * cos - y * sin, x * sin + y * cos, z];
    };

/**
 * 把地球看成一个半径为100px的圆球
 * 等角斜方位投影
 */
clay.map = function () {

    var scope = {
        // 投影中心经纬度
        c: [107, 36],
        // 缩放比例
        s: 1
    }, p;

    // 计算出来的位置是偏离中心点的距离
    var map = function (longitude, latitude) {
        /**
        * 通过旋转的方法
        * 先旋转出点的位置
        * 然后根据把地心到旋转中心的这条射线变成OZ这条射线的变换应用到初始化点上
        * 这样求的的点的x,y就是最终结果
        *
        *  计算过程：
        *  1.初始化点的位置是p（x,0,0）,其中x的值是地球半径除以缩放倍速
        *  2.根据点的纬度对p进行旋转，旋转后得到的p的坐标纬度就是目标纬度
        *  3.同样的对此刻的p进行经度的旋转，这样就获取了极点作为中心点的坐标
        *  4.接着想象一下为了让旋转中心移动到极点需要进行旋转的经纬度是多少，记为lo和la
        *  5.然后再对p进行经度度旋转lo获得新的p
        *  6.然后再对p进行纬度旋转la获得新的p
        *  7.旋转结束
        *
        * 特别注意：第5和第6步顺序一定不可以调换，原因来自经纬度定义上
        * 【除了经度为0的位置，不然纬度的旋转会改变原来的经度值，反过来不会】
        *
        */
        p = _rotateY((360 - latitude) / 180 * Math.PI, 100 * scope.s, 0, 0);
        p = _rotateZ(longitude / 180 * Math.PI, p[0], p[1], p[2]);
        p = _rotateZ((90 - scope.c[0]) / 180 * Math.PI, p[0], p[1], p[2]);
        p = _rotateX((90 - scope.c[1]) / 180 * Math.PI, p[0], p[1], p[2]);

        return [
            -p[0],//加-号是因为浏览器坐标和地图不一样
            p[1],
            p[2]
        ];
    };

    // 设置缩放比例
    map.scale = function (scale) {
        if (typeof scale === 'number') scope.s = scale;
        return map;
    };

    // 设置旋转中心
    map.center = function (longitude, latitude) {
        if (typeof longitude === 'number' && typeof latitude === 'number') {
            scope.c = [longitude, latitude];
        }
        return map;
    };

    return map;

};

clay.rotate = function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        ((x - cx) * cos - (y - cy) * sin + cx).toFixed(7),
        ((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)
    ];
};

/**
 * 点（x,y）沿着向量（ax,ay）方向移动距离d
 */
clay.move = function (ax, ay, d, x, y) {
    var sqrt = Math.sqrt(ax * ax + ay * ay);
    return [
        (ax * d / sqrt + x).toFixed(7),
        (ay * d / sqrt + y).toFixed(7)
    ];
};

/**
 * 点（x,y）围绕中心（cx,cy）缩放times倍
 */
clay.scale = function (cx, cy, times, x, y) {
    return [
        (times * (x - cx) + cx).toFixed(7),
        (times * (y - cy) + cy).toFixed(7)
    ];
};

// 绘图方法挂载钩子
clay.svg = {};
clay.canvas = {};

// 基本的canvas对象
// config采用canvas设置属性的api
// 前二个参数不是必输项
// 绘制前再提供下面提供的方法设置也是可以的
// 第三个参数代表图形绘制控制方法
// 最后一个是配置给控制方法的参数
var _canvas = function (_selector, config, painterback, param) {

    var key, temp = painterback(param);
    temp._p = _getCanvas2D(_selector);

    if (config)
        for (key in config)
            temp._p[key] = config[key];

    // 设置画笔
    temp.painter = function (selector) {
        temp._p = _getCanvas2D(selector);
        return temp;
    };

    // 配置画笔
    temp.config = function (_config) {
        for (key in _config)
            temp._p[key] = _config[key];
        return temp;
    };

    return temp;

};

// 弧
var _arc = function (painter) {

    var scope = {
        c: [0, 0],
        r: [100, 140],
        t: []
    };

    // r1和r2，内半径和外半径
    // beginA起点弧度，rotateA旋转弧度式
    var arc = function (beginA, rotateA, r1, r2) {
        if (rotateA > Math.PI * 2) rotateA = Math.PI * 2;
        if (rotateA < -Math.PI * 2) rotateA = -Math.PI * 2;

        // 保证逆时针也是可以的
        if (rotateA < 0) {
            beginA += rotateA;
            rotateA *= -1;
        }

        if (typeof r1 !== 'number') r1 = scope.r[0];
        if (typeof r2 !== 'number') r2 = scope.r[1];

        var temp = [], p;

        // 内部
        p = _rotateZ(beginA, r1, 0, 0);
        temp[0] = p[0];
        temp[1] = p[1];
        p = _rotateZ(rotateA, p[0], p[1], 0);
        temp[2] = p[0];
        temp[3] = p[1];

        // 外部
        p = _rotateZ(beginA, r2, 0, 0);
        temp[4] = p[0];
        temp[5] = p[1];
        p = _rotateZ(rotateA, p[0], p[1], 0);
        temp[6] = p[0];
        temp[7] = p[1];

        return painter(
            scope.c[0], scope.c[1],
            r1, r2,
            beginA, beginA + rotateA,
            temp[0] + scope.c[0], temp[1] + scope.c[1],
            temp[4] + scope.c[0], temp[5] + scope.c[1],
            temp[2] + scope.c[0], temp[3] + scope.c[1],
            temp[6] + scope.c[0], temp[7] + scope.c[1],
            scope.t, (r2 - r1) * 0.5
        );
    };

    // 设置内外半径
    arc.setRadius = function (r1, r2) {
        scope.r = [r1, r2];
        return arc;
    };

    // 设置弧中心
    arc.setCenter = function (x, y) {
        scope.c = [x, y];
        return arc;
    };

    // 设置起点和终点样式
    arc.lineCap = function (beginCircle, endCircle) {
        scope.t = [beginCircle, endCircle];
        return arc;
    };

    return arc;

};

// 采用SVG绘制圆弧
clay.svg.arc = function () {
    return _arc(
        function (
            cx, cy,
            rmin, rmax,
            beginA, endA,
            begInnerX, begInnerY,
            begOuterX, begOuterY,
            endInnerX, endInnerY,
            endOuterX, endOuterY,
            t, r
        ) {
            var f = (endA - beginA) > Math.PI ? 1 : 0,
                d = "M" + begInnerX + " " + begInnerY;
            if (r < 0) r = -r;
            d +=
                // 横半径 竖半径 x轴偏移角度 0小弧/1大弧 0逆时针/1顺时针 终点x 终点y
                "A" + rmin + " " + rmin + " 0 " + f + " 1 " + endInnerX + " " + endInnerY;
            // 结尾
            if (!t[1])
                d += "L" + endOuterX + " " + endOuterY;
            else
                d += "A" + r + " " + r + " " + " 0 1 0 " + endOuterX + " " + endOuterY;
            d += "A" + rmax + " " + rmax + " 0 " + f + " 0 " + begOuterX + " " + begOuterY;
            // 开头
            if (!t[0])
                d += "L" + begInnerX + " " + begInnerY;
            else
                d += "A" + r + " " + r + " " + " 0 1 0 " + begInnerX + " " + begInnerY;
            return d;
        }
    );
};

// 采用Canvas绘制圆弧
clay.canvas.arc = function (selector, config) {

    var key,
        obj =
            // 返回画扇形图的流程控制函数
            // 并且返回的函数挂载了canvas特有的方法和属性
            // 因此称之为基本的canvas对象
            _canvas(selector, config, _arc, function (
                cx, cy,
                rmin, rmax,
                beginA, endA,
                begInnerX, begInnerY,
                begOuterX, begOuterY,
                endInnerX, endInnerY,
                endOuterX, endOuterY,
                t, r
            ) {
                if (r < 0) r = -r;
                obj._p.beginPath();
                obj._p.moveTo(begInnerX, begInnerY);
                obj._p.arc(
                    // (圆心x，圆心y，半径，开始角度，结束角度，true逆时针/false顺时针)
                    cx, cy, rmin, beginA, endA, false);
                // 结尾
                if (!t[1])
                    obj._p.lineTo(endOuterX, endOuterY);
                else
                    obj._p.arc((endInnerX + endOuterX) * 0.5, (endInnerY + endOuterY) * 0.5, r, endA - Math.PI, endA, true);
                obj._p.arc(cx, cy, rmax, endA, beginA, true);
                // 开头
                if (!t[0])
                    obj._p.lineTo(begInnerX, begInnerY);
                else
                    obj._p.arc((begInnerX + begOuterX) * 0.5, (begInnerY + begOuterY) * 0.5, r, beginA, beginA - Math.PI, true);
                return obj._p;

            });

    return obj;

};

// 矩形
var _rect = function (painter) {

    var scope = {
        s: 10,
        t: ["LR"]
    };

    /**
     * 绘制矩形
     * @param {number} x 矩形起点的x坐标
     * @param {number} y 矩形起点的y坐标
     * @param {number} length 矩形长度
     * @param {number} deg 只有在使用旋转定位的时候才需要传递，表示旋转角度
     */
    var rect = function (x, y, length, deg) {
        // 记录矩形的四个角坐标
        var position, s2 = scope.s * 0.5;

        // 分类前准备
        if (scope.t[0] == "RL" || scope.t[0] == "BT") {
            length = -length;
            scope.t[0] = {
                "RL": "LR",
                "BT": "TB"
            }[scope.t[0]];
        }

        // 分类计算
        switch (scope.t[0]) {
            case "LR":
                position = [
                    [x, y - s2],
                    [x + length, y - s2],
                    [x + length, y + s2],
                    [x, y + s2]
                ];
                break;
            case "TB":
                position = [
                    [x + s2, y],
                    [x + s2, y + length],
                    [x - s2, y + length],
                    [x - s2, y]
                ];
                break;
            default:
                deg = deg || 0;
                position = [
                    clay.rotate(scope.t[1], scope.t[2], deg + scope.t[0], x, y - s2),
                    clay.rotate(scope.t[1], scope.t[2], deg + scope.t[0], x + length, y - s2),
                    clay.rotate(scope.t[1], scope.t[2], deg + scope.t[0], x + length, y + s2),
                    clay.rotate(scope.t[1], scope.t[2], deg + scope.t[0], x, y + s2)
                ];
        }
        return painter(position);
    };

    // 设置矩形木棒的粗细
    rect.setSize = function (size) {
        scope.s = size;
        return rect;
    };

    // 设置矩形方向类型
    // 可以设置参数：
    // 1.垂直或水平 "LR"、"RL"、"TB"、"BT"
    // 2.任意角度 (deg,cx,cy)，deg表示初始角度，(cx,cy)表示旋转圆心
    rect.setType = function (type, cx, cy) {
        scope.t = [type, cx, cy];
        return rect;
    };

    return rect;

};

// 采用SVG绘制矩形
clay.svg.rect = function () {
    return _rect(
        function (p) {
            return "M" + p[0][0] + "," + p[0][1] + " " +
                "L" + p[1][0] + "," + p[1][1] + " " +
                "L" + p[2][0] + "," + p[2][1] + " " +
                "L" + p[3][0] + "," + p[3][1] + " " +
                "L" + p[0][0] + "," + p[0][1] + " ";
        }
    );
};

// 采用Canvas绘制矩形
clay.canvas.rect = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _rect, function (p) {
                obj._p.beginPath();
                obj._p.moveTo(p[0][0], p[0][1]);
                obj._p.lineTo(p[1][0], p[1][1]);
                obj._p.lineTo(p[2][0], p[2][1]);
                obj._p.lineTo(p[3][0], p[3][1]);
                obj._p.lineTo(p[0][0], p[0][1]);
                return obj._p;

            });

    return obj;

};

// 曲线
var _line = function (painter) {

    var scope = {
        d: 5
    },
        hermite = clay.hermite().setU(-1);

    /**
     * 绘制曲线
     */
    var line = function (points) {
        var i = 0, temp = "M" + points[0][0] + "," + points[0][1];
        var l, r;
        for (; i < points.length - 1; i++) {
            l = i == 0 ? 0 : i - 1;
            r = i == points.length - 2 ? points.length - 1 : i + 2;
            hermite.setP(
                points[i][0], points[i][1],
                points[i + 1][0], points[i + 1][1],
                (points[i + 1][1] - points[l][1]) / (points[i + 1][0] - points[l][0]),
                (points[r][1] - points[i][1]) / (points[r][0] - points[i][0])
            );
            temp = painter(hermite, points[i][0], points[i + 1][0], temp, scope.d);
        }
        return temp;
    };

    // 设置精度
    line.setPrecision = function (dis) {
        scope.d = dis;
        return line;
    };

    // 设置张弛系数
    line.setU = function (u) {
        hermite.setU(u);
        return line;
    };

    return line;

};

// 采用SVG绘制曲线
clay.svg.line = function () {
    return _line(
        function (
            hermite, bx, ex, d, dis
        ) {
            for (; bx < ex; bx += dis)
                d = d + " L" + bx + "," + hermite(bx);
            d = d + " L" + ex + "," + hermite(ex);
            return d;
        }
    );
};

// 采用Canvas绘制曲线
clay.canvas.line = function (selector, config) {
    var key,
        obj =
            _canvas(selector, config, _line, function (
                hermite, bx, ex, flag, dis
            ) {
                if (typeof flag == 'string') {
                    obj._p.beginPath();
                    obj._p.moveTo(bx, hermite(bx));
                }
                for (; bx < ex; bx += dis)
                    obj._p.lineTo(bx, hermite(bx));
                obj._p.lineTo(ex, hermite(ex));
                return obj._p;
            });
    return obj;
};

// 文字
var _text = function (painter) {

    var scope = {
        p: []
    };

    /**
     * 绘制文字
     * @param {number} x 文字坐标
     * @param {number} y
     * @param {string|number} text 绘制的文字
     */
    var text = function (x, y, text, deg) {
        deg = !deg ? 0 : (deg * 180 / Math.PI);
        return painter(x, y, text, deg, scope.p[0], scope.p[1], scope.c || "#000", scope.s || 16);
    };

    // 设置对齐方式
    text.setAlign = function (horizontal, vertical) {
        scope.p = [horizontal, vertical];
        return text;
    };

    // 设置字体大小
    text.setSize = function (size) {
        scope.s = size;
        return text;
    };

    // 设置字颜色
    text.setColor = function (color) {
        scope.c = color;
        return text;
    };

    return text;

};

// 采用SVG绘制文字
clay.svg.text = function () {
    return _text(
        function (
            x, y, text, deg, horizontal, vertical, color, fontSize
        ) {

            // 针对IE和edge特殊计算
            if (_browser == 'IE' || _browser == 'Edge') {
                if (vertical == "top") {
                    y += fontSize;
                }
                if (vertical == "middle") {
                    y += fontSize * 0.5;
                }
            }

            var rotate = !deg ? "" : "transform='rotate(" + deg + "," + x + "," + y + ")'";
            return clay('<text fill=' + color + ' x="' + x + '" y="' + y + '" ' + rotate + '>' + text + '</text>').css({
                // 文本水平
                "text-anchor": {
                    "left": "start",
                    "right": "end"
                }[horizontal] || "middle",
                // 本垂直
                "dominant-baseline": {
                    "top": "text-before-edge",
                    "bottom": {
                        "Safari": "auto"
                    }[_browser] ||
                        "ideographic"
                }[vertical] ||
                    {
                        "Firefox": "middle"
                    }[_browser] ||
                    "central",
                "font-size": fontSize + "px",
                "font-family": "sans-serif"
            });
        }
    );
};

// 采用Canvas绘制文字
clay.canvas.text = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _text, function (
                x, y, text, deg, horizontal, vertical, color, fontSize
            ) {

                obj._p.save();
                obj._p.beginPath();
                obj._p.textAlign = {
                    "left": "start",
                    "right": "end"
                }[horizontal] || "center";
                obj._p.textBaseline = {
                    "top": "top",
                    "bottom": "bottom"
                }[vertical] || "middle";
                obj._p.font = fontSize + 'px sans-serif';//字体大小
                obj._p.translate(x, y);
                obj._p.rotate(deg);
                obj._p.fillStyle = color;
                obj._p.fillText(text, 0, 0);
                obj._p.restore();
                return obj._p;
            });

    return obj;

};

// 贝塞尔曲线
var _bezier = function (painter) {

    var scope = {},

        /**
         * 绘制贝塞尔曲线（主要是连接关系点的时候用）
         * @param {number} bx 起点坐标(bx,by)
         * @param {number} by
         * @param {number} ex 终点坐标(ex,ey)
         * @param {number} ey
         */
        bezier = function (bx, by, ex, ey) {
            var bdirection, edirection;
            if (scope.t[2] == 'normal') {
                bdirection = [scope.t[0], scope.t[1]];
                edirection = [-scope.t[0], -scope.t[1]];
            } else if (scope.t[2] == 'circle') {
                bdirection = [bx - scope.t[0], by - scope.t[1]];
                if (
                    (scope.t[0] - bx) * (scope.t[0] - bx) + (scope.t[1] - by) * (scope.t[1] - by) ==
                    (scope.t[0] - ex) * (scope.t[0] - ex) + (scope.t[1] - ey) * (scope.t[1] - ey)
                )
                    bdirection = [scope.t[0] - bx, scope.t[1] - by];
                else
                    bdirection = [bx - scope.t[0], by - scope.t[1]];
                edirection = [scope.t[0] - ex, scope.t[1] - ey];
            } else {
                throw new Error('Illegal type!');
            }
            return painter(
                [bx, by], //起点
                [ex, ey], //终点
                clay.move(bdirection[0], bdirection[1], scope.l, bx, by), //起点控制点
                clay.move(edirection[0], edirection[1], scope.l, ex, ey) //终点控制点
            );
        };

    // 设置曲线类型，可选类型有二种：
    // 1.type="normal",(dx,dy)是参考方向
    // 2.type="circle",(dx,dy)是参考中心
    // 缺省类型是"normal"
    bezier.setType = function (dx, dy, type) {
        if (!type) type = 'normal';
        scope.t = [dx, dy, type];
        return bezier;
    };

    // 设置控制把柄的长度
    bezier.setL = function (length) {
        scope.l = length;
        return bezier;
    };

    return bezier;

};

// 采用SVG绘制贝塞尔曲线
clay.svg.bezier = function () {
    return _bezier(
        function (
            beginP, endP, beginCtrlP, endCtrlP
        ) {
            return "M" + beginP[0] + "," + beginP[1] + " " +
                "C" + beginCtrlP[0] + "," + beginCtrlP[1] + " " +
                endCtrlP[0] + "," + endCtrlP[1] + " " +
                endP[0] + "," + endP[1];
        }
    );
};

// 采用Canvas绘制贝塞尔曲线
clay.canvas.bezier = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _bezier, function (
                beginP, endP, beginCtrlP, endCtrlP
            ) {
                obj._p.beginPath();
                obj._p.moveTo(beginP[0], beginP[1]);
                obj._p.bezierCurveTo(
                    beginCtrlP[0],// 第一个贝塞尔控制点的 x 坐标
                    beginCtrlP[1],// 第一个贝塞尔控制点的 y 坐标
                    endCtrlP[0],// 第二个贝塞尔控制点的 x 坐标
                    endCtrlP[1],// 第二个贝塞尔控制点的 y 坐标
                    endP[0], endP[1]);
                return obj._p;

            });

    return obj;

};

// 多边形
var _polygon = function (painter) {

    var scope = {
        /*
         * 连接两点的曲线其实使用path的多段(L x,y)拼接而成，这些x,y就是由插值算法计算得出
         * 设置d可以设置精度，d越大，精度越高，但是相应的计算量也会增加（计算时间增加）
         */
        d: 100
    },
        // 多边形插值方法
        catmullRom = clay.catmullRom();

    var polygon = function (point) {
        // 原来的slice写法会阻止某些JavaScript引擎中的优化
        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
        // 替换使用apply方法实现
        // https://www.ecma-international.org/ecma-262/6.0/#sec-function.prototype.apply
        var p = (point.length === 1 ? [point[0]] : Array.apply(null, point));
        p.push(p[0]);

        var l = p.length;
        //添加首尾控制点，用于绘制完整曲线
        p.unshift(p[l - 2]);
        p.push(p[2]);

        var i = 1,
            temp = "M" + p[1][0] + " " + p[1][1] + " ";
        for (; i < l; i++) {
            catmullRom.setP(p[i - 1], p[i], p[i + 1], p[i + 2]);
            temp = painter(catmullRom, 0, 1 / scope.d, temp);
        }
        // 闭合
        if (typeof temp == 'string') temp += " Z"; else temp.closePath();
        return temp;
    };

    polygon.setNum = function (num) {
        //设置精度（即将p1,p2两点间的曲线段分成的段数）
        scope.d = num;
        return polygon;
    };

    return polygon;

};

// 采用SVG绘制多边形
clay.svg.polygon = function () {
    return _polygon(
        function (
            calcFn, start, dx, temp
        ) {
            for (; start <= 1; start += dx) {
                var point = calcFn(start);
                temp = temp + " L" + point[0] + "," + point[1];
            }
            return temp;
        }
    );
};

// 采用Canvas绘制多边形
clay.canvas.polygon = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _polygon, function (
                calcFn, start, dx, temp
            ) {

                var point = calcFn(start);
                if (typeof temp == 'string') {
                    obj._p.moveTo(point[0], point[1]);
                }
                for (; start <= 1; start += dx) {
                    point = calcFn(start);
                    obj._p.lineTo(point[0], point[1]);
                }
                return obj._p;
            });

    return obj;

};

clay.treeLayout = function () {

    var scope = {
        "e": {}
    },
        // 维护的树
        alltreedata,
        // 根结点ID
        rootid,

        /**
         * 把内部保存的树结点数据
         * 计算结束后会调用配置的绘图方法
         */
        update = function () {

            var beforeDis = [], size = 0;
            (function positionCalc(pNode, deep) {

                var flag;
                for (flag = 0; flag < pNode.children.length; flag++)
                    // 因为全部的子结点的位置确定了，父结点的y位置就是子结点的中间位置
                    // 因此有子结点的，先计算子结点
                    positionCalc(alltreedata[pNode.children[flag]], deep + 1);

                // left的位置比较简单，deep从0开始编号
                // 比如deep=0，第一层，left=0+0.5=0.5，也就是根结点
                alltreedata[pNode.id].left = deep + 0.5;
                if (flag == 0) {

                    // beforeDis是一个数组，用以记录每一层此刻top下边缘（每一层是从上到下）
                    // 比如一层的第一个，top值最小可以取top=0.5
                    // 为了方便计算，beforeDis[deep] == undefined的时候表示现在准备计算的是这层的第一个结点
                    // 因此设置最低上边缘为-0.5
                    if (beforeDis[deep] == undefined) beforeDis[deep] = -0.5;
                    // 父边缘同意的进行初始化
                    if (beforeDis[deep - 1] == undefined) beforeDis[deep - 1] = -0.5;

                    // 添加的新结点top值第一种求法：本层上边缘+1（比如上边缘是-0.5，那么top最小是top=-0.5+1=0.5）
                    alltreedata[pNode.id].top = beforeDis[deep] + 1;

                    var pTop = beforeDis[deep] + 1 + (alltreedata[pNode.pid].children.length - 1) * 0.5;
                    // 计算的原则是：如果第一种可行，选择第一种，否则必须选择第二种
                    // 判断第一种是否可行的方法就是：如果第一种计算后确定的孩子上边缘不对导致孩子和孩子的前兄弟重合就是可行的
                    if (pTop - 1 < beforeDis[deep - 1])
                        // 必须保证父亲结点和父亲的前一个兄弟保存1的距离，至少
                        // 添加的新结点top值的第二种求法：根据孩子取孩子结点的中心top
                        alltreedata[pNode.id].top = beforeDis[deep - 1] + 1 - (alltreedata[pNode.pid].children.length - 1) * 0.5;

                } else {

                    // 此刻flag!=0
                    // 意味着结点有孩子，那么问题就解决了，直接取孩子的中间即可
                    // 其实，flag==0的分支计算的就是孩子，是没有孩子的叶结点，那是关键
                    alltreedata[pNode.id].top = (alltreedata[pNode.children[0]].top + alltreedata[pNode.children[flag - 1]].top) * 0.5;
                }

                // 计算好一个结点后，需要更新此刻该层的上边缘
                beforeDis[deep] = alltreedata[pNode.id].top;

                // size在每次计算一个结点后更新，是为了最终绘图的时候知道树有多宽（此处应该叫高）
                if (alltreedata[pNode.id].top + 0.5 > size) size = alltreedata[pNode.id].top + 0.5;

            })(alltreedata[rootid], 0);

            // 画图
            // 传递的参数分别表示：记录了位置信息的树结点集合、根结点ID和树的宽
            scope.e.drawer(alltreedata, rootid, size);

        };

    /**
     * 根据配置的层次关系（配置的id,child,root）把原始数据变成内部结构，方便后期位置计算
     * @param {any} initTree
     *
     * tempTree[id]={
     *  "data":原始数据,
     *  "pid":父亲ID,
     *  "id":唯一标识ID,
     *  "children":[cid1、cid2、...],
     *  "show":boolean，表示该结点在计算位置的时候是否可见
     * }
     */
    var toInnerTree = function (initTree) {

        var tempTree = {};
        // 根结点
        var temp = scope.e.root(initTree), id, rid;
        id = rid = scope.e.id(temp);
        tempTree[id] = {
            "data": temp,
            "pid": null,
            "id": id,
            "children": [],
            "show": true
        };
        // 根据传递的原始数据，生成内部统一结构
        (function createTree(pdata, pid) {
            var children = scope.e.child(pdata, initTree), flag;
            for (flag = 0; children && flag < children.length; flag++) {
                id = scope.e.id(children[flag]);
                tempTree[pid].children.push(id);
                tempTree[id] = {
                    "data": children[flag],
                    "pid": pid,
                    "id": id,
                    "children": [],
                    "show": true
                };
                createTree(children[flag], id);
            }
        })(temp, id);

        return [rid, tempTree];
    };

    // 可以传递任意格式的树原始数据
    // 只要配置对应的解析方法即可
    var tree = function (initTree) {

        var treeData = toInnerTree(initTree);
        alltreedata = treeData[1];
        rootid = treeData[0];
        update();
        return tree;

    };

    // 获取根结点的方法:root(initTree)
    tree.root = function (rootback) {
        scope.e.root = rootback;
        return tree;
    };

    // 获取子结点的方法:child(parentTree,initTree)
    tree.child = function (childback) {
        scope.e.child = childback;
        return tree;
    };

    // 获取结点ID方法:id(treedata)
    tree.id = function (idback) {
        scope.e.id = idback;
        return tree;
    };

    // 结点更新处理方法 drawer(alltreedata, rootid, size)
    tree.drawer = function (drawerback) {
        scope.e.drawer = drawerback;
        return tree;
    };

    // 第三个参数为true的时候不会自动更新
    tree.add = function (pid, newnodes, notUpdate) {

        var treeData = toInnerTree(newnodes), id;
        treeData[1][treeData[0]].pid = pid;
        alltreedata[pid].children.push(treeData[0]);
        for (id in treeData[1])
            alltreedata[id] = treeData[1][id];
        if (!notUpdate) update();
        return tree;

    };
    tree.delete = function (id, notUpdate) {

        var index = alltreedata[alltreedata[id].pid].children.indexOf(id);
        if (index > -1)
            alltreedata[alltreedata[id].pid].children.splice(index, 1);

        // 删除多余结点
        (function deleteNode(pid) {
            var flag;
            for (flag = 0; flag < alltreedata[pid].children.length; flag++) {
                deleteNode(alltreedata[alltreedata[pid].children[flag]].id);
            }
            delete alltreedata[pid];
        })(id);

        if (!notUpdate) update();
        return tree;

    };

    // 控制结点显示还是隐藏
    // flag可选，"show"：显示，"hidden"：隐藏，不传递就是切换
    tree.toggle = function (id, notUpdate, flag) {

        var index = alltreedata[alltreedata[id].pid].children.indexOf(id);
        if (index > -1 && flag != 'show') {
            alltreedata[alltreedata[id].pid].children.splice(index, 1);
            alltreedata[id]._index = index;
        }
        else if (flag != 'hidden')
            alltreedata[alltreedata[id].pid].children.splice(alltreedata[id]._index, 0, id);
        if (!notUpdate) update();
        return tree;

    };

    tree.update = function () {

        update();
        return tree;
    };

    return tree;

};

clay.pieLayout = function () {
    var scope = {
        // 圆心
        c: [0, 0],
        // 半径
        r: 1,
        // 提示信息连线长度
        l: [20, 20],
        // 获取值方法
        v: function (value, key, index) {
            return value;
        },
        // 起始角度
        b: 0,
        // 旋转方向
        d: false,
        // arc尺寸
        g: Math.PI * 2
    }, calcLinePosition = function (deg, r) {

        var pos = [];
        // 求出第一个点
        pos[0] = clay.rotate(scope.c[0], scope.c[1], deg, scope.c[0] + r, scope.c[1]);

        // 求出第二个点
        pos[1] = clay.rotate(scope.c[0], scope.c[1], deg, scope.c[0] + r + scope.l[0], scope.c[1]);

        // 求出第三个点
        pos[2] = [
            pos[1][0] > scope.c[0] ? pos[1][0] - (-scope.l[1]) : pos[1][0] - scope.l[1],
            pos[1][1]
        ];

        pos[3] = pos[1][0] > scope.c[0] ? "left" : "right";

        return pos;
    };

    /**
     * 计算饼图数据
     * @param {Array} initPie 一个可迭代的原始数据
     */
    var pie = function (initPie) {
        var resultData = [], key, allVal = 0, i = 0;
        for (key in initPie) {
            resultData.push({
                "org": initPie[key],
                "val": scope.v(initPie[key], key, i)
            });
            allVal += resultData[i].val;
            i += 1;
        }
        var preBegin = scope.b, preDeg = 0;
        var cDeg;
        for (i = 0; i < resultData.length - 1; i++) {

            // 求解角度（主要用于画弧）
            preBegin = resultData[i].begin = preBegin + preDeg;
            resultData[i].p = resultData[i].val / allVal;
            preDeg = resultData[i].deg = scope.g * resultData[i].p * (scope.d ? -1 : 1);

            // 求解说明文字连线（主要用于绘制折线）
            resultData[i].line = calcLinePosition(
                resultData[i].begin + resultData[i].deg * 0.5,
                typeof scope.r == 'function' ? scope.r(initPie[key], key, i) : scope.r);

            // 启动绘画方法
            scope.p(resultData[i], i);
        }

        // 最后一个为了可以完全闭合（因为计算有精度丢失导致的），独立计算
        resultData[i].begin = preBegin + preDeg;
        resultData[i].deg = scope.g * (scope.d ? -1 : 1) + scope.b - resultData[i].begin;
        resultData[i].p = resultData[i].val / allVal;

        resultData[i].line = calcLinePosition(
            resultData[i].begin + resultData[i].deg * 0.5,
            typeof scope.r == 'function' ? scope.r(initPie[key], key, i) : scope.r);

        scope.p(resultData[i], i);
        return pie;

    };

    // 设置如何获取值
    // 函数有三个参数：原始值、值的key、序号
    pie.setValue = function (valback) {
        scope.v = valback;
        return pie;
    };

    // 设置如何绘图
    pie.drawer = function (drawerback) {
        scope.p = drawerback;
        return pie;
    };

    // 设置旋转方向
    // true 逆时针
    // false 顺时针
    pie.setD = function (notClockwise) {
        scope.d = notClockwise;
        return pie;
    };

    // 设置起始角度
    pie.setBegin = function (deg) {
        scope.b = deg;
        return pie;
    };

    // 设置半径
    // 一个数字或返回半径的函数
    // 函数有三个参数：原始值、值的key、序号
    pie.setRadius = function (r) {
        scope.r = r;
        return pie;
    };

    // 设置提示信息连接线长度
    pie.setDis = function (l1, l2) {
        scope.l = [l1, typeof l2 == 'number' ? l2 : l1];
        return pie;
    };

    // 设置弧中心
    pie.setCenter = function (x, y) {
        scope.c = [x, y];
        return pie;
    };

    // 设置弧度跨度
    pie.setDeg = function (deg) {
        scope.g = deg;
        return pie;
    };

    return pie;
};

// 可注入内部服务
var _service = {
    "$browser": {
        "type": _browser,
        "IE": _IE
    }
};

// 常用方法
var _this = {
    "toNode": _toNode
};

/**
 * 确定应用目标以后
 * 启动编译并应用
 */
clay.prototype.use = function (name, config) {

    // 销毁之前的
    if (this[0]._component) _component[this[0]._component].beforeDestory.apply(_this, [this]);

    // 使用组件前，在结点中记录一下
    this[0]._component = name;

    // 添加监听方法
    config.$watch = function (key, doback) {
        var val = config[key];
        Object.defineProperty(config, key, {
            get: function () {
                return val;
            },
            set: function (newVal) {
                doback(newVal, val);
                val = newVal;
            }
        });
    };

    // 组件创建前
    if (typeof _component[name].beforeCreate == 'function') _component[name].beforeCreate.apply(_this, [this]);

    // 启动组件
    _component[name].link.apply(_this, [this, config]);
    return this;
};

// 主动销毁
clay.prototype.destory = function () {
    if (this[0]._component) _component[this[0]._component].beforeDestory.apply(_this, [this]);
    return this;
};

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

    clay.version = '1.5.2next';
    clay.author = '心叶';
    clay.email = 'yelloxing@gmail.com';

    return clay;

});
