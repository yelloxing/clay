$$(function () {
    var tree = clay.layout.tree(),
        svg = $$('svg');

    $$('<g class="line"></g>').appendTo('svg');
    $$('<g class="text"></g>').appendTo('svg');
    $$('<g class="circle"></g>').appendTo('svg');

    function getP(left, top, num) {
        return [
            1080 * top / num + 10,
            650 - 580 / 5 * left
        ];
    }

    var animation = [];

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

            var nodeClay = $$('#node-' + node.id),
                textClay = $$('#text-' + node.id);

            // 如果没有添加，初始化添加
            if (nodeClay.length <= 0) {
                // 画圆圈
                $$('<circle id="node-' + node.id + '"  r="3" fill="' + (node.children.length > 0 ? "red" : "white") + '" stroke="red" stroke-width="2"/>')
                    .appendTo('.circle')
                    .attr('cx', 550)
                    .attr('cy', 300);
                nodeClay = $$('#node-' + node.id);
            }

            if (textClay.length <= 0) {
                // 写文字
                $$('<text id="text-' + node.id + '" style="font-size:8px">' + node.data.name + '</text>')
                    .appendTo('.text')
                    .attr('x', 550)
                    .attr('y', 300);
                textClay = $$('#text-' + node.id);
            }

            // 插入动画效果
            var p = getP(node.left, node.top, num),
                preP = [nodeClay.attr('cx'), nodeClay.attr('cy')],
                dis = [p[0] - preP[0], p[1] - preP[1]];
            animation.push([function (deep) {
                var x = preP[0] - (-dis[0] * deep);
                var y = preP[1] - (-dis[1] * deep);
                nodeClay.attr('cx', x).attr('cy', y);
                textClay.attr('x', x - (-5)).attr('y', (y - (-2)))
                    .attr('transform', 'rotate(270,' + x + ',' + y + ')');
            }, function () {
                nodeClay.attr('cx', p[0]).attr('cy', p[1]);
                textClay.attr('x', p[0] - (-5)).attr('y', (p[1] - (-2)))
                    .attr('transform', 'rotate(270,' + p[0] + ',' + p[1] + ')');
            }]);

            if (!node.pid) {
                // 启动动画
                $$.animation(function (deep) {
                    var flag = 0;
                    for (; flag < animation.length; flag++) {
                        animation[flag][0](deep);
                    }
                }, 1000, function () {
                    var flag = 0;
                    for (; flag < animation.length; flag++) {
                        animation[flag][1]();
                    }
                });
            }

        }, function (pNode, node, num) {

            var linkClay = $$('#pid-' + pNode.id + "-id-" + node.id);
            if (linkClay.length <= 0) {
                // 画曲线
                $$('<path id="pid-' + pNode.id + '-id-' + node.id + '" stroke-width="1.5" stroke="gray" fill="none"></path>')
                    .appendTo('.line')
                    .attr('d',
                    'M' + 550 + " " + 300 + "C" +
                    550 + "," + 300 + " " +
                    550 + "," + 300 + " " +
                    550 + "," + 300 + " "
                    )
                    .attr('c-x', 550)
                    .attr('c-y', 300)
                    .attr('p-x', 550)
                    .attr('p-y', 300);
                linkClay = $$('#pid-' + pNode.id + "-id-" + node.id);
            }

            var pP = getP(pNode.left, pNode.top, num),
                pPreP = [linkClay.attr('p-x'), linkClay.attr('p-y')],
                pDis = [pP[0] - pPreP[0], pP[1] - pPreP[1]],

                cP = getP(node.left, node.top, num),
                cPreP = [linkClay.attr('c-x'), linkClay.attr('c-y')],
                cDis = [cP[0] - cPreP[0], cP[1] - cPreP[1]];


            animation.push([function (deep) {

                var x1 = pPreP[0] - (-pDis[0] * deep);
                var y1 = pPreP[1] - (-pDis[1] * deep);
                var x2 = cPreP[0] - (-cDis[0] * deep);
                var y2 = cPreP[1] - (-cDis[1] * deep);
                linkClay.attr('d',
                    'M' + x1 + " " + y1 + "C" +
                    x1 + "," + (y1 - 50) + " " +
                    x2 + "," + (y2 - (-50)) + " " +
                    x2 + "," + y2 + " "
                );
            }, function () {
                linkClay.attr('d',
                    'M' + pP[0] + " " + pP[1] + "C" +
                    pP[0] + "," + (pP[1] - 50) + " " +
                    cP[0] + "," + (cP[1] - (-50)) + " " +
                    cP[0] + "," + cP[1] + " "
                )
                    .attr('c-x', cP[0])
                    .attr('c-y', cP[1])
                    .attr('p-x', pP[0])
                    .attr('p-y', pP[1]);
            }]);

        });

    tree(treeData);
});
