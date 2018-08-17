(function (window, $$, undefined) {

    'use strict';

    $$.sizzle.tool = {
        "notLayer": function (selector) {
            // 判断是否是关系选择器，只可以确定不是关系选择器
            if (/[> ~+]/.test(selector)) {
                return false;
            } else {
                return true;
            }
        },
        "notComplex": function (selector) {
            // 判断是否是复合的单选择器，只可以确定不是复合的单选择器
            if (!$$.sizzle.tool.notLayer(selector)) {
                return true; //如果可能是关系选择器又认为它不是复合的单选择器
            } else {
                if (!/[#.[]/.test(selector)) { //如果只是元素选择器，一定不是复合的单选择器
                    return true;
                } else if (!/^[#.[]/.test(selector)) { //如果不只是元素选择器，而且元素选择器开头，就一定不是复合的单选择器
                    return false;
                }
                //去掉开头的非元素选择器标志
                selector = selector.replace(/^[#.[]/, '');
                if (/[#.[]/.test(selector)) { //如果不只是元素选择器，一定是复合的单选择器
                    return false;
                } else {
                    return true;
                }
            }
        },
        "isSingle": function (selector) {
            //判断是不是最单纯的选择器
            if ($$.sizzle.tool.notLayer(selector) && $$.sizzle.tool.notComplex(selector)) {
                return true;
            } else {
                return false;
            }
        },
        "isID": function (selector) {
            // #id 前置条件：已经知道是最单纯的选择器
            if (/^#/.test(selector)) {
                return true;
            } else {
                return false;
            }
        },
        "isClass": function (selector) {
            // .class 前置条件：已经知道是最单纯的选择器
            if (/^\./.test(selector)) {
                return true;
            } else {
                return false;
            }
        },
        "isElemment": function (selector) {
            // element 前置条件：已经知道是最单纯的选择器
            if (!/^[#.[]/.test(selector)) {
                return true;
            } else {
                return false;
            }
        },
        "isAttr": function (selector) {
            //[attr="val"] 前置条件：已经知道是最单纯的选择器
            if (/^\[([^=]+)(=(["'])([^=]+)\2){0,1}\]$/.test(selector)) {
                return true;
            } else {
                return false;
            }
        },
        "isValidComplex": function (selector) {
            //判断是不是合法的第二类选择器 前置条件：已经知道只可能是第二类选择器或者非法
            selector = selector.replace(/^[^#.[]+/, ''); //去掉开头的标签选择器
            selector = selector.replace(/\[([^=]+)(=(["'])([^=]+)\2){0,1}\]/g, ''); //去掉合法的属性选择器
            selector = selector.replace(/#[^#.[]+/g, ''); //去掉id选择器
            selector = selector.replace(/\.[^#.[]+/g, ''); //去掉class选择器
            if (selector != "") { //如果此时还存在，一定是非法的
                return false;
            } else {
                return true;
            }
        },
        "toComplexSelectorObject": function (selector) {
            //前置条件：已经知道确定是第二类选择器
            var selectorObj = {},
                flag;
            var currentSelector = selector.match(/^[^#.[]+/); //标签
            if (!!currentSelector && currentSelector.length > 0) {
                selectorObj._elem_ = currentSelector[0];
            }
            currentSelector = selector.match(/\[([^=]+)(=(["'])([^=]+)\2){0,1}\]/g); //属性选择器
            if (!!currentSelector && currentSelector.length > 0) {
                selectorObj._attr_ = [];
                for (flag = 0; flag < currentSelector.length; flag++) {
                    selectorObj._attr_.push(currentSelector[flag]);
                }
            }
            currentSelector = selector.match(/#[^#.[]+/g); //id选择器
            if (!!currentSelector && currentSelector.length > 0) {
                selectorObj._id_ = (currentSelector[0]).replace(/^#/, "");
            }
            currentSelector = selector.match(/\.[^#.[]+/g); //class选择器
            if (!!currentSelector && currentSelector.length > 0) {
                selectorObj._class_ = [];
                for (flag = 0; flag < currentSelector.length; flag++) {
                    selectorObj._class_.push(currentSelector[flag].replace(/^\./, ""));
                }
            }
            return selectorObj;
        },
        "checkedElems": function (needCheckResultArray, selectorObj) {
            //id选择器不用匹配了，如果有一定会用，不用就是错误
            var flag, resultData = [],
                innerFlag, tempClass, selector_exec,
                isAccept;
            for (flag = 0; flag < needCheckResultArray.length; flag++) {
                isAccept = true;
                if (!!selectorObj._elem_ && isAccept) { //1.检测元素类型
                    if (needCheckResultArray[flag].tagName != (selectorObj._elem_ + "").toUpperCase() && needCheckResultArray[flag].tagName != (selectorObj._elem_ + "").toLowerCase()) {
                        isAccept = false;
                    }
                }
                if (!!selectorObj._class_ && selectorObj._class_.length > 0 && isAccept) { //2.检测class
                    if (!needCheckResultArray[flag].getAttribute) {
                        isAccept = false;
                    } else {
                        tempClass = needCheckResultArray[flag].getAttribute('class') || '';
                        tempClass = " " + tempClass + " ";
                    }
                    for (innerFlag = 0; innerFlag < selectorObj._class_.length && isAccept; innerFlag++) {
                        if (tempClass.search(" " + selectorObj._class_[innerFlag] + " ") < 0) {
                            isAccept = false;
                        }
                    }
                }
                if (!!selectorObj._attr_ && selectorObj._attr_.length > 0 && isAccept) { //3.检测attr
                    for (innerFlag = 0; innerFlag < selectorObj._attr_.length && isAccept; innerFlag++) {

                        if (/^\[([^=]+)]$/.test(selectorObj._attr_[innerFlag])) {
                            selector_exec = /^\[([^=]+)\]$/.exec(selectorObj._attr_[innerFlag]);
                            if (!needCheckResultArray[flag].getAttribute || needCheckResultArray[flag].getAttribute(selector_exec[1]) == null) {
                                isAccept = false;
                            }
                        } else {
                            selector_exec = /^\[([^=]+)=(["'])([^=]+)\2\]$/.exec(selectorObj._attr_[innerFlag]);
                            if (!needCheckResultArray[flag].getAttribute || needCheckResultArray[flag].getAttribute(selector_exec[1]) != selector_exec[3]) {
                                isAccept = false;
                            }
                        }
                    }
                }
                if (isAccept) { //通过全部检测就接受
                    resultData.push(needCheckResultArray[flag]);
                }
            }
            return resultData;
        },
        "filter": function (tempResult, selector) {
            var selector_exec,
                helpResult, flag;
            if (!!selector && selector != "*") {
                selector = selector.trim();
                if ($$.sizzle.tool.isSingle(selector)) {
                    if ($$.sizzle.tool.isID(selector)) {
                        helpResult = tempResult;
                        tempResult = [];
                        for (flag = 0; flag < helpResult.length; flag++) {
                            if (helpResult[flag].getAttribute && ("#" + helpResult[flag].getAttribute('id')) == selector) {
                                tempResult.push(helpResult[flag]);
                            }
                        }
                    } else if ($$.sizzle.tool.isClass(selector)) {
                        helpResult = tempResult;
                        tempResult = [];
                        for (flag = 0; flag < helpResult.length; flag++) {
                            if (helpResult[flag].getAttribute && (" " + helpResult[flag].getAttribute('class') + " ").search(" " + (selector.replace(/^\./, '')) + " ") >= 0) {
                                tempResult.push(helpResult[flag]);
                            }
                        }
                    } else if ($$.sizzle.tool.isElemment(selector)) {
                        helpResult = tempResult;
                        tempResult = [];
                        for (flag = 0; flag < helpResult.length; flag++) {
                            if (helpResult[flag].tagName == ((selector + "").toUpperCase()) || helpResult[flag].tagName == ((selector + "").toLowerCase())) {
                                tempResult.push(helpResult[flag]);
                            }
                        }
                    } else if ($$.sizzle.tool.isAttr(selector)) {
                        helpResult = tempResult;
                        tempResult = [];
                        for (flag = 0; flag < helpResult.length; flag++) {
                            if (/^\[([^=]+)]$/.test(selector)) {
                                selector_exec = /^\[([^=]+)\]$/.exec(selector);
                                if (!helpResult[flag].getAttribute || helpResult[flag].getAttribute(selector_exec[1]) != null) {
                                    tempResult.push(helpResult[flag]);
                                }
                            } else {
                                selector_exec = /^\[([^=]+)=(["'])([^=]+)\2\]$/.exec(selector);
                                if (helpResult[flag].getAttribute && helpResult[flag].getAttribute(selector_exec[1]) == selector_exec[3]) {
                                    tempResult.push(helpResult[flag]);
                                }
                            }
                        }
                    } else {
                        throw new Error('invalid selector1:' + selector);
                    }
                } else if ($$.sizzle.tool.notLayer(selector)) {
                    if ($$.sizzle.tool.isValidComplex(selector)) {
                        tempResult = $$.sizzle.tool.checkedElems(tempResult, $$.sizzle.tool.toComplexSelectorObject(selector));
                    } else {
                        throw new Error('invalid selector2:' + selector);
                    }
                } else {
                    throw new Error('undesigned selector:' + selector);
                }
            }
            return tempResult;
        }
    };

})(window, window.clay);