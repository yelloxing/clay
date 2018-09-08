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
* Date:Sun Sep 09 2018 02:10:18 GMT+0800 (CST)
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

var clock = {
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
	clock.timer(function (deep) {
		//其中deep为0-1，表示改变的程度
		doback(deep);
	}, duration, callback);
};

//把tick函数推入堆栈
clock.timer = function (tick, duration, callback) {
	if (typeof tick !== 'function') {
		throw new Error('tick is required!');
	}
	duration = typeof duration === 'number' ? duration : clock.speeds;
	if (duration < 0) duration = -duration;
	clock.timers.push({
		"createTime": new Date(),
		"tick": tick,
		"duration": duration,
		"callback": callback
	});
	clock.start();
};

//开启唯一的定时器timerId
clock.start = function () {
	if (!clock.timerId) {
		clock.timerId = setInterval(clock.tick, clock.interval);
	}
};

//被定时器调用，遍历timers堆栈
clock.tick = function () {
	var createTime, flag, tick, callback, timer, duration, passTime, needStop, deep,
		timers = clock.timers;
	clock.timers = [];
	clock.timers.length = 0;
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
			clock.timers.push(timer);
		} else if (callback) {
			callback();
		}
	}
	if (clock.timers.length <= 0) {
		clock.stop();
	}
};

//停止定时器，重置timerId=null
clock.stop = function () {
	if (clock.timerId) {
		clearInterval(clock.timerId);
		clock.timerId = null;
	}
};

// 把颜色统一转变长rgba(x,x,x,x)格式
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

// 线性比例尺
clay.scale.linear = function () {

	var scope = {};

	// 返回定义域的值对应的值域的值
	var linear = function (domain) {

		if (typeof domain === 'number')
			if (!scope.scaleCalc)
				throw new Error('You shoud first set the domain and range!');
			else if (domain <= scope.domains[0])
				return scope.ranges[0];
			else if (domain >= scope.domains[1])
				return scope.ranges[1];
			else
				return (domain - scope.domains[0]) * scope.scaleCalc + scope.ranges[0];
		else
			throw new Error('A number is required!');


	};

	linear.getDomain = function (range) {

		if (typeof range === 'number')
			if (!scope.scaleCalc)
				throw new Error('You shoud first set the domain and range!');
			else if (range <= scope.ranges[0])
				return scope.domains[0];
			else if (range >= scope.ranges[1])
				return scope.domains[1];
			else
				return (range - scope.ranges[0]) / scope.scaleCalc + scope.domains[0];
		else
			throw new Error('A number is required!');

	};

	// 设置或者获取定义域
	linear.domain = function (domains) {

		if (domains.constructor === Array && domains.length >= 2)
			scope.domains = domains;
		else
			return scope.domains;

		// 如果定义域和值域都已经设置
		// 更新计算方法
		if (scope.ranges)
			scope.scaleCalc = (scope.ranges[1] - scope.ranges[0]) / (scope.domains[1] - scope.domains[0]);
		return linear;

	};


	// 设置或者获取值域
	linear.range = function (ranges) {

		if (ranges.constructor === Array && ranges.length >= 2)
			scope.ranges = ranges;
		else
			return scope.ranges;

		// 如果定义域和值域都已经设置
		// 更新计算方法
		if (scope.domains)
			scope.scaleCalc = (scope.ranges[1] - scope.ranges[0]) / (scope.domains[1] - scope.domains[0]);
		return linear;

	};

	return linear;

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
				return rotate;
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
				return move;
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
				return scale;
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






// 绘制任意2D曲线
clay.svg.line = function () {

	var scope = {
		interpolate: 'line',
		dis: 5,
		t: 0
	};

	// points代表曲线的点集合[[x,y],[x,y],...]
	// flag可以不传递，默认false，表示y坐标轴方向和数学上保存一致
	// 只有在设置为true的时候，才会使用浏览器的方式
	var line = function (points, flag) {

		if (typeof scope.h === 'number') {
			var cardinal, i,
				d = "M" + points[0][0] + " " + (flag ? points[0][1] : scope.h - points[0][1]) + "L";

			// cardinal插值法，目前只支持函数
			if (scope.interpolate === 'cardinal') {
				cardinal = clay.math.cardinal().setU(scope.t).setP(points);
				for (i = points[0][0] + scope.dis; i < points[points.length - 1][0]; i += scope.dis)
					d += i + " " + (flag ? cardinal(i) : scope.h - cardinal(i)) + ",";
			}

			// 默认或错误设置都归结为line
			else {
				for (i = 1; i < points.length; i++)
					d += points[i][0] + " " + (flag ? points[i][1] : scope.h - points[i][1]) + ",";
			}

			d = d.replace(/,$/, '');
			// 返回d属性的路径字符串
			return d;
		} else {
			throw new Error('You need to set the height first!');
		}

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



// 绘制任意2D曲线
clay.canvas.line = function () {

	var scope = {
		interpolate: 'line',
		dis: 5,
		t: 0
	};

	// points代表曲线的点集合[[x,y],[x,y],...]
	// flag可以不传递，默认false，表示y坐标轴方向和数学上保存一致
	// 只有在设置为true的时候，才会使用浏览器的方式
	// config={color, width}
	var line = function (canvas, points, config, flag) {

		if (typeof scope.h === 'number') {
			var cardinal, i,
				painter = canvas[0].getContext("2d");

			painter.moveTo(points[0][0], flag ? points[0][1] : scope.h - points[0][1]);
			// cardinal插值法，目前只支持函数
			if (scope.interpolate === 'cardinal') {
				cardinal = clay.math.cardinal().setU(scope.t).setP(points);
				for (i = points[0][0] + scope.dis; i < points[points.length - 1][0]; i += scope.dis)
					painter.lineTo(i, flag ? cardinal(i) : scope.h - cardinal(i));
			}

			// 默认或错误设置都归结为line
			else {
				for (i = 1; i < points.length; i++)
					painter.lineTo(points[i][0], flag ? points[i][1] : scope.h - points[i][1]);
			}

			if (config) {
				if (config.color) painter.strokeStyle = config.color;
				if (config.width) painter.lineWidth = config.width;
			}

			painter.stroke();

			return canvas;
		} else {
			throw new Error('You need to set the height first!');
		}

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


    clay.__isLoad__ = false;

    clay.author = '心叶';
    clay.email = 'yelloxing@gmail.com';
    clay.version = '1.2.1';

    global.clay = global.$$ = clay;

    return clay;

});
