$$(function () {
    var tree = clay.layout.tree(),
        svg = $$('svg');


    $$('<g class="line"></g>').appendTo('svg');
    $$('<g class="text"></g>').appendTo('svg');
    $$('<g class="circle"></g>').appendTo('svg');

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

            // 画圆圈
            $$('<circle r="3" fill="' + (node.children.length > 0 ? "red" : "white") + '" stroke="red" stroke-width="2"/>')
                .appendTo('.circle')
                .attr('cx', (node.left - 0.5) * 980 / 5 - (-10))
                .attr('cy', node.top * 580 / (num - 1) - (-10));

            // 写文字
            $$('<text style="font-size:10px">' + node.data.name + '</text>')
                .appendTo('.text')
                .attr('x', (node.left - 0.5) * 980 / 5 - (-16))
                .attr('y', node.top * 580 / (num - 1) - (-14));

        }, function (pNode, node, num) {

            // 画曲线
            $$('<path stroke-width="1.5" stroke="gray" fill="none"></path>')
                .appendTo('.line')
                .attr('d',
                'M' + ((pNode.left - 0.5) * 980 / 5 - (-13)) + " " + (pNode.top * 580 / (num - 1) - (-10)) + "C" +
                ((pNode.left - 0.5) * 980 / 5 - (-100)) + "," + (pNode.top * 580 / (num - 1) - (-10)) + " " +
                ((node.left - 0.5) * 980 / 5 - 90) + "," + (node.top * 580 / (num - 1) - (-10)) + " " +
                ((node.left - 0.5) * 980 / 5 - (-7)) + "," + (node.top * 580 / (num - 1) - (-10)) + " "
                );
        });

    tree(treeData);
});
