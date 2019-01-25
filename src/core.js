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
        var nodes = _sizzle(selector, context), flag;
        for (flag = 0; flag < nodes.length; flag++) {
            this[flag] = nodes[flag];
        }
        this.selector = selector;
        this.length = nodes.length;
        this.type="clay-object";
        return this;

    };

    clay.prototype.init.prototype = clay.prototype;

    // @CODE build.js inserts compiled clay.js here
    return clay;

});
