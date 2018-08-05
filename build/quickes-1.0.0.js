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
* (3)./src/dom/sizzle.js
* (4)./src/dom/data.js
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
(function (window, $$, undefined) {

    'use strict';

    $$.node = function () { };

    $$.selectAll = function (selector, content) {

        var nodeObj = new $$.node(), flag, temp;

        nodeObj.selector = selector || '';
        nodeObj.content = content || document;
        nodeObj.collection = [];

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
        return this;

    };

})(window, window.quickES);