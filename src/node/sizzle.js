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
			regexp = new RegExp("^(?:" + identifier + "){0,1}(?:(?:#|\\.)" + identifier + "|\\[" + whitespace + "{0,}" + identifier + "(?:" + whitespace + "{0,}=" + whitespace + "{0,}(\\\'|\\\"){0,1}" + identifier + "\\1{0,1}){0,1}" + whitespace + "{0,}\\]){0,}$");
		if (regexp.test(selector)) {
			var targetNodes = [];

			return targetNodes;
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
	else if (selector && (selector.constructor === Array || selector.constructor === HTMLCollection)) {
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
