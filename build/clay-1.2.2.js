/*!
*
* clay - Provide more flexible data visualization solutions!
* git+https://github.com/yelloxing/clay.git
* 
* author 心叶
*
* version 1.2.2
* 
* build Sun Jul 29 2018
*
* Copyright yelloxing
* Released under the MIT license
* 
* Date:Tue Oct 09 2018 16:15:05 GMT+0800 (CST)
*/
(function (global, factory) {

    'use strict';

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        factory(global);
    }

})(typeof window !== "undefined" ? window : this, function (global, undefined) {

    'use strict';

    var clay = function (selector, context) {
        return new clay.prototype.init(selector, context);
    }, __isLoad__;

    clay.prototype.init = function (selector, context) {

        if (typeof selector === 'function') {
            if (__isLoad__) {
                selector();
            } else {
                if (document.addEventListener) {//Mozilla, Opera and webkit
                    document.addEventListener("DOMContentLoaded", function doListenter() {
                        document.removeEventListener("DOMContentLoaded", doListenter, false);
                        selector();
                        __isLoad__ = true;
                    });
                } else if (document.attachEvent) {//IE
                    document.attachEvent("onreadystatechange", function doListenter() {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", doListenter);
                            selector();
                            __isLoad__ = true;
                        }
                    });
                }
            }
        } else {
            this.context = context = context || document;
            var nodes = _sizzle(selector, context), flag;
            for (flag = 0; flag < nodes.length; flag++) {
                this[flag] = nodes[flag];
            }
            this.selector = selector;
            this.length = nodes.length;
        }
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

// 数学计算、映射计算、绘图方案svg+canvas、布局
clay.math = {};
clay.scale = {};
clay.svg = {}; clay.canvas = {};
clay.layout = {};

// 记录需要使用xlink命名空间常见的xml属性
var _xlink = ["href", "title", "show", "type", "role", "actuate"];

var _Geography = [
    // 地球
    {
        R: 6317000// 半径
    }
];

// 负责查找结点
function _sizzle(selector, context) {

	var temp = [], flag;
	if (typeof selector === 'string') {
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
    if (child.tagName == 'canvas' || /[A-Z]/.test(child.tagName)) {
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
        this.length+=1;
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

// 用于把数据绑定到一组结点或返回第一个结点数据
// 可以传递函数对数据处理
clay.prototype.datum = function (data, calcback) {

    if (data === null || data === undefined) {
        return this.length > 0 ? this[0]._data : undefined;
    } else {
        data = typeof calcback === 'function' ? calcback(data) : data;
        var flag;
        for (flag = 0; flag < this.length; flag++) {
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
        newClay.selector=this.selector;
        for (flag = 0; flag < datas.length && flag < this.length; flag++) {
            this[flag]._data = typeof calcback === 'function' ? calcback(datas[flag]) : datas[flag];
            newClay[flag] = this[flag];
            newClay.length += 1;
        }
        // 分别记录需要去平衡的数据和结点
        newClay._enter = [];
        for (; flag < datas.length; flag++) {
            newClay._enter.push(typeof calcback === 'function' ? calcback(datas[flag]) : datas[flag]);
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
    newClay.selector=this.selector;
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
    newClay.selector=this.selector;
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

// 返回不少于指定个数的颜色值数组
clay.getColors = function (num) {

    if (typeof num == 'number' && num > 3) {

        var temp = [], flag = 0;
        for (flag = 1; flag <= num; flag++)
            temp.push('rgb(' + (Math.random(1) * 230 + 20) + ',' + (Math.random(1) * 230 + 20) + ',' + (Math.random(1) * 230 + 20) + ')');
        return temp;

    } else {
        return ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)'];
    }

};

// 返回最大值
clay.max = function (array, valback) {

    valback = typeof valback === 'function' ? valback : function (data) { return data; };
    var flag = 1, max = array[0], maxval = valback(array[0], 0), nowval;
    for (; flag < array.length; flag++) {
        nowval = valback(array[flag], flag);
        if (maxval < nowval) {
            max = array[flag];
            maxval = nowval;
        }
    }
    return max;

};

// 返回最小值
clay.min = function (array, valback) {

    valback = typeof valback === 'function' ? valback : function (data) { return data; };
    var flag = 1, min = array[0], minval = valback(array[0], 0), nowval;
    for (; flag < array.length; flag++) {
        nowval = valback(array[flag], flag);
        if (minval > nowval) {
            min = array[flag];
            minval = nowval;
        }
    }
    return min;

};

// 给一组数据，轮询执行一遍
clay.loop = function (datas, callback) {
    var flag = 0, data;
    for (data in datas) {
        callback(datas[data], flag, data);
        flag += 1;
    }
    return clay;

};

// Hermite三次插值
clay.math.hermite = function () {

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

// Cardinal三次插值
clay.math.cardinal = function () {

    var scope = { "t": 0 };

    // 根据x值返回y值
    var i;
    var cardinal = function (x) {

        if (scope.hs) {
            i = -1;
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
            scope.hs.h[flag - 1] = clay.math.hermite().setU(scope.t).setP(points[flag - 1][0], points[flag - 1][1], points[flag][0], points[flag][1], slope, temp);
            slope = temp;
        }
        return cardinal;

    };

    return cardinal;
};

// 围绕任意射线旋转
clay.math.rotate = function () {

    var scope = {};

    // 旋转方向满足右手法则
    // flag表示是否把这次旋转后位置标记为下次旋转开始位置
    // deg采用弧度值单位
    var rotate = function (deg, flag) {

        if (scope.M && scope.P) {
            var x = scope.M.A[0][0] * scope.P[0] + scope.M.A[0][1] * scope.P[1] + scope.M.A[0][2] * scope.P[2] + scope.M.A[0][3],
                y = scope.M.A[1][0] * scope.P[0] + scope.M.A[1][1] * scope.P[1] + scope.M.A[1][2] * scope.P[2] + scope.M.A[1][3],
                z = scope.M.A[2][0] * scope.P[0] + scope.M.A[2][1] * scope.P[1] + scope.M.A[2][2] * scope.P[2] + scope.M.A[2][3],
                cos = Math.cos(deg),
                sin = Math.sin(deg);
            var t = x * cos - y * sin;
            y = x * sin + y * cos;
            x = t;
            var temp = [
                scope.M.B[0][0] * x + scope.M.B[0][1] * y + scope.M.B[0][2] * z + scope.M.B[0][3],
                scope.M.B[1][0] * x + scope.M.B[1][1] * y + scope.M.B[1][2] * z + scope.M.B[1][3],
                scope.M.B[2][0] * x + scope.M.B[2][1] * y + scope.M.B[2][2] * z + scope.M.B[2][3]
            ];
            temp[0] = Math.round(temp[0] * 100000000000000) / 100000000000000;
            temp[1] = Math.round(temp[1] * 100000000000000) / 100000000000000;
            temp[2] = Math.round(temp[2] * 100000000000000) / 100000000000000;
            // 如果flag为true，标记为下次旋转开始位置
            if (flag) {
                scope.P = temp;
            }
            return temp;
        } else {
            throw new Error('You shoud first set the ray and position!');
        }
    };

    // 设置旋转射线
    // (a1,b1,c1)->(a2,b2,c2)
    rotate.setL = function (a1, b1, c1, a2, b2, c2) {

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
            //旋转矩阵
            scope.M = {
                // 任意射线变成OZ轴变换矩阵
                A: [
                    [cos1, -sin1, 0, b1 * sin1 - a1 * cos1],
                    [cos2 * sin1, cos1 * cos2, -sin2, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2],
                    [sin1 * sin2, cos1 * sin2, cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2]
                ],
                // OZ轴变回原来的射线的变换矩阵
                B: [
                    [cos1, cos2 * sin1, sin1 * sin2, a1],
                    [-sin1, cos2 * cos1, cos1 * sin2, b1],
                    [0, -sin2, cos2, c1]
                ]
            };

        } else {
            throw new Error('a1 and b1 is required!');
        }
        return rotate;

    };

    // 设置点最初的位置
    rotate.setP = function (x, y, z) {

        if (typeof z !== 'number') z = 0;
        scope.P = [x, y, z];
        return rotate;

    };

    return rotate;

};

// 沿着指定方向移动
clay.math.move = function () {

    var scope = {};

    // 根据移动距离返回移动后位置
    // flag表示是否把这次移动后位置标记为下次移动开始位置
    var move = function (d, flag) {

        if (scope.D && scope.P) {
            var temp = [
                scope.D[0] * d + scope.P[0],
                scope.D[1] * d + scope.P[1],
                scope.D[2] * d + scope.P[2]
            ];
            // 如果flag为true，标记为下次移动开始位置
            if (flag) {
                scope.P = temp;
            }
            return temp;
        } else {
            throw new Error('You shoud first set the direction and position!');
        }

    };

    // 设置点最初的位置
    move.setP = function (x, y, z) {

        if (typeof z !== 'number') z = 0;
        scope.P = [x, y, z];
        return move;

    };

    // 设置移动方向
    move.setD = function (a, b, c) {

        if (typeof c !== 'number') c = 0;
        if (a == 0 && b == 0 && c == 0) {
            scope.D = [0, 0, 0];
        } else {
            var temp = Math.sqrt(a * a + b * b + c * c);
            scope.D = [a / temp, b / temp, c / temp];
        }
        return move;

    };

    return move;

};

// 在设置的中心点缩放指定倍速
clay.math.scale = function () {

    var scope = {
        C: [0, 0, 0]
    };

    // 根据缩放比例返回缩放后位置
    // flag表示是否把这次缩放后位置标记为下次缩放开始位置
    var scale = function (m, flag) {

        if (scope.P) {
            var temp = [
                m * (scope.P[0] - scope.C[0]) + scope.C[0],
                m * (scope.P[1] - scope.C[1]) + scope.C[1],
                m * (scope.P[2] - scope.C[2]) + scope.C[2]
            ];
            // 如果flag为true，标记为下次缩放开始位置
            if (flag) {
                scope.P = temp;
            }
            return temp;
        } else {
            throw new Error('You shoud first set the position!');
        }

    };

    // 设置缩放中心
    scale.setC = function (a, b, c) {

        if (typeof c !== 'number') c = 0;
        scope.C = [a, b, c];
        return scale;

    };

    // 设置点最初的位置
    scale.setP = function (x, y, z) {

        if (typeof z !== 'number') z = 0;
        scope.P = [x, y, z];
        return scale;

    };

    return scale;

};

// 目前不考虑太多，先提供这一种投影方式
// 别的后期再说

// 假定了地球是小圆球

/**
 * 确定中心点以后，
 * 旋转地球，使得中心点作为最高点，
 * 然后垂直纸面的视线
 */

clay.scale.map = function () {

    var scope = {
        c: [107, 36],
        // 缩放比例，默认缩小一万倍
        s: 10000
    };

    var rotate_z = clay.math.rotate().setL(0, 0, 0, 0, 0, 1);
    var rotate_x = clay.math.rotate().setL(0, 0, 0, 1, 0, 0);
    var rotate_y = clay.math.rotate().setL(0, 1, 0, 0, 0, 0);

    // 计算出来的位置是偏离中心点的距离
    var map = function (longitude, latitude) {

        var p = rotate_y.setP(_Geography[0].R / scope.s, 0, 0)(latitude / 180 * Math.PI);
        p = rotate_z.setP(p[0], p[1], p[2])(longitude / 180 * Math.PI);
        p = rotate_z.setP(p[0], p[1], p[2])((90 - scope.c[0]) / 180 * Math.PI);
        p = rotate_x.setP(p[0], p[1], p[2])((90 - scope.c[1]) / 180 * Math.PI);

        return [
            -p[0],
            p[1]
        ];

    };

    map.scale = function (scale) {
        if (typeof scale === 'number') scope.s = scale;
        else return scope.s;
        return map;
    };

    map.center = function (longitude, latitude) {
        if (typeof longitude === 'number' && typeof latitude === 'number') scope.c = [longitude, latitude];
        else return scope.c;
        return map;
    };

    return map;

};

clay.layout.tree = function () {

    var scope = {
        "e": {}
    },
        // 维护的树
        alltreedata,
        // 根结点ID
        rootid,

        update = function () {

            var beforeDis = [], size = 0;
            (function positionCalc(pNode, deep) {

                var flag;
                for (flag = 0; flag < pNode.children.length; flag++)
                    positionCalc(alltreedata[pNode.children[flag]], deep + 1);

                alltreedata[pNode.id].left = deep + 0.5;
                if (flag == 0) {

                    // 如果是叶子结点
                    if (beforeDis[deep] == undefined) beforeDis[deep] = -0.5;
                    if (beforeDis[deep - 1] == undefined) beforeDis[deep - 1] = -0.5;
                    alltreedata[pNode.id].top = beforeDis[deep] + 1;
                    var pTop = beforeDis[deep] + 1 + (alltreedata[pNode.pid].children.length - 1) * 0.5;
                    if (pTop - 1 < beforeDis[deep - 1])
                        // 必须保证父亲结点和父亲的前一个兄弟保存1的距离，至少
                        alltreedata[pNode.id].top = beforeDis[deep - 1] + 1 - (alltreedata[pNode.pid].children.length - 1) * 0.5;

                } else {
                    alltreedata[pNode.id].top = (alltreedata[pNode.children[0]].top + alltreedata[pNode.children[flag - 1]].top) * 0.5;
                }
                beforeDis[deep] = alltreedata[pNode.id].top;
                if (alltreedata[pNode.id].top + 0.5 > size) size = alltreedata[pNode.id].top + 0.5;

            })(alltreedata[rootid], 0);

            // 画图
            scope.e.drawer(alltreedata, rootid, size);

        };

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

    // 挂载处理事件
    // 获取根结点的方法:root(initTree)
    // 获取子结点的方法:child(parentTree,initTree)
    // 获取结点ID方法:id(treedata)
    // 结点更新处理方法 drawer(alltreedata, rootid, size)
    tree.bind = function (backname, callback, moreback) {
        scope.e[backname] = callback;
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

// 基本的canvas对象
// config采用canvas设置属性的api
// 前二个参数不是必输项
// 绘制前再提供下面提供的方法设置也是可以的
// 第三个参数代表图形绘制控制方法
// 最后一个是配置给控制方法的参数
var _canvas = function (_selector, config, painterback, param) {

    var key, temp = painterback(param);
    temp._config = config || {};
    temp._painter = _getCanvas2D(_selector);

    // 获取画笔
    temp.canvas = function (selector) {
        temp._painter = _getCanvas2D(selector);
        return temp;
    };

    // 配置画笔
    temp.config = function (_config) {
        for (key in _config)
            temp._config[key] = _config[key];
        return temp;
    };

    return temp;

};

// 考虑到canvas画图时就一个图层会有诸多不便
// 提供一个可以使用图层绘制的canvas对象
// 考虑到效率问题，和绘画独立出来
clay.canvas.layer = function (selector, width, height) {
    // 画笔
    var painter = selector ? _getCanvas2D(selector) : undefined,
        canvas = [],
        // 图层集合
        layer = {};
    var layerManager = {
        "get": function (index) {
            if (!layer[index] || layer[index].constructor !== CanvasRenderingContext2D) {

                canvas.push(document.createElement('canvas'));
                // 设置大小才会避免莫名其妙的错误
                canvas[canvas.length - 1].setAttribute('width', width);
                canvas[canvas.length - 1].setAttribute('height', height);

                layer[index] = canvas[canvas.length - 1].getContext('2d');
            }
            return layer[index];
        },
        "clearn": function () {
            layer = {};
            canvas = {};
            return layerManager;
        },
        "painter": function (selector) {
            if (selector)
                painter = _getCanvas2D(selector);
            return painter;
        },
        "clean": function (ctx2D) {
            ctx2D.clearRect(0, 0, width, height);
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

// 2D弧
var _arc = function (painter) {

	var scope = {
		c: [0, 0],
		r: [100, 140]
	},
		// 辅助计算的旋转对象
		rotate = clay.math.rotate().setL(0, 0);

	// r1和r2，内半径和外半径
	// beginA起点弧度，rotateA旋转弧度式
	var arc = function (beginA, rotateA, r1, r2) {

		if (typeof r1 !== 'number') r1 = scope.r[0];
		if (typeof r2 !== 'number') r2 = scope.r[1];

		var temp = [], p;

		// 内部
		rotate.setP(scope.c[0] + r1, scope.c[1]);
		p = rotate(beginA, true);
		temp[0] = p[0];
		temp[1] = p[1];
		p = rotate(rotateA);
		temp[2] = p[0];
		temp[3] = p[1];

		// 外部
		rotate.setP(scope.c[0] + r2, scope.c[1]);
		p = rotate(beginA, true);
		temp[4] = p[0];
		temp[5] = p[1];
		p = rotate(rotateA);
		temp[6] = p[0];
		temp[7] = p[1];

		return painter(
			scope.c[0], scope.c[1],
			r1, r2,
			beginA, beginA + rotateA,
			temp[0], temp[1],
			temp[4], temp[5],
			temp[2], temp[3],
			temp[6], temp[7]
		);
	};

	// 设置内外半径
	arc.setRadius = function (r1, r2) {

		scope.r = [r1, r2];
		return arc;

	};

	// 设置弧中心
	arc.setCenter = function (x, y) {

		rotate.setL(x, y);
		scope.c = [x, y];
		return arc;

	};

	return arc;

};

// 2D刻度尺
var _ruler = function (painter) {

    var scope = {
        // 间距个数
        'n': 1,
        // 前进方向左侧刻度长度和右侧长度、粗度
        'small': [0, 0, 1],
        'big': [0, 0, 2],
        'color': '#000'
    };

    var ruler = function (begin, end) {

        var flag, dis = (end - begin) / scope.n, tempResult = [];
        for (flag = begin; (dis > 0 && flag <= end) || (dis < 0 && flag >= end); flag += dis) {
            // 大刻度
            tempResult.push(painter(flag, scope.big[0], scope.big[1], scope.big[2], typeof scope.color == 'function' ? scope.color(flag) : scope.color, scope));
            if (flag + dis / 5 * 4 < end) {

                // 小刻度
                tempResult.push(painter(flag + dis / 5, scope.small[0], scope.small[1], scope.small[2], typeof scope.color == 'function' ? scope.color(flag + dis / 5) : scope.color, scope));
                tempResult.push(painter(flag + dis / 5 * 2, scope.small[0], scope.small[1], scope.small[2], typeof scope.color == 'function' ? scope.color(flag + dis / 5 * 2) : scope.color, scope));
                tempResult.push(painter(flag + dis / 5 * 3, scope.small[0], scope.small[1], scope.small[2], typeof scope.color == 'function' ? scope.color(flag + dis / 5 * 3) : scope.color, scope));
                tempResult.push(painter(flag + dis / 5 * 4, scope.small[0], scope.small[1], scope.small[2], typeof scope.color == 'function' ? scope.color(flag + dis / 5 * 4) : scope.color, scope));
            }
        }
        return tempResult;

    };

    // set={

    // 【公共参数】
    //     "smallLeft":number
    //     "smallRight":number
    //     "smallSize":number
    //     "bigLeft":number
    //     "bigRight":number
    //     "bigSize":number
    //     "color":string/function
    //     "num":number

    // 【扇形刻度尺特有参数】
    //     "cx":number,
    //     "cy":number,
    //     "radius":number,

    //  【直线刻度尺特有参数】
    //     "direction":"horizontal|vertical",缺省水平的
    //     "seat":number

    // }
    ruler.set = function (config) {

        if (typeof config.smallLeft === 'number') scope.small[0] = config.smallLeft;
        if (typeof config.smallRight === 'number') scope.small[1] = config.smallRight;
        if (typeof config.smallSize === 'number') scope.small[2] = config.smallSize;
        if (typeof config.bigLeft === 'number') scope.big[0] = config.bigLeft;
        if (typeof config.bigRight === 'number') scope.big[1] = config.bigRight;
        if (typeof config.bigSize === 'number') scope.big[2] = config.bigSize;
        if (typeof config.color === 'string' || typeof config.color === 'function') scope.color = config.color;
        if (typeof config.num === 'number') scope.n = config.num;
        if (typeof config.cx === 'number') scope.cx = config.cx;
        if (typeof config.cy === 'number') scope.cy = config.cy;
        if (typeof config.radius === 'number') scope.radius = config.radius;
        if (typeof config.seat === 'number') scope.seat = config.seat;
        if (config.direction === 'horizontal' || config.direction === 'vertical') scope.direction = config.direction;
        return ruler;
    };

    return ruler;

};

clay.svg.arc = function () {

    return _arc(
        // 圆心（cx,cy）
        // 内半径，外半径
        // 开始弧度，结束弧度
        function (
            cx, cy,
            rmin, rmax,
            beginA, endA,
            begInnerX, begInnerY,
            begOuterX, begOuterY,
            endInnerX, endInnerY,
            endOuterX, endOuterY
        ) {

            var f = (endA - beginA) > Math.PI ? 1 : 0,
                d = "M" + begInnerX + " " + begInnerY;
            d +=
                // 横半径 竖半径 x轴偏移角度 0小弧/1大弧 0逆时针/1顺时针 终点x 终点y
                "A" + rmin + " " + rmin + " 0 " + f + " 1 " + endInnerX + " " + endInnerY;
            d += "L" + endOuterX + " " + endOuterY;
            d += "A" + rmax + " " + rmax + " 0 " + f + " 0 " + begOuterX + " " + begOuterY;
            d += "L" + begInnerX + " " + begInnerY;

            return d;

        });

};

clay.svg.arcRuler = function () {

    return _ruler(
        function (
            value,
            leftWidth, rightWidth, size,
            color,
            pageini
        ) {

            return [
                clay.svg.arc()
                    .setCenter(pageini.cx, pageini.cy)
                    (value - size / 2, size, pageini.radius - rightWidth, pageini.radius + leftWidth), color];

        });

};

clay.svg.lineRuler = function () {

    return _ruler(
        function (
            value,
            leftWidth, rightWidth, size,
            color,
            pageini
        ) {

            return [
                pageini.direction === 'vertical' ?
                    'M' + (pageini.seat - rightWidth) + "," + (value - size / 2) +
                    'L' + (pageini.seat + leftWidth) + "," + (value - size / 2) +
                    'L' + (pageini.seat + leftWidth) + "," + (value + size / 2) +
                    'L' + (pageini.seat - rightWidth) + "," + (value + size / 2) +
                    'L' + (pageini.seat - rightWidth) + "," + (value - size / 2) :
                    'M' + (value - size / 2) + "," + (pageini.seat - leftWidth) +
                    'L' + (value + size / 2) + "," + (pageini.seat - leftWidth) +
                    'L' + (value + size / 2) + "," + (pageini.seat + rightWidth) +
                    'L' + (value - size / 2) + "," + (pageini.seat + rightWidth) +
                    'L' + (value - size / 2) + "," + (pageini.seat - leftWidth), color];

        });

};

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
				endOuterX, endOuterY
			) {

				obj._painter.moveTo(begInnerX, begInnerY);
				obj._painter.arc(
					// (圆心x，圆心y，半径，开始角度，结束角度，true逆时针/false顺时针)
					cx, cy, rmin, beginA, endA, false);
				obj._painter.lineTo(endOuterX, endOuterY);
				obj._painter.arc(cx, cy, rmax, endA, beginA, true);
				obj._painter.lineTo(begInnerX, begInnerY);

				for (key in obj._config)
					obj._painter[key] = obj._config[key];
				obj._painter.fill();
				return obj._painter;

			});

	return obj;

};

clay.canvas.arcRuler = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _ruler, function (
                value,
                leftWidth, rightWidth, size,
                color,
                pageini
            ) {
                obj._painter.beginPath();
                for (key in obj._config)
                    obj._painter[key] = obj._config[key];

                // 绘制刻度
                clay.canvas.arc(obj._painter, {
                    'fillStyle': color
                })
                    .setCenter(pageini.cx, pageini.cy)
                    (value - size / 2, size, pageini.radius - rightWidth, pageini.radius + leftWidth);

                return obj._painter;

            });

    return obj;

};

clay.canvas.lineRuler = function (selector, config) {

    var key,
        obj =
            _canvas(selector, config, _ruler, function (
                value,
                leftWidth, rightWidth, size,
                color,
                pageini
            ) {
                obj._painter.beginPath();
                for (key in obj._config)
                    obj._painter[key] = obj._config[key];

                obj._painter.fillStyle = color;

                // 绘制刻度
                if (pageini.direction === 'vertical') {
                    obj._painter.moveTo(pageini.seat - rightWidth, value - size / 2);
                    obj._painter.lineTo(pageini.seat + leftWidth, value - size / 2);
                    obj._painter.lineTo(pageini.seat + leftWidth, value + size / 2);
                    obj._painter.lineTo(pageini.seat - rightWidth, value + size / 2);
                } else {
                    obj._painter.moveTo(value - size / 2, pageini.seat - leftWidth);
                    obj._painter.lineTo(value + size / 2, pageini.seat - leftWidth);
                    obj._painter.lineTo(value + size / 2, pageini.seat + rightWidth);
                    obj._painter.lineTo(value - size / 2, pageini.seat + rightWidth);
                }

                obj._painter.closePath();
                obj._painter.fill();

                return obj._painter;

            });

    return obj;

};


    __isLoad__ = false;

    clay.author = '心叶';
    clay.email = 'yelloxing@gmail.com';
    clay.version = '1.2.2';

    global.clay = global.$$ = clay;

    return clay;

});
