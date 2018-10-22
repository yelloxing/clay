/**
 * 库仑力计算 - 二维
 * -------------------------------
 *
 * 用一棵四叉树来记录结点位置
 * 采用Barnes-Hut加速计算
 *
 * 求解步骤：
 * 1.生成四叉树；
 * 2.求解每个点的库仑力，求解中坚持从大区域到小区域的方法：
 *   2.1先检测把目标区域看成一个点是否可行；
 *   2.2如果不可行，划分计算。
 */
/**
 * @param {array} electrons 电子集合
 * 每个电子的保存结构为:
 * [x,y]
 *
 * @return {array} cElectrons 库仑力电子集合
 * 每个电子的保存结构为：
 * [x,y,lawx,lawy]，最后二个参数是计算的x和y方向的库仑力
 */
var _coulomb_law = function (electrons) {
    var
        // Barnes-Hut近似精度平方
        theta2 = 0.81,
        // 四叉树
        Q_Tree = {},
        i;

    // 求解出坐标最值
    var minX = electrons[0][0], minY = electrons[0][1], maxX = electrons[0][0], maxY = electrons[0][1];
    for (i = 1; i < electrons.length; i++) {
        if (electrons[i][0] < minX) minX = electrons[i][0];
        else if (electrons[i][0] > maxX) maxX = electrons[i][0];
        if (electrons[i][1] < minY) minY = electrons[i][1];
        else if (electrons[i][1] > maxY) maxY = electrons[i][1];
    }

    // 生成四叉树
    (function calc_Q_Tree(nodes, id, pid, ix, ax, iy, ay) {
        var mx = (ix + ax) * 0.5,
            my = (iy + ay) * 0.5;
        Q_Tree[id] = {
            "num": nodes.length,
            "cx": mx,
            "cy": my,
            "w": ax - ix,
            "h": ay - iy,
            // 无法或无需分割，包含的是结点
            "e": [],
            // 分割的子区域，包含的是区域id
            "children": []
        };
        if (nodes.length == 1) {
            Q_Tree[id].e = [nodes[0]];
            return;
        }
        var ltNodes = [], rtNodes = [], lbNodes = [], rbNodes = [];
        for (i = 0; i < nodes.length; i++) {
            // 分割线上的
            if (
                nodes[i][0] == mx || nodes[i][1] == my ||
                nodes[i][0] == ix || nodes[i][0] == ax ||
                nodes[i][1] == iy || nodes[i][1] == ay
            ) Q_Tree[id].e.push(nodes[i]);
            // 更小的格子里
            else if (nodes[i][0] < mx) {
                if (nodes[i][1] < my) ltNodes.push(nodes[i]); else lbNodes.push(nodes[i]);
            } else {
                if (nodes[i][1] < my) rtNodes.push(nodes[i]); else rbNodes.push(nodes[i]);
            }
        }
        // 启动子区域分割
        if (ltNodes.length > 0) {
            Q_Tree[id].children.push(id + "1");
            calc_Q_Tree(ltNodes, id + "1", id, ix, mx, iy, my);
        }
        if (rtNodes.length > 0) {
            Q_Tree[id].children.push(id + "2");
            calc_Q_Tree(rtNodes, id + "2", id, mx, ax, iy, my);
        }
        if (lbNodes.length > 0) {
            Q_Tree[id].children.push(id + "3");
            calc_Q_Tree(lbNodes, id + "3", id, ix, mx, my, ay);
        }
        if (rbNodes.length > 0) {
            Q_Tree[id].children.push(id + "4");
            calc_Q_Tree(rbNodes, id + "4", id, mx, ax, my, ay);
        }

    })(electrons, 'Q', null, minX, maxX, minY, maxY);

    // 求解库仑力

};
