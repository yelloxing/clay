/*!
*
* clay - Provide more flexible data visualization solutions!
* git+https://github.com/yelloxing/clay.git
* 
* author 心叶
*
* version 1.2.1
* 
* build Sun Jul 29 2018
*
* Copyright yelloxing
* Released under the MIT license
* 
* Date:Sun Sep 23 2018 01:09:59 GMT+0800 (CST)
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
    };

    clay.prototype.init = function (selector, context) {

        if (typeof selector === 'function') {
            if (clay.__isLoad__) {
                selector();
            } else {
                if (document.addEventListener) {//Mozilla, Opera and webkit
                    document.addEventListener("DOMContentLoaded", function doListenter() {
                        document.removeEventListener("DOMContentLoaded", doListenter, false);
                        selector();
                        clay.__isLoad__ = true;
                    });
                } else if (document.attachEvent) {//IE
                    document.attachEvent("onreadystatechange", function doListenter() {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", doListenter);
                            selector();
                            clay.__isLoad__ = true;
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

// 数学计算、比例尺、绘图方案svg+canvas+webgl、布局
clay.math = {};
clay.scale = {};
clay.svg = {}; clay.canvas = {}; clay.webgl = {};
clay.layout = {};

// 记录需要使用xlink命名空间常见的xml属性
var _xlink = ["href", "title", "show", "type", "role", "actuate"];

// 库仑常数、引力常数
var _physics = {
    K: 8988000000,
    G: 0.00000000667
};

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
	if (/[A-Z]/.test(child.tagName)) {
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

clay.prototype.find = function (selector) {
	if (this.length <= 0) return clay();
	var newClay = clay(),
		nodes = _sizzle(selector, this[0]), flag;
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

clay.prototype.attr = function (attr, val) {

	if (val == null || val == undefined) {
		return this.length > 0 ? this[0].getAttribute(attr) : undefined;
	} else {
		var flag, _val;
		for (flag = 0; flag < this.length; flag++) {
			_val = typeof val === 'function' ? val(this[flag]._data, flag) : val;
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
    for (flag = 0; this._exit && flag < this._exit.length; flag++) {
        newClay[flag] = this._exit[flag];
        newClay.length += 1;
    }
    delete this._exit;
    return newClay;

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
            throw new Error('Unsupported data!');
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
            throw new Error('Unsupported data!');
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
			throw new Error('Unsupported data!');
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
			if (typeof deg !== 'number') throw new Error('Unsupported data!');
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

		if (typeof x !== 'number' || typeof y !== 'number') throw new Error('Unsupported data!');
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
			if (typeof d !== 'number') throw new Error('Unsupported data!');
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

		if (typeof x !== 'number' || typeof y !== 'number') throw new Error('Unsupported data!');
		if (typeof z !== 'number') z = 0;
		scope.P = [x, y, z];
		return move;

	};

	// 设置移动方向
	move.setD = function (a, b, c) {

		if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Unsupported data!');
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
			if (typeof m !== 'number') throw new Error('Unsupported data!');
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

		if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Unsupported data!');
		if (typeof c !== 'number') c = 0;
		scope.C = [a, b, c];
		return scale;

	};

	// 设置点最初的位置
	scale.setP = function (x, y, z) {

		if (typeof x !== 'number' || typeof y !== 'number') throw new Error('Unsupported data!');
		if (typeof z !== 'number') z = 0;
		scope.P = [x, y, z];
		return scale;

	};

	return scale;

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
            // 更新前调用
            if (scope.e.live && typeof scope.e.live[0] === 'function') scope.e.live[0]();

            alltreedata[rootid].top = alltreedata[rootid].size / 2;
            alltreedata[rootid].left = 0.5;
            (function drawer(pNode, beforeSize) {
                var children = pNode.children, flag, child;
                for (flag = 0; children && flag < children.length; flag++) {
                    // 计算位置
                    alltreedata[children[flag]].top = beforeSize + alltreedata[children[flag]].size / 2;
                    alltreedata[children[flag]].left = pNode.left + 1;

                    // 画线条
                    scope.e.drawer[1](pNode, alltreedata[children[flag]]);

                    drawer(alltreedata[children[flag]], beforeSize);
                    beforeSize += alltreedata[children[flag]].size;
                }

                //  画结点
                scope.e.drawer[0](pNode);

            })(alltreedata[rootid], 0);

            // 更新结束调用
            if (scope.e.live && typeof scope.e.live[1] === 'function') scope.e.live[1]();
        };

    // 可以传递任意格式的树原始数据
    // 只要配置对应的解析方法即可
    var tree = function (initTree) {

        alltreedata = {};
        // 根结点
        var temp = scope.e.root(initTree), id;
        id = rootid = scope.e.id(temp);
        alltreedata[id] = {
            "data": temp,
            "pid": null,
            "children": []
        };
        // 根据传递的原始数据，生成内部统一结构
        (function createTree(pdata, pid) {
            var children = scope.e.child(pdata, initTree), flag;
            for (flag = 0; children && flag < children.length; flag++) {
                id = scope.e.id(children[flag]);
                alltreedata[pid].children.push(id);
                alltreedata[id] = {
                    "data": children[flag],
                    "pid": pid,
                    "children": []
                };
                createTree(children[flag], id);
            }
        })(temp, id);
        // 计算位置
        // 预计算
        // 因为最终位置会根据配置进行调整
        (function calcPosition(id) {
            var width = 1, flag = 0,
                children = alltreedata[id].children;
            for (; children && flag < children.length; flag++) {
                width += calcPosition(children[flag]);
            }
            alltreedata[id].size = children && children.length > 0 ? width - 1 : 1;
            return alltreedata[id].size;
        })(rootid);
        update();
        return tree;

    };

    // 挂载处理事件
    // 获取根结点的方法:root(initTree)
    // 获取子结点的方法:child(parentTree,initTree)
    // 获取结点ID方法:id(treedata)
    // 生命钩子 live([beforback(),afterback()])
    // 结点更新处理方法 drawer(nodeback(node), linkback(pNode, node))
    tree.bind = function (backname, callback, moreback) {
        if (/^(live|drawer)$/.test(backname))
            scope.e[backname] = [callback, moreback];
        else
            scope.e[backname] = callback;
        return tree;
    };

    return tree;

};

clay.layout.force = function (width, height) {

    var scope = {
        "e": {}
    }, allNode, allLink,
        // 标记轮播计算是否在运行中
        running = false,

        // 更新库伦斥力
        updateReplusion = function () {
            var dx, dy, dsq, d, f, x, y, fx, fy;
            for (x = 0; x < allNode.length - 1; x++) {
                for (y = x + 1; y < allNode.length; y++) {
                    dx = allNode[y].x - allNode[x].x;
                    dy = allNode[y].y - allNode[x].y;
                    if (dx != 0 || dy != 0) {
                        dsq = dx * dx + dy * dy;
                        d = Math.sqrt(dsq);
                        // 电荷都是0.0001
                        f = 0.0001 * _physics.K / dsq;
                        fx = f * dx / d;
                        fy = f * dy / d;
                        allNode[x]._forceX -= fx;
                        allNode[x]._forceY -= fy;
                        allNode[y]._forceX += fx;
                        allNode[y]._forceY += fy;
                    }
                }
            }
        },

        // 更新弹簧引力
        updateSpring = function () {
            var flag, dx, dy, x, y, d, f, fx, fy;
            for (flag = 0; flag < allLink.length; flag++) {
                x = allLink[flag].link[0];
                y = allLink[flag].link[1];
                dx = scope.n[y].x - scope.n[x].x;
                dy = scope.n[y].y - scope.n[x].y;
                if (dx != 0 || dy != 0) {
                    d = Math.sqrt(dx * dx + dy * dy);
                    // 弹簧系数先写死
                    f = 10 * (d - allLink[flag].length);
                    fx = f * dx / d;
                    fy = f * dy / d;
                    // scope.n和allNode二种方式访问效果一样
                    // 这是一个好效果
                    scope.n[x]._forceX += fx;
                    scope.n[x]._forceY += fy;
                    scope.n[y]._forceX -= fx;
                    scope.n[y]._forceY -= fy;
                }
            }
        },

        // 更新位置
        update = function () {

            running = true;
            var flag, dx, dy, dsq, s;

            // 初始化受力
            for (flag = 0; flag < allNode.length; flag++) {
                allNode[flag]._forceX = 0;
                allNode[flag]._forceY = 0;
            }

            // 更新力，得出加速度
            updateReplusion();
            updateSpring();
            // 更新位置
            for (flag = 0; flag < allNode.length; flag++) {
                // 速度verlet
                // 下一时刻的位置只依赖于当前时刻的位置、速度 和 加速度
                // 新位置=旧位置+速度*时间+0.5*加速度*时间*时间
                // 具体格式使用泰勒展开（在dt处展开）
                // 这里为了模拟效果，调整了一些参数
                dx = allNode[flag]._vx / 50 + 2 * allNode[flag]._ax;
                dy = allNode[flag]._vy / 50 + 2 * allNode[flag]._ay;
                dsq = dx * dx + dy * dy;
                // 超过一次改变最大程度
                if (dsq > 10) {
                    s = Math.sqrt(10 / dsq);
                    dx *= s;
                    dy *= s;
                }
                // 该模型的特点是，向四周扩散，是否需要改进为中心聚拢，后期再说
                if (allNode[flag].x + dx < 0 || allNode[flag].x + dx > width) dx = 0;
                if (allNode[flag].y + dy < 0 || allNode[flag].y + dy > height) dy = 0;
                allNode[flag].x += dx;
                allNode[flag].y += dy;
                // 更新速度和加速度
                // 新速度=旧速度+（之前加速度+现在加速度）*0.5*时间
                allNode[flag]._vx += (allNode[flag]._ax + allNode[flag]._forceX) * 0.5;
                allNode[flag]._vy += (allNode[flag]._ay + allNode[flag]._forceY) * 0.5;
                allNode[flag]._ax = allNode[flag]._forceX;
                allNode[flag]._ay = allNode[flag]._forceY;
            }

            // 调用钩子
            if (scope.e.live && typeof scope.e.live[0] === 'function') scope.e.live[0]();
            for (flag = 0; flag < allLink.length; flag++) {
                scope.e.update[1](allLink[flag], scope.n[allLink[flag].link[0]], scope.n[allLink[flag].link[1]]);
            }
            for (flag = 0; flag < allNode.length; flag++) {
                scope.e.update[0](scope.n[allNode[flag].id]);
            }
            if (scope.e.live && typeof scope.e.live[1] === 'function') scope.e.live[1]();
            if (scope._n_ > 0) {
                scope._n_ -= 1;
                window.setTimeout(function () {
                    update();
                }, 40);
            } else {
                running = false;
            }

        };

    // 初始化环境
    var force = function (nodes, links) {

        scope.n = {};
        allNode = nodes;
        allLink = links;
        var flag;
        // 保存结点
        for (flag = 0; flag < nodes.length; flag++) {
            // 注意这里传递的是对象
            // 因此会产生一个方便计算的好效果
            scope.n[nodes[flag].id] = nodes[flag];
            scope.n[nodes[flag].id]._link = [];

        }

        // 记录弹簧
        for (flag = 0; flag < links.length; flag++) {

            scope.n[links[flag].link[0]]._link.push({
                'link': links[flag].link[1],
                'length': links[flag].length
            });
            scope.n[links[flag].link[1]]._link.push({
                'link': links[flag].link[0],
                'length': links[flag].length
            });

        }

        var num = Math.ceil(width / Math.sqrt(width * height / nodes.length)),
            sw = width / num;

        // 初始化结点位置，速度，加速度
        for (flag = 0; flag < nodes.length; flag++) {
            scope.n[nodes[flag].id].x = flag % num * sw + sw * 0.5;
            scope.n[nodes[flag].id].y = Math.ceil((flag + 1) / num) * sw - sw * 0.5;
            scope.n[nodes[flag].id]._vx = 0;
            scope.n[nodes[flag].id]._vy = 0;
            scope.n[nodes[flag].id]._ax = 0;
            scope.n[nodes[flag].id]._ay = 0;
        }

        // 启动初始化方法
        for (flag = 0; flag < links.length; flag++) {
            scope.e.init[1](links[flag], scope.n[links[flag].link[0]], scope.n[links[flag].link[1]]);
        }
        for (flag = 0; flag < nodes.length; flag++) {
            scope.e.init[0](scope.n[nodes[flag].id]);
        }

        // 启动更新
        scope._n_ = 1000;
        update();
        return force;

    };

    // 挂载处理事件
    // 初始化环境 init(nodeback(node), linkback(link, sourceNode, targetNode))
    // 结点更新处理方法 update(nodeback(node), linkback(link, sourceNode, targetNode))
    // 生命钩子 live(beforback(),afterback())
    force.bind = function (type, nodeback, linkback) {

        if (typeof nodeback !== 'function') nodeback = function () { };
        if (typeof linkback !== 'function') linkback = function () { };
        scope.e[type] = [nodeback, linkback];
        return force;

    };

    // 对外提供的对特定结点的更新接口
    force.update = function (id, attr, val) {

        scope.n[id][attr] = val;
        scope._n_ = 1000;
        if (!running) update();
        return force;

    };

    return force;

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

// 2D曲线
// config={init,draw,end}
var _line = function (config) {

	var scope = {
		interpolate: 'line',
		dis: 5,
		t: 0,
		flag: false
	};

	// points代表曲线的点集合[[x,y],[x,y],...]
	var line = function (points) {

		if (typeof scope.h === 'number') {
			var cardinal, i,
				result = config.init(points[0][0], scope.flag ? points[0][1] : scope.h - points[0][1]);

			// cardinal插值法
			if (scope.interpolate === 'cardinal') {
				cardinal = clay.math.cardinal().setU(scope.t).setP(points);
				for (i = points[0][0] + scope.dis; i < points[points.length - 1][0]; i += scope.dis)
					result = config.draw(result, i, scope.flag ? cardinal(i) : scope.h - cardinal(i));
			}

			// 默认或错误设置都归结为line
			else {
				for (i = 1; i < points.length; i++)
					result = config.draw(result, points[i][0], scope.flag ? points[i][1] : scope.h - points[i][1]);
			}

			return config.end(result);
		} else {
			throw new Error('You need to set the height first!');
		}

	};

	// flag可以不传递，默认false，表示y坐标轴方向和数学上保存一致
	// 只有在设置为true的时候，才会使用浏览器的方式
	line.setFlag = function (flag) {

		scope.flag = flag;
		return line;

	};

	// 设置所在组的高
	// 参数应该是一个数字
	line.setHeight = function (height) {

		if (typeof height !== 'number' || height <= 0)
			throw new Error('Unsupported data!');
		scope.h = height;
		return line;

	};

	// 设置张弛系数
	line.setT = function (t) {

		if (typeof t === 'number') {
			scope.t = t;
		} else {
			throw new Error('Unsupported data!');
		}
		return line;

	};

	// 设置精度
	line.setPrecision = function (dis) {

		if (typeof dis === 'number') {
			scope.dis = dis;
		} else {
			throw new Error('Unsupported data!');
		}
		return line;

	};

	// 设置曲线插值方法
	line.interpolate = function (type) {

		scope.interpolate = type;
		return line;

	};

	return line;

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

		if (typeof r1 !== 'number' || typeof r2 !== 'number')
			throw new Error('Unsupported data!');
		scope.r = [r1, r2];
		return arc;

	};

	// 设置弧中心
	arc.setCenter = function (x, y) {

		if (typeof x !== 'number' || typeof y !== 'number')
			throw new Error('Unsupported data!');
		rotate.setL(x, y);
		scope.c = [x, y];
		return arc;

	};

	return arc;

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

clay.svg.line = function () {

	return _line({
		init: function (x, y) {
			return "M" + x + " " + y + "L";
		},
		draw: function (d, x, y) {
			return d + "" + x + " " + y + ",";
		},
		end: function (d) {
			return d.replace(/,$/, '');
		}
	});

};

clay.canvas.arc = function (selector, config) {

	var key,
		obj = _canvas(selector, config, _arc, function (
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

clay.canvas.line = function (selector, config) {

	var key,
		// 返回画线条的流程控制函数
		// 并且返回的函数挂载了canvas特有的方法和属性
		// 因此称之为基本的canvas对象
		obj = _canvas(selector, config, _line, {
			init: function (x, y) {
				obj._painter.moveTo(x, y);
				return obj._painter;
			},
			draw: function (painter, x, y) {
				painter.lineTo(x, y);
				return painter;
			},
			end: function (painter) {
				for (key in obj._config)
					painter[key] = obj._config[key];
				painter.stroke();
				return painter;
			}
		});

	return obj;

};

    clay.__isLoad__ = false;

    clay.author = '心叶';
    clay.email = 'yelloxing@gmail.com';
    clay.version = '1.2.1';

    global.clay = global.$$ = clay;

    return clay;

});
