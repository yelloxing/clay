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
			_val = typeof val === 'function' ? val(this[flag]._data, flag,this.eq(flag)) : val;
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
