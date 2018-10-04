clay.layout.tree = function () {

    var scope = {
        "e": {}
    },
        // 维护的树
        alltreedata,
        // 根结点ID
        rootid,
        size = 0,

        update = function () {
            // 更新前调用
            if (scope.e.live && typeof scope.e.live[0] === 'function') scope.e.live[0]();

            var beforeDis = [];
            (function positionCalc(pNode, deep) {

                var flag;
                for (flag = 0; flag < pNode.children.length; flag++)
                    positionCalc(alltreedata[pNode.children[flag]], deep + 1);

                alltreedata[pNode.id].left = deep + 0.5;
                if (flag == 0) {

                    // 如果是叶子结点
                    if (beforeDis[deep] == undefined) beforeDis[deep] = -0.5;
                    if (beforeDis[deep - 1] == undefined) beforeDis[deep - 1] = -0.5;
                    alltreedata[pNode.id].top = beforeDis[deep] + 1;
                    var pTop = beforeDis[deep] + 1 + (alltreedata[pNode.pid].children.length - 1) * 0.5;
                    if (pTop - 1 < beforeDis[deep - 1])
                        // 必须保证父亲结点和父亲的前一个兄弟保存1的距离，至少
                        alltreedata[pNode.id].top = beforeDis[deep - 1] + 1 - (alltreedata[pNode.pid].children.length - 1) * 0.5;

                } else {
                    alltreedata[pNode.id].top = (alltreedata[pNode.children[0]].top + alltreedata[pNode.children[flag - 1]].top) * 0.5;
                }
                beforeDis[deep] = alltreedata[pNode.id].top;
                if (alltreedata[pNode.id].top + 0.5 > size) size = alltreedata[pNode.id].top + 0.5;

            })(alltreedata[rootid], 0);

            // 画图
            (function treeDrawer(pNode) {

                var flag;
                for (flag = 0; flag < pNode.children.length; flag++) {
                    // 画线条
                    scope.e.drawer[1](pNode, alltreedata[pNode.children[flag]], size);
                    treeDrawer(alltreedata[pNode.children[flag]]);
                }
                //  画结点
                scope.e.drawer[0](pNode, size);
            })(alltreedata[rootid]);

            // 更新结束调用
            if (scope.e.live && typeof scope.e.live[1] === 'function') scope.e.live[1]();
        };

    // 可以传递任意格式的树原始数据
    // 只要配置对应的解析方法即可
    var tree = function (initTree) {

        alltreedata = {};
        // 根结点
        var temp = scope.e.root(initTree), id;
        id = rootid = scope.e.id(temp);
        alltreedata[id] = {
            "data": temp,
            "pid": null,
            "id": id,
            "children": []
        };
        // 根据传递的原始数据，生成内部统一结构
        (function createTree(pdata, pid) {
            var children = scope.e.child(pdata, initTree), flag;
            for (flag = 0; children && flag < children.length; flag++) {
                id = scope.e.id(children[flag]);
                alltreedata[pid].children.push(id);
                alltreedata[id] = {
                    "data": children[flag],
                    "pid": pid,
                    "id": id,
                    "children": []
                };
                createTree(children[flag], id);
            }
        })(temp, id);

        update();
        return tree;

    };

    // 挂载处理事件
    // 获取根结点的方法:root(initTree)
    // 获取子结点的方法:child(parentTree,initTree)
    // 获取结点ID方法:id(treedata)
    // 生命钩子 live([beforback(),afterback()])
    // 结点更新处理方法 drawer(nodeback(node), linkback(pNode, node))
    tree.bind = function (backname, callback, moreback) {
        if (/^(live|drawer)$/.test(backname))
            scope.e[backname] = [callback, moreback];
        else
            scope.e[backname] = callback;
        return tree;
    };

    return tree;

};
