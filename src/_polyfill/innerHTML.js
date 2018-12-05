// 针对IE浏览器进行加强
if (_IE() >= 9 && _browser() == 'IE') {
    Object.defineProperty(SVGElement.prototype, 'innerHTML', {
        get: function () {

        },
        set: function (svgstring) {

        }
    });
}

