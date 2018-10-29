clay.svg.lineRuler = function () {

    return _ruler(
        function (
            value,
            leftWidth, rightWidth, size,
            color,
            pageini
        ) {

            return [
                pageini.direction === 'vertical' ?
                    'M' + (pageini.seat - leftWidth) + "," + (value - size / 2) +
                    'L' + (pageini.seat + leftWidth) + "," + (value - size / 2) +
                    'L' + (pageini.seat + rightWidth) + "," + (value + size / 2) +
                    'L' + (pageini.seat - rightWidth) + "," + (value + size / 2) +
                    'L' + (pageini.seat - leftWidth) + "," + (value - size / 2) :
                    'M' + (value - size / 2) + "," + (pageini.seat - rightWidth) +
                    'L' + (value + size / 2) + "," + (pageini.seat - rightWidth) +
                    'L' + (value + size / 2) + "," + (pageini.seat + leftWidth) +
                    'L' + (value - size / 2) + "," + (pageini.seat + leftWidth) +
                    'L' + (value - size / 2) + "," + (pageini.seat - rightWidth), color];

        });

};
