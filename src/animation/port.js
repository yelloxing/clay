(function (window, $$, undefined) {

    'use strict';

    // 标记当前查找到的结点有过渡动画（包括后续添加的结点，记录保存在对象而不是结点上）
    $$.node.prototype.transition = function () {

        this._animation.transition = true;
        return this;

    };

    // 指定整个转变持续多长时间
    $$.node.prototype.duration = function (duration) {

        if (typeof duration === 'number') {
            this._animation.duration = duration;
        } else {
            throw new Error('Unsupported data!');
        }
        return this;

    };

    // 指定转变的方式
    $$.node.prototype.ease = function (ease) {

        this._animation.ease = ease;
        return this;

    };

    // 指定转变开始延迟时间
    $$.node.prototype.delay = function (delay) {

        if (typeof delay === 'number') {
            this._animation.delay = delay;
        } else {
            throw new Error('Unsupported data!');
        }
        return this;

    };

    // 标记当前查找到的结点无过渡动画
    $$.node.prototype.noTransition = function () {

        this._animation.transition = false;
        return this;

    };

    // 设置特定属性的过渡计算方法
    $$.node.prototype.animation = function (attr, doback) {

        if (typeof doback === 'function' && typeof attr === 'string') {
            this._animation.attrback[attr] = doback;
        } else {
            throw new Error('Unsupported data!');
        }
        return this;

    };

})(window, window.quickES);