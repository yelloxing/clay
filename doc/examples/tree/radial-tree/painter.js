$$(function () {
    var tree = clay.layout.tree(),
        svg = $$('svg'),
        // 旋转对象
        rotate = clay.math.rotate().setL(350, 350),
        move = clay.math.move();;

    $$('<g class="circle"></g>').appendTo('svg');
    $$('<g class="line"></g>').appendTo('svg');
    $$('<g class="text"></g>').appendTo('svg');

    tree
        .bind('root', function (initTree) {
            return initTree;
        })
        .bind('child', function (parentTree) {
            return parentTree.children;
        })
        .bind('id', function (treedata) {
            return treedata.name;
        })
        .bind('drawer', function (node, num) {

            var deg = (node.top / num * 2 + 0.25) * Math.PI;
            var p = rotate.setP(350 + 70 * (node.left - 0.5), 350)(deg);

            // 画圆圈
            $$('<circle r="3" fill="' + (node.children.length > 0 ? "red" : "none") + '" stroke="red" stroke-width="2"/>')
                .appendTo('.circle')
                .attr('cx', p[0])
                .attr('cy', p[1]);

            // 写文字
            $$('<text style="font-size:10;">&nbsp;&nbsp;' + node.data.name + '</text>')
                .appendTo('.text')
                .attr('x', p[0])
                .attr('y', p[1])
                .attr('transform', 'rotate(' + deg / Math.PI * 180 + ',' + p[0] + ',' + p[1] + ')');

        }, function (pNode, node, num) {

            // 计算位置
            var deg = (node.top / num * 2 + 0.25) * Math.PI,
                p = rotate.setP(350 + 70 * (node.left - 0.5), 350)(deg),
                nodeP = [p[0], p[1]];
            deg = (pNode.top / num * 2 + 0.25) * Math.PI;
            p = rotate.setP(350 + 70 * (pNode.left - 0.5), 350)(deg);
            var pNodeP = [p[0], p[1]];

            // 辅助位置计算
            p = move.setD(pNodeP[0] - 350, pNodeP[1] - 350).setP(pNodeP[0], pNodeP[1])(50);
            var pHelpP = [p[0], p[1]];
            p = move.setD(nodeP[0] - 350, nodeP[1] - 350).setP(nodeP[0], nodeP[1])(-50);
            var nHelpP = [p[0], p[1]];

            // 画曲线
            $$('<path stroke-width="1.5" stroke="gray" fill="none"></path>')
                .appendTo('.line')
                .attr('d',
                'M' + pNodeP[0] + " " + pNodeP[1] + "C" +
                pHelpP[0] + "," + pHelpP[1] + " " +
                nHelpP[0] + "," + nHelpP[1] + " " +
                nodeP[0] + "," + nodeP[1] + " "
                );

        });

    tree(treeData);
});
