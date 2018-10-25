/**
 * 力布局
 *
 * 采用阻尼衰减
 */
clay.layout.force = function () {

    var scope = {
        // 处理方法
        "e": {},
        // 配置参数
        "c": {}
    },
        // 分别用于保存结点和连线，内部存储
        allNode, allLink,
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
                    // 如果绳子长度为0，忽略作用力
                    if (dx != 0 && dy != 0) {
                        d = Math.sqrt(dx * dx + dy * dy);
                        // scope.c.spring表示弹簧系数
                        // 同一组之间和别的组之间为了显示的分开，绳子长度进行了统一的缩放
                        k = scope.c.spring * (d - (allLink[i][j].isG ? allLink[i][j].l * scope.c.scale : allLink[i][j].l));
                        fx = k * dx / d;
                        fy = k * dy / d;
                        // 软木棒作用的双方都会受到力
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
                allNode[i].fx += j[k][2] / scope.c.coulomb;
                allNode[i].fy += j[k][3] / scope.c.coulomb;
                k += 1;
            }
        },
        // 中心引力，用以聚笼结点
        updateCenter = function () {
            for (i in allNode) {
                k = allNode[i].ng > 0 ? allNode[i].ng : -1;
                allNode[i].fx += (500 - allNode[i].x) * scope.c.center * k;
                allNode[i].fy += (500 - allNode[i].y) * scope.c.center * k;
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
                    // 如果二次位置（之前和计算后的）绘制的面积大于100，认为这是一次剧烈的改变
                    // 剧烈的改变是不友好的用户体验
                    k = Math.sqrt(100 / dsq);
                    dx *= k;
                    dy *= k;
                }
                // 更新结点位置
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
                // 采用速度verlet算法计算
                // 乘上alpha是为了让结点慢慢停下来
                // 因为理论上来说，结点很大概率会永远停不下来
                // 但这是不需要的，因此添加了阻尼衰减
                allNode[i].vx = _Velocity_Verlet_V(allNode[i].vx, ax, allNode[i].ax, 1) * alpha;
                allNode[i].vy = _Velocity_Verlet_V(allNode[i].vy, ay, allNode[i].ay, 1) * alpha;
            }

            // 调用钩子
            if (num < 30) {
                num += 1;
            } else {
                // 重新渲染前调用
                if (scope.e.live && typeof scope.e.live[0] === 'function') scope.e.live[0]();

                // 绘制结点
                for (i in allNode) scope.e.update[0](allNode[i]);
                for (i in allLink)
                    for (j in allLink[i])
                        // 绘制连线
                        scope.e.update[1](allNode[i], allNode[j], allLink[i][j]);

                // 渲染结束后调用
                if (scope.e.live && typeof scope.e.live[1] === 'function') scope.e.live[1]();
            }

            // 判断是否需要停止
            if (alpha >= alphaMin)
                // 计算一定次数以后再开始绘制页面
                // 这是为了加速渲染
                // 我们不希望初始化计算时间过长
                if (num < 30)
                    tick();
                else
                    window.setTimeout(function () {
                        // 每次重新渲染页面不需要太快
                        // 一定间隔后渲染依旧不会影响体验
                        tick();
                    }, 40);
            else
                // 标记迭代结束
                running = false;
        },
        // 启动更新
        update = function () {
            if (!running) {
                // running表示此刻是否在迭代计算
                running = true;
                tick();
                alpha = 1;
            } else {
                // 如果在迭代计算
                // 启动更新等价与保证衰减率不低于0.3
                alpha = alpha < 0.3 ? 0.3 : alpha;
            }

        };

    /**
     * 调用启动布局计算的方法
     * @param {Array} initnodes 全部结点
     * @param {Array} initlinks 全部连线
     *
     * -----------------------------------------
     * 需要分析这些数据的方法需要在绘图前配置好
     * 因此原则上来说，原始数据只要是二个数组
     * 其它没有任何要求
     *
     */
    var force = function (initnodes, initlinks) {
        allNode = {}; allLink = {};
        // 分析结点
        // 初始化结点被分配在一个10*10的区域
        // 这里的num表示这个区域一行至少需要存放多少个结点
        // sw表示一个结点占据的宽是多少
        var num = Math.ceil(10 / Math.sqrt(100 / initnodes.length)),
            sw = 10 / num;
        j = { "p": [], "g": {} };
        for (i = 0; i < initnodes.length; i++) {
            // k返回一个数组
            // [结点id，结点所在组的名称]
            k = scope.e.analyse[0](initnodes[i]);
            // 内部存储一个点的结构
            allNode[k[0]] = {
                "orgData": initnodes[i],//结点原始数据
                "vx": 0, "vy": 0,//结点坐标
                "ax": 0, "ay": 0,//结点加速度
                //记录结点和哪些结点连接在一起
                // t保存的是结点作为source
                // s保存的是结点作为target
                "t": [], "s": [],
                "id": k[0],//该结点的唯一标识
                "g": k[1],//结点所在的组
                "ng": 0,//和结点相连却不是一个组的连线个数
                "ig": 0//和结点相连是一个组的连线个数
            };

            // j中的p记录了初始化结点可以存放的位置有哪些
            // j中的g记录了根据组分别保存的结点
            // 这二个记录的目的是在稍晚点的时候初始化点的坐标的时候
            // 把同一组的结点尽力初始化在一起
            j.p.push([i % num * sw + sw * 0.5, Math.ceil((i + 1) / num) * sw - sw * 0.5]);
            j.g[k[1]] = j.g[k[1]] || [];
            j.g[k[1]].push(k[0]);
        }
        flag = 0;
        for (i in j.g) {
            for (k in j.g[i]) {
                // 如同前面描述的，这里把可以存放的点，根据组来一个个分配
                allNode[j.g[i][k]].x = j.p[flag][0] + 495;
                allNode[j.g[i][k]].y = j.p[flag][1] + 495;
                flag += 1;
            }
        }

        // 分析连线
        for (i = 0; i < initlinks.length; i++) {
            // k返回一个数组
            // [sorce结点，target结点，连线长度]
            k = scope.e.analyse[1](initlinks[i]);
            allLink[k[0]] = allLink[k[0]] || {};
            // 内部存储一条线的结构
            allLink[k[0]][k[1]] = {
                "l": k[2],//线条长度
                "orgData": initlinks[i],//线条元素数据
                // true表示连线的二个结点是一个组的，否则为false
                "isG": (allNode[k[0]].g == allNode[k[1]].g ? true : false)
            };
            // 告诉结点，他连接的点
            allNode[k[0]].t.push(k[1]);
            allNode[k[1]].s.push(k[0]);
            if (allNode[k[0]].g != allNode[k[1]].g) {
                allNode[k[0]].ng += 1;
                allNode[k[1]].ng += 1;
            } else {
                allNode[k[0]].ig += 1;
                allNode[k[1]].ig += 1;
            }
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

    // 更新一个特定结点位置
    // 在页面交互的时候，请使用这个方法更新鼠标拖动的结点的实时位置
    force.update = function (id, x, y) {
        allNode[id].x = x;
        allNode[id].y = y;
        update();
        return force;
    };

    /**
     * 配置方法
     * @param {json} config
     *
     * 下面是全部可配置项的例子
     * config={
     *
     *   center:26,//中心力强度
     *   coulomb:400,//库仑力缩小倍数
     *   spring:200,//软棒系数
     *   scale:0.3//组内绳子缩短程度
     *
     * }
     */
    force.config = function (config) {
        for (k in config)
            scope.c[k] = config[k];
        return force;
    };

    return force;
};
