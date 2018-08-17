/*
* 
* 【CSS选择器】
*
* 提供类似CSS选择器的方法来查找结点的目的是方便操作，具体可以使用的包括下面三类：
* 第一类：class选择器、ID选择器、属性选择器和元素选择器。
* 第二类：第一类选择器的任意组合。
* 第三类：在前面二类中可以增加这四种结点关系选择器：'>',"空","~","+"。
*
*/
(function (window, $$, undefined) {

    'use strict';

    $$.sizzle.find = function (selector, context) {
        selector = selector.trim();
        var resultData = [],
            flag, elems, innerFlag;

        //第0部分：选择全部
        if (selector == '*') {
            elems = context.getElementsByTagName('*');
            for (flag = 0; flag < elems.length; flag++) {
                resultData.push(elems[flag]);
            }
        }
        //第一部分：最单纯的选择器
        else if ($$.sizzle.tool.isSingle(selector)) {
            if ($$.sizzle.tool.isID(selector)) {
                //id选择器 上下文只能是HTML文档，考虑id的唯一性，直接全局查找，因此id选择器不支持上下文查找，各种类型都一样
                //浏览器支持情况：IE 6+, Firefox 3+, Safari 3+, Chrome 4+, and Opera 10+；
                resultData.push(document.getElementById(selector.replace(/^#/, "")));
            } else if ($$.sizzle.tool.isClass(selector)) {
                //class选择器 上下文可以是HTML文档，XML文档及元素节点
                if (context.getElementsByClassName) {
                    //浏览器支持情况：IE 9+, Firefox 3+, Safari4+, Chrome 4+, and Opera 10+；
                    elems = context.getElementsByClassName(selector.replace(/^./, ""));
                    for (flag = 0; flag < elems.length; flag++) {
                        resultData.push(elems[flag]);
                    }
                } else {
                    elems = context.getElementsByTagName('*');
                    for (flag = 0; flag < elems.length; flag++) {
                        if ((" " + $$.sizzle(elems[flag]).attr('class') + " ").search(" " + selector.replace(/^./, "") + " ") > -1) {
                            resultData.push(elems[flag]);
                        }
                    }
                }
            } else if ($$.sizzle.tool.isElemment(selector)) {
                //元素选择器 上下文可以是HTML文档，XML文档及元素节点
                elems = context.getElementsByTagName(selector);
                for (flag = 0; flag < elems.length; flag++) {
                    resultData.push(elems[flag]);
                }
            } else if ($$.sizzle.tool.isAttr(selector)) {
                if (!context.querySelectorAll) {
                    // 浏览器支持情况：IE 8+, Firefox 3.5+, Safari 3+, Chrome 4+, and Opera 10+；
                    // 上下文可以是HTML文档，XML文档及元素节点
                    elems = context.querySelectorAll(selector);
                    for (flag = 0; flag < elems.length; flag++) {
                        resultData.push(elems[flag]);
                    }
                } else {
                    elems = context.getElementsByTagName('*');

                    var selector_exec;

                    if (/^\[([^=]+)]$/.test(selector)) {
                        selector_exec = /^\[([^=]+)\]$/.exec(selector);
                        for (flag = 0; flag < elems.length; flag++) {
                            if (!elems[flag].getAttribute || elems[flag].getAttribute(selector_exec[1]) != null) {
                                resultData.push(elems[flag]);
                            }
                        }
                    } else {
                        selector_exec = /^\[([^=]+)=(["'])([^=]+)\2\]$/.exec(selector);
                        for (flag = 0; flag < elems.length; flag++) {
                            if (selector_exec[3] == $$.sizzle(elems[flag]).attr(selector_exec[1])) {
                                resultData.push(elems[flag]);
                            }
                        }
                    }

                }
            } else {
                throw new Error('invalid selector1:' + selector);
            }
        }
        //第二部分：复合的单选择器
        else if ($$.sizzle.tool.notLayer(selector)) {
            if ($$.sizzle.tool.isValidComplex(selector)) {
                var complexSelectorObj = $$.sizzle.tool.toComplexSelectorObject(selector);
                var needCheckResultArray = [];
                if (!!complexSelectorObj._id_) { //如果存在id选择器
                    needCheckResultArray = [document.getElementById(complexSelectorObj._id_)];
                    return $$.sizzle.tool.checkedElems(needCheckResultArray, complexSelectorObj);
                } else if (!!complexSelectorObj._elem_) { //如果存在elem
                    needCheckResultArray = context.getElementsByTagName(complexSelectorObj._elem_);
                    return $$.sizzle.tool.checkedElems(needCheckResultArray, complexSelectorObj);
                } else if (!!complexSelectorObj._class_ && complexSelectorObj._class_.length > 0) {
                    if (context.getElementsByClassName) { //如果是class
                        //浏览器支持情况：IE 9+, Firefox 3+, Safari4+, Chrome 4+, and Opera 10+；
                        needCheckResultArray = context.getElementsByClassName(complexSelectorObj._class_[0]);
                        return $$.sizzle.tool.checkedElems(needCheckResultArray, complexSelectorObj);
                    }
                } else { //如果没办法提前过滤，就检测全部
                    needCheckResultArray = context.getElementsByTagName('*');
                    return $$.sizzle.tool.checkedElems(needCheckResultArray, complexSelectorObj);
                }
            } else {
                throw new Error('invalid selector2:' + selector);
            }
        }
        //第三部分：关系选择器 【'>',"空","~","+"】【儿子选择器，子孙选择器，后续兄弟选择器，后续第一个兄弟选择器】
        else {
            //切割第三部分选择器为之前部分选择器，用关系符号分割
            var layerSelectorArray = selector.replace(/ *([>+~]) */g, '@$1@').replace(/ +/g, '@ @').split('@');

            //层次上检测
            for (flag = 0; flag < layerSelectorArray.length; flag++) {
                if (layerSelectorArray[flag] == "") {
                    throw new Error('invalid selector3:' + selector);
                }
            }

            //关系上没有问题以后，开始查找，内部错误会有对应的处理函数暴露，和这里没有关系
            var nodes = $$.sizzle.find(layerSelectorArray[layerSelectorArray.length - 1], context);
            var helpNodes = [];
            for (flag = 0; flag < nodes.length; flag++) {
                helpNodes.push({
                    "0": nodes[flag],
                    "length": 1
                });
            }

            //过滤
            var filterSelector, filterLayer, _inFlag_, num, tempClay, tempHelpNodes, tempFlag;
            for (flag = layerSelectorArray.length - 1; flag > 1; flag = flag - 2) {
                filterSelector = layerSelectorArray[flag - 2];
                filterLayer = layerSelectorArray[flag - 1];
                if ('>' == filterLayer) { //如果是>
                    for (innerFlag = 0; innerFlag < nodes.length; innerFlag++) { //检测每个可能入选的节点
                        num = 0;
                        if (!!helpNodes[innerFlag] && helpNodes[innerFlag].length > 0) {
                            for (_inFlag_ = 0; _inFlag_ < helpNodes[innerFlag].length; _inFlag_++) { //检测判断是否合法路径，有一个合法即可
                                tempClay = $$.sizzle(helpNodes[innerFlag][_inFlag_]).parent().filter(filterSelector);
                                if (tempClay.count > 0) {
                                    helpNodes[innerFlag][num] = tempClay;
                                    num++;
                                }
                            }
                            helpNodes[innerFlag].length = num;
                        }
                    }
                } else if ('~' == filterLayer) { //如果是~
                    for (innerFlag = 0; innerFlag < nodes.length; innerFlag++) { //检测每个可能入选的节点
                        num = 0;
                        if (!!helpNodes[innerFlag] && helpNodes[innerFlag].length > 0) {
                            tempHelpNodes = [];
                            for (_inFlag_ = 0; _inFlag_ < helpNodes[innerFlag].length; _inFlag_++) { //检测判断是否合法路径，有一个合法即可
                                tempClay = $$.sizzle(helpNodes[innerFlag][_inFlag_]).prevAll(filterSelector);
                                for (tempFlag = 0; tempFlag < tempClay.count; tempFlag++) {
                                    tempHelpNodes[num] = tempClay.collection[tempFlag];
                                    num++;
                                }
                            }
                            helpNodes[innerFlag].length = num;
                            for (tempFlag = 0; tempFlag < tempHelpNodes.length; tempFlag++) {
                                helpNodes[innerFlag][tempFlag] = tempHelpNodes[tempFlag];
                            }
                        }
                    }
                } else if ('+' == filterLayer) { //如果是+
                    for (innerFlag = 0; innerFlag < nodes.length; innerFlag++) { //检测每个可能入选的节点
                        num = 0;
                        if (!!helpNodes[innerFlag] && helpNodes[innerFlag].length > 0) {
                            for (_inFlag_ = 0; _inFlag_ < helpNodes[innerFlag].length; _inFlag_++) { //检测判断是否合法路径，有一个合法即可
                                tempClay = $$.sizzle(helpNodes[innerFlag][_inFlag_]).prev().filter(filterSelector);
                                if (tempClay.count > 0) {
                                    helpNodes[innerFlag][num] = tempClay;
                                    num++;
                                }
                            }
                            helpNodes[innerFlag].length = num;
                        }
                    }
                } else { //上面都不是，就只可能是空格了
                    for (innerFlag = 0; innerFlag < nodes.length; innerFlag++) {
                        num = 0;
                        if (!!helpNodes[innerFlag] && helpNodes[innerFlag].length > 0) {
                            tempHelpNodes = [];
                            for (_inFlag_ = 0; _inFlag_ < helpNodes[innerFlag].length; _inFlag_++) { //检测判断是否合法路径，有一个合法即可
                                tempClay = $$.sizzle(helpNodes[innerFlag][_inFlag_]).parents(filterSelector);
                                for (tempFlag = 0; tempFlag < tempClay.count; tempFlag++) {
                                    tempHelpNodes[num] = tempClay.collection[tempFlag];
                                    num++;
                                }
                            }
                            helpNodes[innerFlag].length = num;
                            for (tempFlag = 0; tempFlag < tempHelpNodes.length; tempFlag++) {
                                helpNodes[innerFlag][tempFlag] = tempHelpNodes[tempFlag];
                            }
                        }
                    }
                }
            }
            //最后被留下的就是我们需要的
            for (flag = 0; flag < nodes.length; flag++) {
                if (!!helpNodes[flag] && helpNodes[flag].length > 0) {
                    resultData.push(nodes[flag]);
                }
            }

        }
        return resultData;
    };

})(window, window.clay);