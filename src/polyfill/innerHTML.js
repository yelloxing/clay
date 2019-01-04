// 针对部分浏览器svg不支持innerHTML方法
var _innerSVG = function (target, svgstring) {
    if ('innerHTML' in SVGElement.prototype === false || 'innerHTML' in SVGSVGElement.prototype === false) {
        var frame = document.createElement("div"), i;
        frame.innerHTML = svgstring;
        var toSvgNode = function (htmlNode) {
            var svgNode = document.createElementNS(_namespace.svg, (htmlNode.tagName + "").toLowerCase());
            var attrs = htmlNode.attributes, i, svgNodeClay = clay(svgNode);
            for (i = 0; attrs && i < attrs.length; i++) {
                svgNodeClay.attr(attrs[i].nodeName, htmlNode.getAttribute(attrs[i].nodeName));
            }
            return svgNode;
        };
        var rslNode = toSvgNode(frame.firstChild);
        (function toSVG(pnode, svgPnode) {
            var node = pnode.firstChild;
            if (node && node.nodeType == 3) {
                svgPnode.textContent = pnode.innerText;
                return;
            }
            while (node) {
                var svgNode = toSvgNode(node);
                svgPnode.appendChild(svgNode);
                if (node.firstChild) toSVG(node, svgNode);
                node = node.nextSibling;
            }
        })(frame.firstChild, rslNode);
        target.appendChild(rslNode);
    } else {
        target.innerHTML = svgstring;
    }
};
