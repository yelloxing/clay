(function (window, clay, undefined) {

    'use strict';

    clay.prototype.extend({
        // 层次包含比例图，悬浮svg中心实时显示选择比例，选中地区会变色突出显示
        "treeCircle": function (config) {
            var cx = +this.attr('width').replace('px', '') / 2,
                cy = +this.attr('height').replace('px', '') / 2;
            // 建立工具类
            var rotate = clay.math.rotate().setL(cx, cy),
                move = clay.math.move();

            // 建立树布局
            var tree = clay.layout.tree();
            var arcWidth = config.arcWidth; //圆环宽度
            var R = config.R; //中心圆半径
            var colorList;
            var site = 0; //颜色位置
            function drawer(nodes, rootid) {
                var flag;
                for (flag = 0; flag < nodes[rootid].children.length; flag++ , site++) {
                    drawerArc(
                        nodes[nodes[rootid].children[flag]].beginX,
                        nodes[nodes[rootid].children[flag]].beginY,
                        nodes[nodes[rootid].children[flag]].endX,
                        nodes[nodes[rootid].children[flag]].endY,
                        nodes[nodes[rootid].children[flag]].percent,
                        nodes[nodes[rootid].children[flag]].pid || "null",
                        nodes[nodes[rootid].children[flag]].id,
                        R,
                        nodes[nodes[rootid].children[flag]].left - 0.5,
                        colorList[site]
                    );
                    drawer(nodes, nodes[rootid].children[flag]);
                }

            }

            function drawerArc(beginX, beginY, endX, endY, percent, parentId, id, r, deep, color) {
                // 画圆弧
                var p1 = move.setP(beginX, beginY).setD(beginX - cx, beginY - cy)(arcWidth);
                var p2 = move.setP(endX, endY).setD(endX - cx, endY - cy)(arcWidth);
                var inner = {
                    "beginX": beginX,
                    "beginY": beginY,
                    "endX": endX,
                    "endY": endY
                },
                    ourter = {
                        "beginX": p1[0],
                        "beginY": p1[1],
                        "endX": p2[0],
                        "endY": p2[1]
                    };
                var pathString = '<path id="' + id + '" percent="' + percent + '" pid="' + parentId + '" d="M ' +
                    inner.beginX + ' ' +
                    inner.beginY + ' A ' + (r +
                        arcWidth * (deep - 1)) + ' ' + (r + arcWidth * (deep - 1)) + ' 0 ' + (percent > 0.5 ? 1 :
                            0) + ' 1 ' +
                    inner.endX + ' ' + inner.endY +
                    ' L ' + ourter.endX + ',' + ourter.endY + ' A ' + (r + arcWidth * deep) + ' ' + (
                        r + arcWidth * deep) + ' 0 ' + (percent > 0.5 ? 1 : 0) + ' 0 ' + ourter.beginX + ' ' +
                    ourter.beginY + ' Z" stroke="#ccc" stroke-width="0.5" fill="' + color + '"  />';
                var circle = $$(pathString).appendTo('.arc');
                circle.bind("mouseenter", function () {

                    $$('.arc').find("path").css("opacity", '0.3');
                    $$(this).css("opacity", "1");
                    //中间显示信息
                    $$("#textName")[0].innerHTML = $$(this).attr("id");
                    $$("#textPercent")[0].innerHTML = ($$(this).attr("percent") * 100).toFixed(2) + "%";
                    //查找父元素，增亮
                    var parent = $$("#" + $$(this).attr("pid"));
                    while ((parent.length > 0)) {
                        parent.css("opacity", "1");
                        parent = $$("#" + parent.attr("pid"));
                    }
                });

            }
            // 基本配置
            tree.bind('root', config.root)
                .bind('child', config.child)
                .bind('id', config.id)
                .bind('drawer', function (nodes, rootid, size) {

                    $$('.circle')[0].innerHTML = '';
                    $$('.arc')[0].innerHTML = '';

                    var node, p1, p2, nodeLength = 0,
                        totalValue = 0;
                    //计算总比重totalValue
                    for (node in nodes) {
                        totalValue += nodes[node].data[config.value] || 0;
                        nodeLength += 1;
                    }
                    colorList = clay.getColors(nodeLength);
                    //遍历生成各节点的比重value
                    (function setValue(childNodes) {
                        var total = 0;
                        for (var node in childNodes) {
                            if (!childNodes[node][config.value]) {
                                childNodes[node][config.value] = setValue(childNodes[node].children);
                                total += childNodes[node][config.value];
                            } else {
                                total += childNodes[node][config.value];
                            }
                        }
                        return total;
                    })(nodes[rootid].data.children);
                    //遍历生成个节点的前面节点value的总和 bvalue
                    (function setBvalue(childNodes) {
                        if (!childNodes || (typeof (childNodes[0].bValue) == "number")) {
                            return;
                        }
                        childNodes.reduce(function (total, currentItem, currentIndex, arr) {
                            currentItem.bValue = total;
                            total += currentItem[config.value];
                            setBvalue(currentItem.children);
                            return total;
                        }, 0);
                    })(nodes[rootid].data.children);
                    //为每个bvalue加上父节点的bValue
                    (function addBvalue(childNodes) {
                        if (!childNodes) {
                            return;
                        }
                        childNodes.map(function (currentItem, index, arr) {
                            currentItem.bValue += (nodes[nodes[childNodes[0].name].pid].data.bValue ||
                                0);
                            addBvalue(currentItem.children);
                        });
                    })(nodes[rootid].data.children);
                    for (node in nodes) {
                        if (nodes[node].data) {
                            nodes[node].bpercent = (nodes[node].data.bValue || totalValue) / totalValue * 2 *
                                Math.PI;
                            nodes[node].percent = (nodes[node].data[config.value] || totalValue) / totalValue;
                            nodes[node].deg = nodes[node].percent * 2 * Math.PI;
                            p1 = rotate.setP(cx, cy - R - arcWidth * (nodes[node].left - 1.5))
                                (nodes[node].bpercent);
                            nodes[node].beginX = p1[0];
                            nodes[node].beginY = p1[1];
                            p2 = rotate.setP(cx, cy - R - arcWidth * (nodes[node].left - 1.5))(nodes[
                                node].bpercent +
                                nodes[node].deg);
                            nodes[node].endX = p2[0];
                            nodes[node].endY = p2[1];
                        } else {
                            nodes[node].bpercent = nodes[node].bValue / totalValue * 2 * Math.PI;
                            nodes[node].percent = nodes[node][config.value] / totalValue;
                            nodes[node].deg = nodes[node].percent * 2 * Math.PI;
                            p1 = rotate.setP(cx, cy - R - arcWidth * (nodes[node].left - 0.5))
                                (nodes[node].bpercent);
                            nodes[node].beginX = p1[0];
                            nodes[node].beginY = p1[1];
                            p2 = rotate.setP(cx, cy - R - arcWidth * (nodes[node].left - 0.5))(nodes[
                                node].bpercent +
                                nodes[node].deg);
                            nodes[node].endX = p2[0];
                            nodes[node].endY = p2[1];
                        }
                    }

                    $$("<text id='textName' x='" + cx + "' y='" + cy + "' dy='0em'></text>")
                        .appendTo(".arc")
                        .css({
                            "text-anchor": "middle",  /* 文本水平居右 */
                            "dominant-baseline": "middle" /* 文本垂直居中 */
                        });
                    $$("<text id='textPercent' x='" + cx + "' y='" + cy + "' dy='1em'></text>")
                        .appendTo(".arc")
                        .css({
                            "text-anchor": "middle",  /* 文本水平居右 */
                            "dominant-baseline": "middle" /* 文本垂直居中 */
                        });
                    drawer(nodes, rootid);
                    $$(".arc").bind("mouseout", function () {
                        $$(".arc").find("path").css("opacity", "1");
                    })
                });

            tree(config.treeData);


        }

    });

})(window, window.clay);
