// 针对IE浏览器进行加强
if (_IE() >= 9) {
    var _innerHTML = {
        get: function () {
            var frame = document.createElement("div"),
                childNode = this.firstChild;
            while (childNode) {
                frame.append(childNode);
                childNode = childNode.nextSibling;
            }
            return frame.html();
        },
        set: function (svgstring) {
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
            this.appendChild(rslNode);
        }
    };
    Object.defineProperty(SVGElement.prototype, 'innerHTML', _innerHTML);
    Object.defineProperty(SVGSVGElement.prototype, 'innerHTML', _innerHTML);
}
