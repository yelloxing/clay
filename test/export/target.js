/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
            /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function (value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
                /******/
});
            /******/
}
        /******/
};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
        /******/
};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
    /******/
})
/************************************************************************/
/******/([
/* 0 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function () { return treeLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function () { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function () { return move; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function () { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function () { return hermite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function () { return cardinal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function () { return catmullRom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function () { return Matrix4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function () { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function () { return animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function () { return loop; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clay_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clay_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__clay_core__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function () { return __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function () { return __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "c", function () { return __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a; });


            let treeLayout = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.treeLayout;

            let scaleLinear = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.scaleLinear;

            let rotate = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.rotate;
            let move = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.move;
            let scale = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.scale;

            let hermite = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.hermite;
            let cardinal = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.cardinal;
            let catmullRom = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.catmullRom;

            let Matrix4 = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.Matrix4;

            let map = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.map;

            let animation = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.animation;
            let loop = __WEBPACK_IMPORTED_MODULE_0__clay_core___default.a.loop;



            /***/
}),
/* 1 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__build_export__ = __webpack_require__(0);



            function doTest() {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i]) {
                        console.log(arguments[i]);
                    } else {
                        console.error(arguments[i]);
                    }
                }
            }

            doTest(__WEBPACK_IMPORTED_MODULE_0__build_export__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__build_export__["b" /* clay */], __WEBPACK_IMPORTED_MODULE_0__build_export__["c" /* $$ */]);
            doTest(__WEBPACK_IMPORTED_MODULE_0__build_export__["d" /* treeLayout */]);
            doTest(__WEBPACK_IMPORTED_MODULE_0__build_export__["e" /* rotate */], __WEBPACK_IMPORTED_MODULE_0__build_export__["f" /* move */], __WEBPACK_IMPORTED_MODULE_0__build_export__["g" /* scale */]);
            doTest(__WEBPACK_IMPORTED_MODULE_0__build_export__["h" /* hermite */], __WEBPACK_IMPORTED_MODULE_0__build_export__["i" /* cardinal */], __WEBPACK_IMPORTED_MODULE_0__build_export__["j" /* catmullRom */]);
            doTest(__WEBPACK_IMPORTED_MODULE_0__build_export__["k" /* Matrix4 */]);
            doTest(__WEBPACK_IMPORTED_MODULE_0__build_export__["l" /* map */]);
            doTest(__WEBPACK_IMPORTED_MODULE_0__build_export__["m" /* animation */], __WEBPACK_IMPORTED_MODULE_0__build_export__["n" /* loop */]);

            /***/
}),
/* 2 */
/***/ (function (module, exports) {

            /*!
            * clay.js - Provide a more friendly web-side drawing interface!
            * git+https://github.com/yelloxing/clay-core.git
            *
            * author 心叶
            *
            * version 2.1.0next
            *
            * build Sun Jul 29 2018
            *
            * Copyright yelloxing
            * Released under the MIT license
            *
            * Date:Thu Jan 31 2019 17:27:55 GMT+0800 (GMT+08:00)
            */
            (function (global, factory) {

                'use strict';

                if (typeof module === "object" && typeof module.exports === "object") {
                    module.exports = factory();
                } else {
                    global.clay = global.$$ = factory();
                }
            })(typeof window !== "undefined" ? window : this, function (undefined) {

                'use strict';

                var clay = function (selector, context) {
                    return new clay.prototype.init(selector, context);
                };

                clay.prototype.init = function (selector, context) {

                    this.context = context = context || document;
                    var nodes = _sizzle(selector, context),
                        flag;
                    for (flag = 0; flag < nodes.length; flag++) {
                        this[flag] = nodes[flag];
                    }
                    this.selector = selector;
                    this.length = nodes.length;
                    this.type = "clay-object";
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

                // http://www.w3.org/TR/css3-selectors/#whitespace
                var _regexp_whitespace = "[\\x20\\t\\r\\n\\f]";

                // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                var _regexp_identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+";

                // 记录需要使用xlink命名空间常见的xml属性
                var _xlink = ["href", "title", "show", "type", "role", "actuate"];

                // 记录不同浏览器对webgl的别名
                var _webgl_types = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

                // 嵌入内部提供者
                var _provider = {};

                // 常用对象
                var _canvas_2d = CanvasRenderingContext2D;

                // 提示文字
                var _tips_error_selector = "Unsupported selector!";
                var _tips_error_parameter = 'Unsupported parameter!';
                // 用于扩展或加强选择器
                var _out_sizzle;
                _provider.$sizzleProvider = function (config) {
                    _out_sizzle = config;
                };

                // 负责查找结点
                function _sizzle(selector, context) {

                    var temp = [],
                        flag;
                    if (typeof selector === 'string') {

                        // 去掉回车，空格和换行
                        selector = (selector + "").trim().replace(/[\n\f\r]/g, '');

                        if (/^</.test(selector)) return [_toNode(selector)];

                        if (_is_function(_out_sizzle)) return _out_sizzle(selector, context);

                        // 支持的选择器包括：
                        // #id .class [attr='value'] tagName
                        // 包括任意组合
                        // 如果选择全部元素，只可以传递一个*
                        if (selector === "*") {
                            return context.getElementsByTagName('*');
                        }

                        // 用于判断是否为合法选择器组合
                        var whitespace = _regexp_whitespace,
                            identifier = _regexp_identifier,
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
                            var t,
                                x,
                                y,
                                f,
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
                                    if (y === null || t[2] && y != t[2]) {
                                        f = false;
                                        break;
                                    }
                                }
                                if (f) temp.push(targetNodes[flag]);
                            }

                            return temp;
                        }

                        // 非法的选择器
                        else {
                            throw new Error(_tips_error_selector);
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
                    else if (selector && selector.type === 'clay-object') {
                        return selector;
                    }

                    // 如果没传递，表示想获取空对象
                    else if (!selector) {
                        return [];
                    }

                    // 其它未知情况
                    else {
                        throw new Error(_tips_error_selector);
                    }
                }
                // 把字符串变成结点
                function _toNode(str) {
                    var frame = document.createElementNS(_namespace.svg, 'svg');
                    // 把传递元素类型和标记进行统一处理
                    if (new RegExp("^" + _regexp_identifier + "$").test(str)) str = "<" + str + "></" + str + ">";
                    _innerSVG(frame, str);
                    var childNodes = frame.childNodes,
                        flag,
                        child;
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
                        nodes = _sizzle(selector, this[0]),
                        flag;
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

                    var newClay = clay(target),
                        i,
                        j;
                    for (i = 0; i < newClay.length; i++) for (j = 0; j < this.length; j++) newClay[i].appendChild(this[j]);
                    return this;
                };

                clay.prototype.remove = function () {

                    var flag;
                    for (flag = 0; flag < this.length; flag++) this[flag].parentNode.removeChild(this[flag]);
                    return this;
                };

                // 选择器重新查找一次
                clay.prototype.refresh = function () {

                    var nodes = _sizzle(this.selector, this.context),
                        flag,
                        length = this.length;
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
                        var allStyle = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(this[0], null) : this[0].currentStyle;
                        return typeof name === 'string' ? allStyle.getPropertyValue(name) : allStyle;
                    } else if (this.length > 0) {
                        var flag, key;
                        if (typeof name === 'object') {
                            for (key in name) for (flag = 0; flag < this.length; flag++) this[flag].style[key] = typeof style === 'function' ? style(this[flag]._data, flag, key, name[key]) : name[key];
                        } else {
                            for (flag = 0; flag < this.length; flag++) this[flag].style[name] = typeof style === 'function' ? style(this[flag]._data, flag) : style;
                        }
                    }
                    return this;
                };

                clay.prototype.size = function (type) {
                    type = type || "border";
                    var elemHeight, elemWidth;
                    if (type == 'content') {
                        //内容
                        elemWidth = this[0].clientWidth - (this.css('padding-left') + "").replace('px', '') - (this.css('padding-right') + "").replace('px', '');
                        elemHeight = this[0].clientHeight - (this.css('padding-top') + "").replace('px', '') - (this.css('padding-bottom') + "").replace('px', '');
                    } else if (type == 'padding') {
                        //内容+内边距
                        elemWidth = this[0].clientWidth;
                        elemHeight = this[0].clientHeight;
                    } else if (type == 'border') {
                        //内容+内边距+边框
                        elemWidth = this[0].offsetWidth;
                        elemHeight = this[0].offsetHeight;
                    } else if (type == 'scroll') {
                        //滚动的宽（不包括border）
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

                    var flag,
                        temp = [];
                    if (datas) {
                        if (datas.constructor !== Array) {
                            var _temp = [];
                            for (flag in datas) {
                                _temp.push(datas[flag]);
                            }
                            datas = _temp;
                        }
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

                    var flag,
                        node,
                        newClay = clay();
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

                    var flag,
                        newClay = clay();
                    newClay.selector = this.selector;
                    for (flag = 0; this._exit && flag < this._exit.length; flag++) {
                        newClay[flag] = this._exit[flag];
                        newClay.length += 1;
                    }
                    delete this._exit;
                    return newClay;
                };
                // 迭代执行
                clay.prototype.loop = function (doIt) {
                    var flag;
                    for (flag = 0; flag < this.length; flag++) {
                        doIt(this[flag]._data, flag, this.eq(flag));
                    }
                    return this;
                };
                clay.prototype.bind = function (eventType, callback) {

                    var flag;
                    if (window.attachEvent) for (flag = 0; flag < this.length; flag++)
                        // 后绑定的先执行
                        this[flag].attachEvent("on" + eventType, callback); else for (flag = 0; flag < this.length; flag++)
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
                // 针对部分浏览器svg不支持innerHTML方法
                var _innerSVG = function (target, svgstring) {
                    if ('innerHTML' in SVGElement.prototype === false || 'innerHTML' in SVGSVGElement.prototype === false) {
                        var frame = document.createElement("div"),
                            i;
                        frame.innerHTML = svgstring;
                        var toSvgNode = function (htmlNode) {
                            var svgNode = document.createElementNS(_namespace.svg, (htmlNode.tagName + "").toLowerCase());
                            var attrs = htmlNode.attributes,
                                i,
                                svgNodeClay = clay(svgNode);
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
                        target.appendChild(rslNode);
                    } else {
                        target.innerHTML = svgstring;
                    }
                };
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
                    var createTime,
                        flag,
                        tick,
                        callback,
                        timer,
                        duration,
                        passTime,
                        needStop,
                        deep,
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
                var _rgb2hsl = function (R, G, B) {
                    var R1 = +R / 255,
                        G1 = +G / 255,
                        B1 = +B / 255;
                    var MAX = Math.max(R1, G1, B1);
                    var MIN = Math.min(R1, G1, B1);
                    var H, S, L;
                    if (MAX === MIN) {
                        H = 0;
                    } else if (MAX === R1) {
                        H = 60 * (G1 - B1) / (MAX - MIN);
                    } else if (MAX === G1) {
                        H = 60 * (B1 - R1) / (MAX - MIN) + 120;
                    } else if (MAX === B1) {
                        H = 60 * (R1 - G1) / (MAX - MIN) + 240;
                    }
                    if (H < 0) {
                        H += 360;
                    }
                    L = (MAX + MIN) / 2;
                    if (L === 0 || MAX === MIN) {
                        S = 0;
                    } else if (L > 0 && L <= 0.5) {
                        S = (MAX - MIN) / (MAX + MIN);
                    } else if (L > 0.5) {
                        S = (MAX - MIN) / (2 - MAX - MIN);
                    }
                    return [+H.toFixed(2), +S.toFixed(2), +L.toFixed(2)];
                },
                    _hsl2rgb = function (h, s, l) {
                        var c = (1 - Math.abs(2 * l - 1)) * s;
                        var x = c * (1 - Math.abs(h / 60 % 2 - 1));
                        var m = l - c / 2;
                        var r, g, b;
                        if (h >= 0 && h < 60) {
                            r = (c + m) * 255;
                            g = (x + m) * 255;
                            b = m * 255;
                        } else if (h >= 60 && h < 120) {
                            r = (x + m) * 255;
                            g = (c + m) * 255;
                            b = m * 255;
                        } else if (h >= 120 && h < 180) {
                            r = m * 255;
                            g = (c + m) * 255;
                            b = (x + m) * 255;
                        } else if (h >= 180 && h < 240) {
                            r = m * 255;
                            g = (x + m) * 255;
                            b = (c + m) * 255;
                        } else if (h >= 240 && h < 300) {
                            r = (x + m) * 255;
                            g = m * 255;
                            b = (c + m) * 255;
                        } else if (h >= 300 && h < 360) {
                            r = (c + m) * 255;
                            g = m * 255;
                            b = (x + m) * 255;
                        }
                        return [+r.toFixed(0), +g.toFixed(0), +b.toFixed(0)];
                    },
                    _randomColors = function (num) {
                        if (typeof num == 'number' && num > 3) {
                            var temp = [],
                                flag = 0;
                            for (flag = 1; flag <= num; flag++) temp.push('rgb(' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ')');
                            return temp;
                        } else {
                            return ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)'];
                        }
                    };

                // 把颜色统一转变成rgba(x,x,x,x)格式
                // 返回数字数组[r,g,b,a]
                clay.color = function (color) {
                    var temp = clay('head').css('color', color).css('color').replace(/^rgba?\(([^)]+)\)$/, '$1').split(new RegExp('\\,' + _regexp_whitespace));
                    return [+temp[0], +temp[1], +temp[2], temp[3] == undefined ? 1 : +temp[3]];
                };

                // 获取一组色彩
                clay.getColors = function (num, range, rgb) {
                    if (!range) return _randomColors(num);

                    //num：需要的颜色个数
                    //range:数组，取值0-360，色彩范围
                    //rgb: 可选，数组，参考颜色，是一组rgb
                    var temp = (range[1] - range[0]) / num;
                    var s, l;
                    if (rgb) {
                        var hsl = _rgb2hsl(rgb[0], rgb[1], rgb[2]);
                        s = hsl[1]; l = hsl[2];
                    } else {
                        s = 0.78; l = 0.4;
                    }
                    var array = [];
                    for (var i = 0; i < num; i++) {
                        rgb = _hsl2rgb(temp * i + range[0], s, l);
                        array.push("rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")");
                    }
                    return array;
                };

                // 给一组数据，轮询执行一遍
                clay.loop = function (datas, callback) {
                    var flag = 0,
                        data;
                    for (data in datas) callback(datas[data], data, flag++);
                    return clay;
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
                clay.prototype.region = function (width, height) {

                    var regions = {},
                        //区域映射表
                        canvas = document.createElement('canvas'),
                        rgb = [0, 0, 0],
                        //区域标识色彩,rgb(0,0,0)表示空白区域
                        p = 'r'; //色彩增值位置

                    if (typeof width !== 'number') width = this[0].offsetWidth; //内容+内边距+边框
                    if (typeof height !== 'number') height = this[0].offsetHeight;

                    canvas.setAttribute('width', width);
                    canvas.setAttribute('height', height);

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
                                // 如果没有传递擦除方法
                                // 擦除全部
                                if (typeof drawback !== 'function') drawback = function (pen) {
                                    pen.clearRect(0, 0, width, height);
                                };
                                return _drawerRegion(canvas2D, 'rgb(0,0,0)', drawback, regionManger);
                            },

                            // 获取此刻鼠标所在区域
                            "getRegion": function (event) {
                                var pos = _this.position(event),
                                    i;
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
                    if (selector && selector.constructor === _canvas_2d) return selector; else {
                        var canvas = clay(selector);
                        if (canvas.length > 0) return canvas[0].getContext("2d");
                    }
                }

                // 直接使用canvas2D绘图
                clay.prototype.painter = function () {
                    if (this.length > 0 && this[0].nodeName != 'CANVAS' && this[0].nodeName != 'canvas') throw new Error('painter is not function');
                    return _getCanvas2D(this);
                };

                // 使用图层绘图
                clay.prototype.layer = function (width, height) {
                    if (this.length > 0 && this[0].nodeName != 'CANVAS' && this[0].nodeName != 'canvas') throw new Error('layer is not function');
                    // 画笔
                    var painter = _getCanvas2D(this),
                        canvas = [],

                        // 图层集合
                        layer = {};

                    if (typeof width !== 'number') width = this[0].clientWidth; //内容+内边距
                    if (typeof height !== 'number') height = this[0].clientHeight;

                    var layerManager = {
                        "painter": function (index) {
                            if (!layer[index] || layer[index].constructor !== _canvas_2d) {

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
                                if (ctx2D.constructor !== _canvas_2d) ctx2D = layerManager.painter(ctx2D);
                                ctx2D.clearRect(0, 0, width, height);
                            }
                            return layerManager;
                        },
                        "update": function () {
                            if (painter && painter.constructor === _canvas_2d) {
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
                // 二个4x4矩阵相乘
                // 或矩阵和齐次坐标相乘
                var _multiply = function (matrix4, param) {
                    var newParam = [],
                        i,
                        j;
                    for (i = 0; i < 4; i++) for (j = 0; j < param.length / 4; j++) newParam[j * 4 + i] = matrix4[i] * param[j * 4] + matrix4[i + 4] * param[j * 4 + 1] + matrix4[i + 8] * param[j * 4 + 2] + matrix4[i + 12] * param[j * 4 + 3];
                    return newParam;
                };

                // 求一个矩阵的行列式（方阵）
                // 4x4 或 3x3
                var _determinant = function (matrixX) {

                    // 3x3
                    if (matrixX.length == 9) {
                        return matrixX[0] * matrixX[4] * matrixX[8] - matrixX[0] * matrixX[7] * matrixX[5] - matrixX[3] * matrixX[1] * matrixX[8] + matrixX[3] * matrixX[7] * matrixX[2] + matrixX[6] * matrixX[1] * matrixX[5] - matrixX[6] * matrixX[4] * matrixX[2];
                    }

                    // 4x4
                    else if (matrixX.length == 16) {
                        return matrixX[0] * _determinant([matrixX[5], matrixX[6], matrixX[7], matrixX[9], matrixX[10], matrixX[11], matrixX[13], matrixX[14], matrixX[15]]) - matrixX[4] * _determinant([matrixX[1], matrixX[2], matrixX[3], matrixX[9], matrixX[10], matrixX[11], matrixX[13], matrixX[14], matrixX[15]]) + matrixX[8] * _determinant([matrixX[1], matrixX[2], matrixX[3], matrixX[5], matrixX[6], matrixX[7], matrixX[13], matrixX[14], matrixX[15]]) - matrixX[12] * _determinant([matrixX[1], matrixX[2], matrixX[3], matrixX[5], matrixX[6], matrixX[7], matrixX[9], matrixX[10], matrixX[11]]);
                    }

                    // 其它情况
                    else {
                        throw new Error(_tips_error_parameter);
                    }
                };

                // 求一个4x4矩阵的全部代数余子式Aij
                var _algebraic_cofactor = function (matrix4) {
                    return [

                        // 0
                        _determinant([matrix4[5], matrix4[6], matrix4[7], matrix4[9], matrix4[10], matrix4[11], matrix4[13], matrix4[14], matrix4[15]]),

                        // 1
                        -_determinant([matrix4[4], matrix4[6], matrix4[7], matrix4[8], matrix4[10], matrix4[11], matrix4[12], matrix4[14], matrix4[15]]),

                        // 2
                        _determinant([matrix4[4], matrix4[5], matrix4[7], matrix4[8], matrix4[8], matrix4[11], matrix4[12], matrix4[13], matrix4[15]]),

                        // 3
                        -_determinant([matrix4[4], matrix4[5], matrix4[6], matrix4[8], matrix4[9], matrix4[10], matrix4[12], matrix4[13], matrix4[14]]),

                        // 4
                        -_determinant([matrix4[1], matrix4[2], matrix4[3], matrix4[9], matrix4[10], matrix4[11], matrix4[13], matrix4[14], matrix4[15]]),

                        // 5
                        _determinant([matrix4[0], matrix4[2], matrix4[3], matrix4[8], matrix4[10], matrix4[11], matrix4[12], matrix4[14], matrix4[15]]),

                        // 6
                        -_determinant([matrix4[0], matrix4[1], matrix4[3], matrix4[8], matrix4[9], matrix4[11], matrix4[12], matrix4[13], matrix4[15]]),

                        // 7
                        _determinant([matrix4[0], matrix4[1], matrix4[2], matrix4[8], matrix4[9], matrix4[10], matrix4[12], matrix4[13], matrix4[14]]),

                        // 8
                        _determinant([matrix4[1], matrix4[2], matrix4[3], matrix4[5], matrix4[6], matrix4[7], matrix4[13], matrix4[14], matrix4[15]]),

                        // 9
                        -_determinant([matrix4[0], matrix4[2], matrix4[3], matrix4[4], matrix4[6], matrix4[7], matrix4[12], matrix4[14], matrix4[15]]),

                        // 10
                        _determinant([matrix4[0], matrix4[1], matrix4[3], matrix4[4], matrix4[5], matrix4[7], matrix4[12], matrix4[13], matrix4[15]]),

                        // 11
                        -_determinant([matrix4[0], matrix4[1], matrix4[2], matrix4[4], matrix4[5], matrix4[6], matrix4[12], matrix4[13], matrix4[14]]),

                        // 12
                        -_determinant([matrix4[1], matrix4[2], matrix4[3], matrix4[5], matrix4[6], matrix4[7], matrix4[9], matrix4[10], matrix4[11]]),

                        // 13
                        _determinant([matrix4[0], matrix4[2], matrix4[3], matrix4[4], matrix4[6], matrix4[7], matrix4[8], matrix4[10], matrix4[11]]),

                        // 14
                        -_determinant([matrix4[0], matrix4[1], matrix4[3], matrix4[4], matrix4[5], matrix4[7], matrix4[8], matrix4[9], matrix4[11]]),

                        // 15
                        _determinant([matrix4[0], matrix4[1], matrix4[2], matrix4[4], matrix4[5], matrix4[6], matrix4[8], matrix4[9], matrix4[10]])];
                };

                // 求一个4x4矩阵的伴随矩阵A*
                var _adjoint_matrix = function (matrix4) {
                    var algebraic_cofactor = _algebraic_cofactor(matrix4);
                    return [algebraic_cofactor[0], algebraic_cofactor[4], algebraic_cofactor[8], algebraic_cofactor[12], algebraic_cofactor[1], algebraic_cofactor[5], algebraic_cofactor[9], algebraic_cofactor[13], algebraic_cofactor[2], algebraic_cofactor[6], algebraic_cofactor[10], algebraic_cofactor[14], algebraic_cofactor[3], algebraic_cofactor[7], algebraic_cofactor[11], algebraic_cofactor[15]];
                };

                // 求一个4x4矩阵的逆矩阵A'
                var _inverse_matrix = function (matrix4) {
                    var adjoint = _adjoint_matrix(matrix4),
                        determinant = _determinant(matrix4),
                        flag,
                        newMatrix4 = [];
                    if (determinant == 0) throw new Error('This matrix is irreversible!');
                    for (flag = 0; flag < 16; flag++) newMatrix4[flag] = adjoint[flag] / determinant;
                    return newMatrix4;
                };
                // 在(a,b,c)方向位移d
                var _move = function (d, a, b, c) {
                    c = c || 0;
                    var sqrt = Math.sqrt(a * a + b * b + c * c);
                    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, a * d / sqrt, b * d / sqrt, c * d / sqrt, 1];
                };
                // 围绕0Z轴旋转
                // 其它的旋转可以借助transform实现
                // 旋转角度单位采用弧度制
                var _rotate = function (deg) {
                    var sin = Math.sin(deg),
                        cos = Math.cos(deg);
                    return [cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
                };
                // 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
                var _scale = function (xTimes, yTimes, zTimes, cx, cy, cz) {
                    cx = cx || 0; cy = cy || 0; cz = cz || 0;
                    return [xTimes, 0, 0, 0, 0, yTimes, 0, 0, 0, 0, zTimes, 0, cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1];
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
                            [cos1, cos2 * sin1, sin1 * sin2, 0, -sin1, cos1 * cos2, cos1 * sin2, 0, 0, -sin2, cos2, 0, b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1],

                            // OZ轴变回原来的射线的变换矩阵
                            [cos1, -sin1, 0, 0, cos2 * sin1, cos2 * cos1, -sin2, 0, sin1 * sin2, cos1 * sin2, cos2, 0, a1, b1, c1, 1]];
                    } else {
                        throw new Error('a1 and b1 is required!');
                    }
                };
                /**
                 * 4x4矩阵
                 * 列主序存储
                 */
                clay.Matrix4 = function (initMatrix4) {

                    var matrix4 = initMatrix4 || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

                    var matrix4Obj = {

                        // 移动
                        "move": function (dis, a, b, c) {
                            matrix4 = _multiply(_move(dis, a, b, c), matrix4);
                            return matrix4Obj;
                        },

                        // 旋转
                        "rotate": function (deg, a1, b1, c1, a2, b2, c2) {
                            var matrix4s = _transform(a1, b1, c1, a2, b2, c2);
                            matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
                            return matrix4Obj;
                        },

                        // 缩放
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

                        // 逆矩阵
                        "inverse": function () {
                            matrix4 = _inverse_matrix(matrix4);
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

                        // 矩阵的值
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
                            y1 /= x2 - x1;
                            y2 /= x2 - x1;
                            // MR是提前计算好的多项式通解矩阵
                            // 为了加速计算
                            // 如上面说的
                            // 统一在[0,1]上计算后再通过缩放和移动恢复
                            // 避免了动态求解矩阵的麻烦
                            scope.MR = [2 * y1 - 2 * y2 + p3 + p4, 3 * y2 - 3 * y1 - 2 * p3 - p4, p3, y1];
                        } else {
                            throw new Error('The point position should be increamented!');
                        }
                        return hermite;
                    };

                    return hermite;
                };
                /**
                 * Cardinal三次插值
                 * ----------------------------
                 * Hermite拟合的计算是，确定二个点和二个点的斜率
                 * 用一个y=ax(3)+bx(2)+cx+d的三次多项式来求解
                 * 而Cardinal是建立在此基础上
                 * 给定需要拟合的二个点和第一个点的前一个点+最后一个点的后一个点
                 * 第一个点的斜率由第一个点的前一个点和第二个点的斜率确定
                 * 第二个点的斜率由第一个点和第二个点的后一个点的斜率确定
                 */
                clay.cardinal = function () {

                    var scope = { "t": 0 };

                    // 根据x值返回y值
                    var i;
                    var cardinal = function (x) {

                        if (scope.hs) {
                            i = -1;
                            // 寻找记录x实在位置的区间
                            // 这里就是寻找对应的拟合函数
                            while (i + 1 < scope.hs.x.length && (x > scope.hs.x[i + 1] || i == -1 && x >= scope.hs.x[i + 1])) {
                                i += 1;
                            }
                            if (i == -1 || i >= scope.hs.h.length) throw new Error('Coordinate crossing!');
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
                            temp = flag < points.length - 1 ? (points[flag + 1][1] - points[flag - 1][1]) / (points[flag + 1][0] - points[flag - 1][0]) : (points[flag][1] - points[flag - 1][1]) / (points[flag][0] - points[flag - 1][0]);
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
                /**
                 *  catmull-rom插值
                 *  给定四个点p0,p1,p2,p3，可以计算出p1,p2之间的插值，其中的p0,p3为控制点
                 */
                clay.catmullRom = function () {

                    var scope = {};

                    // deep为偏移量  deep的取值范围为[0,1]，deep取0将得出p1点，deep取1将得出p2点
                    var catmull = function (deep) {
                        var deep2 = deep * deep,
                            deep3 = deep2 * deep;
                        return [0.5 * (scope.x[0] * deep3 + scope.x[1] * deep2 + scope.x[2] * deep + scope.x[3]), 0.5 * (scope.y[0] * deep3 + scope.y[1] * deep2 + scope.y[2] * deep + scope.y[3])];
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
                        var cos = Math.cos(deg),
                            sin = Math.sin(deg);
                        return [x, y * cos - z * sin, y * sin + z * cos];
                    },

                    // 围绕Y轴旋转
                    _rotateY = function (deg, x, y, z) {
                        var cos = Math.cos(deg),
                            sin = Math.sin(deg);
                        return [z * sin + x * cos, y, z * cos - x * sin];
                    },

                    // 围绕Z轴旋转
                    _rotateZ = function (deg, x, y, z) {
                        var cos = Math.cos(deg),
                            sin = Math.sin(deg);
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
                    },
                        p;

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

                        return [-p[0], //加-号是因为浏览器坐标和地图不一样
                        p[1], p[2]];
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
                /**
                 * 点（x,y）围绕中心（cx,cy）旋转deg度
                 */
                clay.rotate = function (cx, cy, deg, x, y) {
                    var cos = Math.cos(deg),
                        sin = Math.sin(deg);
                    return [((x - cx) * cos - (y - cy) * sin + cx).toFixed(7), ((x - cx) * sin + (y - cy) * cos + cy).toFixed(7)];
                };

                /**
                 * 点（x,y）沿着向量（ax,ay）方向移动距离d
                 */
                clay.move = function (ax, ay, d, x, y) {
                    var sqrt = Math.sqrt(ax * ax + ay * ay);
                    return [(ax * d / sqrt + x).toFixed(7), (ay * d / sqrt + y).toFixed(7)];
                };

                /**
                 * 点（x,y）围绕中心（cx,cy）缩放times倍
                 */
                clay.scale = function (cx, cy, times, x, y) {
                    return [(times * (x - cx) + cx).toFixed(7), (times * (y - cy) + cy).toFixed(7)];
                };
                /**
                 * 着色器一些公共的方法
                 * --------------------------------------------
                 * 主要是和生成特定着色器无关的方法
                 * 着色器分为二类：顶点着色器 + 片段着色器
                 * 前者用于定义一个点的特性，比如位置，大小，颜色等
                 * 后者用于针对每个片段（可以理解为像素）进行处理
                 *
                 * 着色器采用的语言是：GLSL ES语言
                 */

                // 把着色器字符串加载成着色器对象
                var _loadShader = function (gl, type, source) {
                    // 创建着色器对象
                    var shader = gl.createShader(type);
                    if (shader == null) throw new Error('Unable to create shader!');
                    // 绑定资源
                    gl.shaderSource(shader, source);
                    // 编译着色器
                    gl.compileShader(shader);
                    // 检测着色器编译是否成功
                    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Failed to compile shader:' + gl.getShaderInfoLog(shader));
                    return shader;
                };

                // 初始化着色器
                var _useShader = function (gl, vshaderSource, fshaderSource) {
                    // 分别加载顶点着色器对象和片段着色器对象
                    var vertexShader = _loadShader(gl, gl.VERTEX_SHADER, vshaderSource),
                        fragmentShader = _loadShader(gl, gl.FRAGMENT_SHADER, fshaderSource);
                    // 创建一个着色器程序
                    var glProgram = gl.createProgram();
                    // 把前面创建的二个着色器对象添加到着色器程序中
                    gl.attachShader(glProgram, vertexShader);
                    gl.attachShader(glProgram, fragmentShader);
                    // 把着色器程序链接成一个完整的程序
                    gl.linkProgram(glProgram);
                    // 检测着色器程序链接是否成功
                    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) throw new Error('Failed to link program: ' + gl.getProgramInfoLog(glProgram));
                    // 使用这个完整的程序
                    gl.useProgram(glProgram);
                    return glProgram;
                };
                /**
                 * 缓冲区核心方法
                 * --------------------------------------------
                 * 缓冲区分为二种：
                 *  1.缓冲区中保存了包含顶点的数据
                 *  2.缓冲区保存了包含顶点的索引值
                 *
                 */

                // 获取一个新的缓冲区
                // isElement默认false，创建第一种缓冲区，为true创建第二种
                var _newBuffer = function (gl, isElement) {
                    var buffer = gl.createBuffer(),
                        TYPE = isElement ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
                    // 把缓冲区对象绑定到目标
                    gl.bindBuffer(TYPE, buffer);
                    return buffer;
                };

                // 数据写入缓冲区
                // data是一个类型化数组，表示写入的数据
                // usage表示程序如何使用存储在缓冲区的数据
                var _writeBuffer = function (gl, data, usage, isElement) {
                    var TYPE = isElement ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
                    gl.bufferData(TYPE, data, usage);
                };

                // 使用缓冲区数据
                // location指定待分配的attribute变量的存储位置
                // size每个分量个数
                // type数据类型，应该是以下的某个：
                //      gl.UNSIGNED_BYTE    Uint8Array
                //      gl.SHORT            Int16Array
                //      gl.UNSIGNED_SHORT   Uint16Array
                //      gl.INT              Int32Array
                //      gl.UNSIGNED_INT     Uint32Array
                //      gl.FLOAT            Float32Array
                // stride相邻二个数据项的字节数
                // offset数据的起点字节位置
                // normalized是否把非浮点型的数据归一化到[0,1]或[-1,1]区间
                var _useBuffer = function (gl, location, size, type, stride, offset, normalized) {
                    // 把缓冲区对象分配给目标变量
                    gl.vertexAttribPointer(location, size, type, normalized || false, stride || 0, offset || 0);
                    // 连接目标对象和缓冲区对象
                    gl.enableVertexAttribArray(location);
                };

                // 删除缓冲区
                var _deleteBuffer = function (gl, buffer) {
                    gl.deleteBuffer(buffer);
                };
                /**
                 * 纹理方法
                 * --------------------------------------------
                 * 在绘制的多边形上贴图
                 * 丰富效果
                 */

                // 初始化一个纹理对象
                // type有两个选择gl.TEXTURE_2D代表二维纹理，gl.TEXTURE_CUBE_MAP 立方体纹理
                var _initTexture = function (gl, unit, type) {
                    // 创建纹理对象
                    var texture = gl.createTexture();
                    // 开启纹理单元，unit表示开启的编号
                    gl.activeTexture(gl['TEXTURE' + unit]);
                    // 绑定纹理对象到目标上
                    gl.bindTexture(type, texture);
                    return texture;
                };

                // 配置纹理
                var _configTexture = function (gl, type, config) {
                    var key;
                    for (key in config) {
                        /**
                         *
                         * 可配置项有四个：
                         *  1. gl.TEXTURE_MAX_FILTER：放大方法
                         *  2. gl.TEXTURE_MIN_FILTER：缩小方法
                         *  3. gl.TEXTURE_WRAP_S：水平填充方法
                         *  4. gl.TEXTURE_WRAP_T：垂直填充方法
                         *
                         */
                        gl.texParameteri(type, gl[key], gl[config[key]]);
                    }
                };

                // 链接资源图片
                // level默认传入0即可，和金字塔纹理有关
                // format表示图像的内部格式：
                //      gl.RGB(红绿蓝)
                //      gl.RGBA(红绿蓝透明度)
                //      gl.ALPHA(0.0,0.0,0.0,透明度)
                //      gl.LUMINANCE(L、L、L、1L:流明)
                //      gl.LUMINANCE_ALPHA(L、L、L,透明度)
                // textureType表示纹理数据的格式：
                //      gl.UNSIGNED_BYTE: 表示无符号整形，每一个颜色分量占据1字节
                //      gl.UNSIGNED_SHORT_5_6_5: 表示RGB，每一个分量分别占据占据5, 6, 5比特
                //      gl.UNSIGNED_SHORT_4_4_4_4: 表示RGBA，每一个分量分别占据占据4, 4, 4, 4比特
                //      gl.UNSIGNED_SHORT_5_5_5_1: 表示RGBA，每一个分量分别占据占据5比特，A分量占据1比特
                var _linkImage = function (gl, type, level, format, textureType, image) {
                    gl.texImage2D(type, level, format, format, textureType, image);
                };

                // 删除纹理
                var _deleteTexture = function (gl, texture) {
                    gl.deleteTexture(texture);
                };
                // 获取webgl上下文
                function _getCanvasWebgl(node, opts) {
                    var names = _webgl_types,
                        context = null,
                        i;
                    for (i = 0; i < names.length; i++) {
                        try {
                            context = node.getContext(names[i], opts);
                        } catch (e) { }
                        if (context) break;
                    }
                    return context;
                }

                // 启动webgl绘图
                clay.prototype.webgl = function (opts) {
                    var gl = _getCanvasWebgl(this[0], opts),
                        glObj = {
                            "painter": function () {
                                return gl;
                            },

                            // 启用着色器
                            "shader": function (vshaderSource, fshaderSource) {
                                gl.program = _useShader(gl, vshaderSource, fshaderSource);
                                return glObj;
                            },

                            // 缓冲区
                            "buffer": function (isElement) {
                                // 创建缓冲区
                                var buffer = _newBuffer(gl, isElement),
                                    bufferData,
                                    bufferObj = {
                                        // 写入数据
                                        "write": function (data, usage) {
                                            usage = usage || gl.STATIC_DRAW;
                                            _writeBuffer(gl, data, usage, isElement);
                                            bufferData = data;
                                            return bufferObj;
                                        },
                                        // 分配使用
                                        "use": function (location, size, stride, offset, type, normalized) {
                                            var fsize = bufferData.BYTES_PER_ELEMENT;
                                            if (typeof location == 'string') location = gl.getAttribLocation(gl.program, location);
                                            stride = stride || 0;
                                            offset = offset || 0;
                                            type = type || gl.FLOAT;
                                            _useBuffer(gl, location, size, type, stride * fsize, offset * fsize, normalized);
                                            return bufferObj;
                                        },
                                        // 关闭退出
                                        "close": function () {
                                            _deleteBuffer(gl, buffer);
                                            return glObj;
                                        }
                                    };
                                return bufferObj;
                            },

                            // 纹理
                            "texture": function (unit, type) {
                                type = type || gl.TEXTURE_2D;
                                // 创建纹理
                                var texture = _initTexture(gl, unit, type);
                                var textureObj = {
                                    // 配置纹理对象
                                    "config": function (config) {
                                        _configTexture(gl, type, config);
                                        return textureObj;
                                    },
                                    // 链接图片资源
                                    "use": function (level, format, textureType, image) {
                                        _linkImage(gl, type, level, format, textureType, image);
                                        return textureObj;
                                    },
                                    // 关闭纹理
                                    "close": function () {
                                        _deleteTexture(gl, texture);
                                        return glObj;
                                    }
                                };
                                return textureObj;
                            }

                        };

                    return glObj;
                };
                /**
                 * 无论绘制的树结构是什么样子的
                 * 计算时都假想目标树的样子如下：
                 *  1.根结点在最左边，且上下居中
                 *  2.树是从左往右生长的结构
                 *  3.每个结点都是一块1*1的正方形，top和left分别表示正方形中心的位置
                 *
                 */
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

                            var beforeDis = [],
                                size = 0,
                                maxDeep = 0;
                            (function positionCalc(pNode, deep) {

                                if (deep > maxDeep) maxDeep = deep;
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

                                // 因为计算孩子的时候
                                // 无法掌握父辈兄弟的情况
                                // 可能会出现父亲和兄弟重叠问题
                                if (alltreedata[pNode.id].top <= beforeDis[deep]) {
                                    var needUp = beforeDis[deep] + 1 - alltreedata[pNode.id].top;
                                    (function doUp(_pid, _deep) {
                                        alltreedata[_pid].top += needUp;
                                        if (beforeDis[_deep] < alltreedata[_pid].top) beforeDis[_deep] = alltreedata[_pid].top;
                                        var _flag;
                                        for (_flag = 0; _flag < alltreedata[_pid].children.length; _flag++) {
                                            doUp(alltreedata[_pid].children[_flag], _deep + 1);
                                        }
                                    })(pNode.id, deep);
                                }

                                // 计算好一个结点后，需要更新此刻该层的上边缘
                                beforeDis[deep] = alltreedata[pNode.id].top;

                                // size在每次计算一个结点后更新，是为了最终绘图的时候知道树有多宽（此处应该叫高）
                                if (alltreedata[pNode.id].top + 0.5 > size) size = alltreedata[pNode.id].top + 0.5;
                            })(alltreedata[rootid], 0);

                            // 传递的参数分别表示：记录了位置信息的树结点集合、根结点ID和树的宽
                            return {
                                "node": alltreedata,
                                "root": rootid,
                                "size": size,
                                "deep": maxDeep + 1
                            };
                        };

                    /**
                     * 根据配置的层次关系（配置的id,child,root）把原始数据变成内部结构，方便后期位置计算
                     * @param {any} initTree
                     *
                     * tempTree[id]={
                     *  "data":原始数据,
                     *  "pid":父亲ID,
                     *  "id":唯一标识ID,
                     *  "children":[cid1、cid2、...]
                     * }
                     */
                    var toInnerTree = function (initTree) {

                        var tempTree = {};
                        // 根结点
                        var temp = scope.e.root(initTree),
                            id,
                            rid;
                        id = rid = scope.e.id(temp);
                        tempTree[id] = {
                            "data": temp,
                            "pid": null,
                            "id": id,
                            "children": []
                        };
                        // 根据传递的原始数据，生成内部统一结构
                        (function createTree(pdata, pid) {
                            var children = scope.e.child(pdata, initTree),
                                flag;
                            for (flag = 0; children && flag < children.length; flag++) {
                                id = scope.e.id(children[flag]);
                                tempTree[pid].children.push(id);
                                tempTree[id] = {
                                    "data": children[flag],
                                    "pid": pid,
                                    "id": id,
                                    "children": []
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
                        return update();
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

                    return tree;
                };
                /**
                 * 扩展配置常规属性
                 * 包括额外方法
                 */
                clay.config = function ($provider, content) {
                    _provider[$provider](content);
                    return clay;
                };

                return clay;
            });

            /***/
}),
/* 3 */
/***/ (function (module, exports, __webpack_require__) {

            module.exports = __webpack_require__(1);


            /***/
})
/******/]);
