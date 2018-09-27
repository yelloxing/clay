$$(function () {

    var svg = $$('svg');
    $$('<g class="line"></g>').appendTo(svg);
    $$('<g class="text"></g>').appendTo(svg);
    $$('<g class="circle"></g>').appendTo(svg);

    // 获取力布局
    var force = clay.layout.force(880, 480);
    // 设置处理方法
    force.bind('init', function (node) {
        $$('<circle id="' + node.id + '">').appendTo('.circle')
            .attr('r', '10')
            .attr('cx', node.x - (-10))
            .attr('cy', node.y - (-5))
            .attr('fill', node.color);
        $$('<text id="text-' + node.id + '" >' + node.info + '</text>').appendTo('.text')
            .attr('x', node.x)
            .attr('y', node.y)
            .attr('fill', node.color)
    }, function (link, sourceNode, targetNode) {
        $$('<line source=' + sourceNode.id + ' target=' + targetNode.id + ' x1=' + sourceNode.x + ' y1=' + sourceNode.y + ' x2=' + targetNode.x + ' y2=' + targetNode.y + '>').appendTo('.line')
            .attr('stroke-width', '2')
            .attr('stroke', 'black');
    })
        .bind('update', function (node) {
            $$('#' + node.id)
                .attr('cx', node.x)
                .attr('cy', node.y);
            $$('#text-' + node.id)
                .attr('x', node.x - (-10))
                .attr('y', node.y - (-5));
        }, function (link, sourceNode, targetNode) {
            $$('[source=' + link.link[0] + '][target=' + link.link[1] + ']')
                .attr('x1', sourceNode.x)
                .attr('y1', sourceNode.y)
                .attr('x2', targetNode.x)
                .attr('y2', targetNode.y);
        });

    // 绑定初始化数据
    force(window.life[0], window.life[1]);

    // 绑定事件
    var target, p, svgP;
    $$('circle')
        .bind('mousedown', function () {
            target = clay(this);
        });
    $$('body')
        .bind('mouseup', function () {
            target = null;
        })
        .bind('mousemove', function (event) {
            event = event || window.event;
            if (target) {
                p = getMousePos(event);
                svgP = calcViewportLocation($$('svg')[0]);
                force
                    .update(target.attr('id'), 'x', p.x - 10 - svgP[0])
                    .update(target.attr('id'), 'y', p.y - 10 - svgP[1]);
            }
        });

});
