/*!
*
* quickES - Help quickly use ES.
* https://github.com/yelloxing/quickES
* 
* author 心叶
*
* version 1.0.0
* 
* build 2018/07/29
*
* Copyright yelloxing
* Released under the MIT license
* 
**************************************************************
* 
*【内容】
*
* 1.不同浏览器兼容的常用方法
*
* 2.常用的自定义方法
*
* 【说明】
*
* 兼容不同浏览器的接口，提供常用的辅助方法，只是针对常用的，目标是轻量级。
*
* 【打包文件】
* (0)./src/core.js
* (1)./src/config.js
* (2)./src/animation.js
* (3)./src/math/interpolate/cardinal.js
* (4)./src/dom/sizzle.js
* (5)./src/dom/data.js
* (6)./src/dom/modify.js
* (7)./src/dom/search.js
* (8)./src/scale/linear.js
* (9)./src/layout/pie.js
* (10)./src/svg/arc.js
* (11)./src/svg/line.js
*
*/
(function (global, factory, undefined) {

    'use strict';

    if (global && global.document) {

        // 如果是浏览器环境
        factory(global);

    } else if (typeof module === "object" && typeof module.exports === "object") {

        // 如果是node.js环境
        module.exports = factory(global, true);

    } else {
        throw new Error("Unexcepted Error!");
    }

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    'use strict';

    // 定义挂载对象
    var quickES = {
        "author": "心叶",
        "email": "yelloxing@gmail.com"
    };

    // 如果全局有重名，可以调用恢复
    var _quickES = window.quickES,
        _$$ = window.$$;
    quickES.noConflict = function (flag) {
        if (window.$$ === quickES) {
            window.$$ = _$$;
        }
        if (flag && window.quickES === quickES) {
            window.quickES = _quickES;
        }
        return quickES;
    };

    // 挂载到全局
    window.quickES = window.$$ = quickES;

    return quickES;

});
(function (window, undefined) {

    'use strict';

    // 标签命名空间
    window.quickES.namespace = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };

    // 绘图
    window.quickES.svg = {};

    // 工具
    window.quickES.math = {};

})(typeof window !== "undefined" ? window : this);
(function (window, undefined) {

    'use strict';

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
    window.quickES.animation = function (doback, duration, callback) {
        clock.timer(function (deep) {
            //其中deep为0-100，单位%，表示改变的程度
            doback(deep);
        }, duration, callback);
    };

    //把tick函数推入堆栈
    clock.timer = function (tick, duration, callback) {
        if (!tick) {
            throw new Error('tick is required!');
        }
        duration = duration || clock.speeds;
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
            deep = 100 * passTime;
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
            console.error(clock.timerId);
            clock.timerId = null;
        }
    };

})(typeof window !== "undefined" ? window : this);
(function (window, undefined) {

    'use strict';

    // 三次多项式的cardinal插值
    window.quickES.math.cardinal = function () {

        var scope = {
            "u": 0.5,
            "M": [
                [2, -2, 1, 1],
                [-3, 3, -2, -1],
                [0, 0, 1, 0],
                [1, 0, 0, 0]
            ]
        };

        // 根据x值返回y值
        var cardinal = function (x) {

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
        cardinal.setU = function (t) {

            if (typeof t === 'number') {
                scope.u = (1 - t) * 0.5;
            } else {
                throw new Error('Unsupported data!');
            }
            return cardinal;

        };

        // 设置点的位置
        cardinal.setPs = function (x0, y0, x1, y1, x2, y2, x3, y3) {

            if (x0 <= x1 && x1 < x2 && x2 <= x3) {
                // 记录原始尺寸
                scope.a = x1; scope.b = x2;
                var p3 = scope.u * (y2 - y0) / (x2 - x0),
                    p4 = scope.u * (y3 - y1) / (x3 - x1);
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
            return cardinal;

        };

        return cardinal;

    };

})(typeof window !== "undefined" ? window : this);
(function (window, $$, undefined) {

    'use strict';

    $$.node = function () {

        // 选择集合中的某个
        this.eq = function (num) {
            this.collection = this.size > num ? [this.collection[num]] : [];
            this.size = this.collection.length;
            return this;
        };

        this.setEnvironment = function (namespace) {
            this.namespace = namespace;
            return this;
        };

        // 只有在必要的时候才应该使用clone来建立一个新的对象
        this.clone = function () {
            var nodeObj = new $$.node(), flag;
            for (var key in this) {
                try {
                    if (this.hasOwnProperty(key)) {
                        nodeObj[key] = this[key];
                    }
                } catch (e) {
                    throw new Error("Illegal property value！");
                }
            }
            return nodeObj;
        };

    };

    $$.selectAll = function (selector, content) {

        var nodeObj = new $$.node(), flag, temp;

        selector = selector || '';
        nodeObj.content = content || document;
        nodeObj.collection = [];
        nodeObj.namespace = 'html';

        if (typeof selector === 'string') {

            selector = (selector + "").trim().replace(/[\n\f\r]/g, '');

            if (/^#[\d\w_]+$/.test(selector)) {
                temp = nodeObj.content.getElementById(selector.replace(/^#/, ''));
                if (temp) {
                    nodeObj.collection.push(temp);
                }
            } else if (/^[\d\w_]+$/.test(selector)) {
                temp = nodeObj.content.getElementsByTagName(selector);
                for (flag = 0; flag < temp.length; flag++) {
                    nodeObj.collection.push(temp[flag]);
                }
            } else {
                throw new Error('Unsupported selector!');
            }

        } else if (selector.constructor === Array) {

            for (flag = 0; flag < selector.length; flag++) {
                if (selector[flag].nodeType === 1 || selector[flag].nodeType === 9 || selector[flag].nodeType === 11) {
                    nodeObj.collection.push(selector[flag]);
                } else {
                    console.warn('The existence of elements of non - node types!');
                }
            }

        } else if (selector.nodeType === 1 || selector.nodeType === 9 || selector.nodeType === 11) {

            nodeObj.collection.push(selector);

        } else {

            throw new Error("Unexcepted Error!");

        }

        nodeObj.size = nodeObj.collection.length;

        nodeObj.selector = (this.selector ? this.selector : "") + "selectAll(\"" + selector + "\")";

        return nodeObj;

    };

})(window, window.quickES);
(function (window, $$, undefined) {

    'use strict';

    // 用于把数据绑定到一组结点或返回第一个结点数据，可以传递函数对数据处理
    $$.node.prototype.datum = function (data, calc) {

        var flag;
        if (!data) {
            return this.collection[0] ? this.collection[0]._data : undefined;
        } else {
            data = typeof calc === 'function' ? calc(data) : data;
            for (flag = 0; flag < this.size; flag++) {
                this.collection[flag]._data = data;
            }
            return this;
        }

    };

    // 用于把一组数据绑定到一组结点或返回一组结点数据，可以传递函数对数据处理
    $$.node.prototype.data = function (datas, calc) {

        var flag, temp;
        if (!datas) {
            temp = [];
            for (flag = 0; flag < this.size; flag++) {
                temp[flag] = this.collection[flag]._data;
            }
            return temp;
        } else if (datas.constructor === Array) {
            this._collection = {
                datas: datas,
                calc: calc
            };
            for (flag = 0; flag < this.size && flag < datas.length; flag++) {
                this.collection[flag]._data = typeof calc === 'function' ? calc(datas[flag], flag) : datas[flag];
            }
            return this;
        } else {
            throw new Error('Unsupported data!');
        }

    };

    // 过滤出来多于结点的数据部分
    $$.node.prototype.enter = function () {

        this._collection.enter = [];
        var flag;
        for (flag = this.size; flag < this._collection.datas.length; flag++) {
            this._collection.enter.push(typeof this._collection.calc === 'function' ? this._collection.calc(this._collection.datas[flag]) : this._collection.datas[flag]);
        }
        this.selector += ':enter()';
        return this;

    };

    // 过滤出来多于数据的结点部分
    $$.node.prototype.exit = function () {

        var flag, temp = this.collection;
        this.collection = [];
        for (flag = this._collection.datas.length; flag < this.size; flag++) {
            this.collection.push(temp[flag]);
        }
        this.size = this.collection.length;
        this.selector += ':exit()';
        return this;

    };

})(window, window.quickES);
(function (window, $$, undefined) {

    'use strict';

    var toNode = function (namespace, param) {

        if (param && (param.nodeType === 1 || param.nodeType === 11 || param.nodeType === 9)) {
            return param;
        } else if (param && typeof param === 'string') {
            if (/^[\w\d-]+$/.test(param)) {
                if (namespace === 'svg') {
                    return document.createElementNS($$.namespace.svg, param);
                } else {
                    return document.createElement(param);
                }
            } else {
                var frameDiv;
                if (namespace === 'svg') {
                    frameDiv = document.createElementNS($$.namespace.svg, 'svg');
                } else {
                    frameDiv = document.createElement("div");
                }
                frameDiv.innerHTML = param;
                return $$.selectAll(frameDiv).children().collection[0];
            }
        } else {
            throw new Error('Unexcepted Error!');
        }

    };

    // 在被选元素内部的结尾插入内容
    $$.node.prototype.append = function (param) {

        var flag, node;
        if (this._collection && this._collection.enter) {
            for (flag = 0; flag < this._collection.enter.length; flag++) {
                node = toNode(this.namespace, param);
                node._data = this._collection.enter[flag];
                $$.selectAll(this.content).append(node);
                this.collection.push(node);
            }
            delete this._collection;
            this.size = this.collection.length;
        } else {
            for (flag = 0; flag < this.size; flag++) {
                node = toNode(this.namespace, param);
                this.collection[flag].appendChild(node);
            }
        }
        return this;

    };

    // 在被选元素内部的开头插入内容
    $$.node.prototype.prepend = function (param) {

        var flag, node;
        if (this._collection && this._collection.enter) {
            for (flag = 0; flag < this._collection.enter.length; flag++) {
                node = toNode(this.namespace, param);
                node._data = this._collection.enter[flag];
                $$.selectAll(this.content).prepend(node);
                this.collection.push(node);
            }
            delete this._collection;
            this.size = this.collection.length;
        } else {
            for (flag = 0; flag < this.size; flag++) {
                node = toNode(this.namespace, param);
                this.collection[flag].insertBefore(node, this.clone().eq(flag).children().collection[0]);
            }
        }
        return this;

    };

    // 在被选元素之后插入内容
    $$.node.prototype.after = function (param) {

        var flag, node;
        if (this._collection && this._collection.enter) {
            for (flag = 0; flag < this._collection.enter.length; flag++) {
                node = toNode(this.namespace, param);
                node._data = this._collection.enter[flag];
                $$.selectAll(this.content).after(node);
                this.collection.push(node);
            }
            delete this._collection;
            this.size = this.collection.length;
        } else {
            for (flag = 0; flag < this.size; flag++) {
                node = toNode(this.namespace, param);
                this.clone().eq(flag).parent().collection[0].insertBefore(node, this.clone().eq(flag).next().collection[0]);
            }
        }
        return this;

    };

    // 在被选元素之前插入内容
    $$.node.prototype.before = function (param) {

        var flag, node;
        if (this._collection && this._collection.enter) {
            for (flag = 0; flag < this._collection.enter.length; flag++) {
                node = toNode(this.namespace, param);
                node._data = this._collection.enter[flag];
                $$.selectAll(this.content).before(node);
                this.collection.push(node);
            }
            delete this._collection;
            this.size = this.collection.length;
        } else {
            for (flag = 0; flag < this.size; flag++) {
                node = toNode(this.namespace, param);
                this.clone().eq(flag).parent().collection[0].insertBefore(node, this.collection[flag]);
            }
        }
        return this;

    };

    // 删除被选元素（及其子元素）
    $$.node.prototype.remove = function () {

        var flag;
        for (flag = 0; flag < this.size; flag++) {
            this.clone().eq(flag).parent().collection[0].removeChild(this.collection[flag]);
        }
        return this;

    };

    // 从被选元素中删除子元素
    $$.node.prototype.empty = function () {

        var flag;
        for (flag = 0; flag < this.size; flag++) {
            this.collection[flag].innerHTML = '';
        }
        return this;

    };

    // 用于设置/改变属性值
    $$.node.prototype.attr = function (name, val) {

        if (!name || typeof name !== 'string') {
            throw new Error('The name is invalid!');
        } else if (val === null || val === undefined) {
            return this.size > 0 ? this.collection[0].getAttribute(name) : undefined;
        } else {
            var flag;
            for (flag = 0; flag < this.size; flag++) {
                // 目前先不考虑针对特殊属性，比如svg标签的href和title等需要在指定的命名空间下，且前缀添加「xlink:」的情况
                this.collection[flag].setAttribute(name, typeof val === 'function' ? val(this.collection[flag]._data, flag) : val);
            }
            return this;
        }

    };

})(window, window.quickES);
(function (window, $$, undefined) {

    'use strict';

    $$.node.prototype.selectAll = function (selector) {
        var _this= $$.selectAll(selector, this.size > 0 ? this.collection[0] : this.content);
        _this.namespace=this.namespace;
        return _this;
    };

    // 返回全部被选元素的父亲
    $$.node.prototype.parent = function (filterback) {
        var flag, parent, temp = this.collection;
        this.collection = [];
        for (flag = 0; flag < this.size; flag++) {
            parent = temp[flag].parentNode;
            if (parent) {
                if (typeof filterback !== 'function' || filterback(parent, flag)) {
                    this.collection.push(parent);
                }
            }
        }
        this.size = this.collection.length;
        this.selector += ":parent()";
        return this;

    };

    // 返回第一个被选元素的全部孩子
    $$.node.prototype.children = function (filterback) {

        var flag, children, temp = this.collection;
        this.collection = [];
        children = temp[0] ? temp[0].childNodes : [];
        for (flag = 0; flag < children.length; flag++) {
            if (children[flag].nodeType === 1 || children[flag].nodeType === 11 || children[flag].nodeType === 9) {
                if (typeof filterback !== 'function' || filterback(children[flag])) {
                    this.collection.push(children[flag]);
                }
            }
        }
        this.size = this.collection.length;
        this.selector += ":children()";
        return this;

    };

    // 返回全部被选元素的后一个兄弟
    $$.node.prototype.next = function (filterback) {

        var flag, next, temp = this.collection;
        this.collection = [];
        for (flag = 0; flag < this.size; flag++) {
            next = temp[flag].nextSibling;
            while (next && next.nodeType !== 1 && next.nodeType !== 11 && next.nodeType !== 9 && next.nextSibling) {
                next = next.nextSibling;
            }
            if (next && (next.nodeType === 1 || next.nodeType === 11 || next.nodeType === 9)) {
                if (typeof filterback !== 'function' || filterback(next, flag)) {
                    this.collection.push(next);
                }
            }
        }
        this.size = this.collection.length;
        this.selector += ":next()";
        return this;

    };

    // 返回全部被选元素的前一个兄弟
    $$.node.prototype.prev = function (filterback) {

        var flag, prev, temp = this.collection;
        this.collection = [];
        for (flag = 0; flag < this.size; flag++) {
            prev = temp[flag].previousSibling;
            while (prev && prev.nodeType !== 1 && prev.nodeType !== 11 && prev.nodeType !== 9 && prev.previousSibling) {
                prev = prev.previousSibling;
            }
            if (prev && (prev.nodeType === 1 || prev.nodeType === 11 || prev.nodeType === 9)) {
                if (typeof filterback !== 'function' || filterback(prev, flag)) {
                    this.collection.push(prev);
                }
            }
        }
        this.size = this.collection.length;
        this.selector += ":prev()";
        return this;

    };

})(window, window.quickES);
(function (window, undefined) {

    'use strict';

    // 返回线性比例尺
    window.quickES.scaleLinear = function () {

        var scope = {};

        // 返回比例尺计算后的值
        function scaleLinear(domain) {
            if (typeof domain === 'number') {
                if (!scope.scaleCalc) {
                    throw new Error('You shoud first set the domain and range!');
                } else if (domain <= scope.domains[0]) {
                    return scope.ranges[0];
                } else if (domain >= scope.domains[1]) {
                    return scope.ranges[1];
                } else {
                    return (domain - scope.domains[0]) * scope.scaleCalc + scope.ranges[0];
                }
            } else {
                throw new Error('A number is required!');
            }
        }

        // 获取或设置定义域
        scaleLinear.domain = function (domains) {
            if (!domains || domains.constructor !== Array || typeof domains[0] !== 'number' || typeof domains[1] !== 'number') {
                throw new Error('Unsupported data!');
            }
            scope.domains = domains;
            if (scope.ranges) {
                scope.scaleCalc = (scope.ranges[1] - scope.ranges[0]) / (scope.domains[1] - scope.domains[0]);
            }
            return this;
        };

        // 定义或设置值域
        scaleLinear.range = function (ranges) {
            if (!ranges || ranges.constructor !== Array || typeof ranges[0] !== 'number' || typeof ranges[1] !== 'number') {
                throw new Error('Unsupported data!');
            }
            scope.ranges = ranges;
            if (scope.domains) {
                scope.scaleCalc = (scope.ranges[1] - scope.ranges[0]) / (scope.domains[1] - scope.domains[0]);
            }
            return this;
        };

        return scaleLinear;
    };

})(typeof window !== "undefined" ? window : this);
(function (window, undefined) {

    'use strict';

    // 把数据转换为方便画饼状图的数据
    window.quickES.pieLayout = function () {

        var scope = {
            rotate: 0
        };

        // 根据数据返回角度值
        var pieLayout = function (datas) {

            if (scope.valueback) {
                if (datas && datas.constructor === Array) {
                    var temp = [], flag, total = 0, angle;
                    for (flag = 0; flag < datas.length; flag++) {
                        temp.push({
                            data: datas[flag],
                            value: scope.valueback(datas[flag], flag)
                        });
                        total += temp[flag].value;
                    }
                    for (flag = 0; flag < datas.length; flag++) {
                        angle = (temp[flag].value / total) * Math.PI * 2;
                        temp[flag].startAngle = flag == 0 ? scope.rotate : temp[flag - 1].endAngle;
                        temp[flag].endAngle = temp[flag].startAngle + angle;
                        temp[flag].angle=angle;
                    }
                    return temp;
                } else {
                    throw new Error('Unsupported data!');
                }
            } else {
                throw new Error('You shoud first set the valueback!');
            }

        };

        // 设置初始化旋转角度
        pieLayout.rotate = function (angle) {

            if (typeof angle === 'number') {
                scope.rotate = angle % (Math.PI * 2);
            } else {
                throw new Error('Unsupported data!');
            }
            return pieLayout;
        };

        // 保存计算条目值的函数
        pieLayout.value = function (valueback) {

            if (typeof valueback === 'function') {
                scope.valueback = valueback;
            } else {
                throw new Error('Unsupported data!');
            }
            return pieLayout;

        };

        return pieLayout;

    };

})(typeof window !== "undefined" ? window : this);
(function (window, undefined) {

    'use strict';

    // 返回计算弧度路径函数
    window.quickES.svg.arc = function () {

        var scope = {
            innerRadius: 0,
            outerRadius: 10
        };

        // 输入经过饼状图布局处理后的一个数据，返回对应的path标签的d属性值
        var arc = function (pieData) {

            var sinStartAngle = Math.sin(pieData.startAngle),
                sinEndAngle = Math.sin(pieData.endAngle),
                cosStartAngle = Math.cos(pieData.startAngle),
                cosEndAngle = Math.cos(pieData.endAngle);
            var startInnerX = cosStartAngle * scope.innerRadius + scope.outerRadius,
                startInnerY = sinStartAngle * scope.innerRadius + scope.outerRadius,
                startOuterX = (1 + cosStartAngle) * scope.outerRadius,
                startOuterY = (1 + sinStartAngle) * scope.outerRadius,
                endInnerX = cosEndAngle * scope.innerRadius + scope.outerRadius,
                endInnerY = sinEndAngle * scope.innerRadius + scope.outerRadius,
                endOuterX = (1 + cosEndAngle) * scope.outerRadius,
                endOuterY = (1 + sinEndAngle) * scope.outerRadius;
            var angleDis = pieData.angle > Math.PI ? 1 : 0;
            return "M" + startInnerX + " " + startInnerY +
                "L" + startOuterX + " " + startOuterY +
                "A" + scope.outerRadius + " " + scope.outerRadius + " 0 " + angleDis + " 1 " + endOuterX + " " + endOuterY +
                "L" + endInnerX + " " + endInnerY +
                "A" + scope.innerRadius + " " + scope.innerRadius + " 0 " + angleDis + " 0 " + startInnerX + " " + startInnerY;
        };

        // 设置内半径
        arc.innerRadius = function (radius) {

            if (typeof radius === 'number' && radius < scope.outerRadius) {
                scope.innerRadius = radius;
            } else {
                throw new Error('Unsupported data!');
            }
            return arc;

        };

        // 设置外半径
        arc.outerRadius = function (radius) {

            if (typeof radius === 'number' && radius > scope.innerRadius) {
                scope.outerRadius = radius;
            } else {
                throw new Error('Unsupported data!');
            }
            return arc;

        };

        return arc;

    };

})(typeof window !== "undefined" ? window : this);
(function (window, undefined) {

    'use strict';

    // 返回计算线条路径函数
    window.quickES.svg.line = function () {

        var scope = {
            interpolate: 'line'
        };

        // 输入多个点的位置数据，返回对应的path标签的d属性值
        var line = function (points) {

            if (points && points.constructor === Array && points.length >= 2) {
                var d = "M" + scope.xback(points[0], 0) + " " + scope.yback(points[0], 0);
                if (scope.interpolate == 'line') {//折线图
                    d += "L";
                    var flag;
                    for (flag = 1; flag < points.length; flag++) {
                        d += scope.xback(points[flag], flag) + " " + scope.yback(points[flag], flag) + ",";
                    }
                    d = d.replace(/,$/, '');
                } else if (scope.interpolate == 'cardinal') {//三次cardinal插值法
                    d += "L";
                    var i, j, cardinal;
                    for (i = 0; i < points.length - 1; i++) {
                        // 基本点
                        var p1 = [scope.xback(points[i], i), scope.yback(points[i], i)];
                        var p2 = [scope.xback(points[i + 1], i + 1), scope.yback(points[i + 1], i + 1)];
                        // 辅助点
                        var p0 = (i == 0 ? p1 : [scope.xback(points[i - 1], i - 1), scope.yback(points[i - 1], i - 1)]);
                        var p3 = (i >= (points.length - 2) ? p2 : [scope.xback(points[i + 2], i + 2), scope.yback(points[i + 2], i + 2)]);
                        cardinal = window.quickES.math.cardinal().setPs(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
                        for (j = p1[0]; j < p2[0]; j += 5) {
                            d += (j + " " + cardinal(j) + ",");
                        }
                        d += (p2[0] + " " + cardinal(p2[0]) + ",");
                    }
                    d = d.replace(/,$/, '');
                } else {
                    throw new Error('Unsupported interpolate!');
                }
                return d;
            } else {
                throw new Error('Unsupported data!');
            }

        };

        // 设置曲线插值方法
        line.interpolate = function (type) {

            scope.interpolate = type;
            return line;

        };

        // 设置计算x坐标的函数
        line.x = function (xback) {

            if (typeof xback === 'function') {
                scope.xback = xback;
            } else {
                throw new Error('Unsupported data!');
            }
            return line;

        };

        // 设置计算y坐标的函数
        line.y = function (yback) {

            if (typeof yback === 'function') {
                scope.yback = yback;
            } else {
                throw new Error('Unsupported data!');
            }
            return line;

        };


        return line;

    };

})(typeof window !== "undefined" ? window : this);