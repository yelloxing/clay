clay.svg.arcRuler = function () {

    return _ruler(
        function (
            value,
            leftWidth, rightWidth, size,
            color,
            pageini
        ) {

            return [
                clay.svg.arc()
                    .setCenter(pageini.cx, pageini.cy)
                    (value - size / 2, size, pageini.radius - rightWidth, pageini.radius + leftWidth), color];

        });

};
