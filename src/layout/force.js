/**
 * 力布局
 *
 * 采用阻尼衰减
 */
clay.layout.force = function () {

    var scope = {
        "e": {}
    }, allNode, allLink,
        i, j, k, flag, source, target, dx, dy, d, fx, fy, ax, ay, dsq,
        // 标记轮播计算是否在运行中
        running = false,
        num = 0,

        // 阻尼衰减
        alpha = 1,
        alphaMin = 0.001,
        // alpha衰减率
        alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
        alphaTarget = 0,

        // 更新弹簧引力
        updateSpring = function () {
            for (i in allLink) {
                for (j in allLink[i]) {
                    source = allNode[i];
                    target = allNode[j];
                    dx = source.x - target.x;
                    dy = source.y - target.y;
                    if (dx != 0 && dy != 0) {
                        d = Math.sqrt(dx * dx + dy * dy);
                        // 弹簧系数先写死
                        k = 100 * (d - (allLink[i][j].isG ? allLink[i][j].l * 0.3 : allLink[i][j].l));
                        fx = k * dx / d;
                        fy = k * dy / d;
                        allNode[i].fx -= fx;
                        allNode[i].fy -= fy;
                        allNode[j].fx += fx;
                        allNode[j].fy += fy;
                    }
                }
            }
        },
        // 更新库伦斥力
        updateReplusion = function () {
            k = [];
            for (i in allNode)
                k.push([allNode[i].x, allNode[i].y]);
            j = _coulomb_law(k);
            k = 0;
            for (i in allNode) {
                allNode[i].fx += j[k][2] / 400;
                allNode[i].fy += j[k][3] / 400;
                k += 1;
            }
        },
        // 中心引力，用以聚笼结点
        updateCenter = function () {
            for (i in allNode) {
                allNode[i].fx += (500 - allNode[i].x) * 0.05;
                allNode[i].fy += (500 - allNode[i].y) * 0.05;
            }
        },
        //持续计算
        tick = function () {
            // alpha不断衰减
            alpha += (alphaTarget - alpha) * alphaDecay;

            /**
             * 计算
             */
            // 初始化受力
            for (i in allNode) {
                allNode[i].fx = 0;
                allNode[i].fy = 0;
            }
            // 更新力，得出加速度
            updateSpring();
            updateReplusion();
            updateCenter();
            // 更新位置
            for (i in allNode) {
                // 1.计算新的位置
                dx = _Velocity_Verlet_P(allNode[i].x, allNode[i].vx, allNode[i].ax, 1) - allNode[i].x;
                dy = _Velocity_Verlet_P(allNode[i].y, allNode[i].vy, allNode[i].ay, 1) - allNode[i].y;
                dsq = dx * dx + dy * dy;
                // 1.1超过一次改变最大程度
                if (dsq > 100) {
                    k = Math.sqrt(100 / dsq);
                    dx *= k;
                    dy *= k;
                }
                allNode[i].x += dx;
                allNode[i].y += dy;
                // 1.2 如果结点越界
                if (allNode[i].x < 0) allNode[i].x = 0;
                if (allNode[i].y < 0) allNode[i].y = 0;
                if (allNode[i].x > 1000) allNode[i].x = 1000;
                if (allNode[i].y > 1000) allNode[i].y = 1000;
                // 2.更新加速度
                ax = allNode[i].ax * alpha;
                ay = allNode[i].ay * alpha;
                allNode[i].ax = allNode[i].fx / 1000 * alpha;
                allNode[i].ay = allNode[i].fy / 1000 * alpha;
                // 3.更新速度
                allNode[i].vx = _Velocity_Verlet_V(allNode[i].vx, ax, allNode[i].ax, 1) * alpha;
                allNode[i].vy = _Velocity_Verlet_V(allNode[i].vy, ay, allNode[i].ay, 1) * alpha;
            }

            // 调用钩子
            if (num < 30) {
                num += 1;
            } else {
                if (scope.e.live && typeof scope.e.live[0] === 'function') scope.e.live[0]();

                for (i in allNode) scope.e.update[0](allNode[i]);
                for (i in allLink)
                    for (j in allLink[i])
                        scope.e.update[1](allNode[i], allNode[j], allLink[i][j]);

                if (scope.e.live && typeof scope.e.live[1] === 'function') scope.e.live[1]();
            }

            // 判断是否需要停止
            if (alpha >= alphaMin)
                if (num < 30)
                    tick();
                else
                    window.setTimeout(function () {
                        tick();
                    }, 40);
            else
                running = false;
        },
        // 启动更新
        update = function () {
            if (!running) {
                running = true;
                tick();
                alpha = 1;
            } else {
                alpha = 0.3;
            }

        };

    var force = function (initnodes, initlinks) {
        allNode = {}; allLink = {};
        // 分析结点
        var num = Math.ceil(10 / Math.sqrt(100 / initnodes.length)),
            sw = 10 / num;
        j = { "p": [], "g": {} };
        for (i = 0; i < initnodes.length; i++) {
            k = scope.e.analyse[0](initnodes[i]);
            allNode[k[0]] = {
                "orgData": initnodes[i],
                "vx": 0, "vy": 0,
                "ax": 0, "ay": 0,
                "t": [], "s": [],
                "id": k[0],
                "g": k[1]
            };
            j.p.push([i % num * sw + sw * 0.5, Math.ceil((i + 1) / num) * sw - sw * 0.5]);
            j.g[k[1]] = j.g[k[1]] || [];
            j.g[k[1]].push(k[0]);
        }
        flag = 0;
        for (i in j.g) {
            for (k in j.g[i]) {
                allNode[j.g[i][k]].x = j.p[flag][0] + 495;
                allNode[j.g[i][k]].y = j.p[flag][1] + 495;
                flag += 1;
            }
        }

        // 分析连线
        for (i = 0; i < initlinks.length; i++) {
            k = scope.e.analyse[1](initlinks[i]);
            allLink[k[0]] = allLink[k[0]] || {};
            allLink[k[0]][k[1]] = {
                "l": k[2],
                "orgData": initlinks[i],
                "isG": (allNode[k[0]].g == allNode[k[1]].g ? true : false)
            };
            // 告诉结点，他连接的点
            allNode[k[0]].t.push(k[1]);
            allNode[k[1]].s.push(k[0]);
        }
        update();

    };

    // 挂载处理事件
    // 结点更新处理方法 update(nodeback(node), linkback(link, sourceNode, targetNode))
    // 分析结点和连线的方法 analyse(nodeback(initnode), linkback(inilink))
    // 生命钩子 live(beforback(),afterback())
    force.bind = function (type, nodeback, linkback) {

        if (typeof nodeback !== 'function') nodeback = function () { };
        if (typeof linkback !== 'function') linkback = function () { };
        scope.e[type] = [nodeback, linkback];
        return force;
    };

    force.update = function (id, x, y) {
        allNode[id].x = x;
        allNode[id].y = y;
        update();
    };

    return force;
};
