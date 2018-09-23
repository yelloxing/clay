clay.layout.tree = function () {

    var scope = {
        "e": {}
    },
        // 维护的树
        alltreedata,
        // 根结点ID
        rootid,

        update = function () {
            // 更新前调用
            if (scope.e.live && typeof scope.e.live[0] === 'function') scope.e.live[0]();

            alltreedata[rootid].top = alltreedata[rootid].size / 2;
            alltreedata[rootid].left = 0.5;
            (function drawer(pNode, beforeSize) {
                var children = pNode.children, flag, child;
                for (flag = 0; children && flag < children.length; flag++) {
                    // 计算位置
                    alltreedata[children[flag]].top = beforeSize + alltreedata[children[flag]].size / 2;
                    alltreedata[children[flag]].left = pNode.left + 1;

                    // 画线条
                    scope.e.drawer[1](pNode, alltreedata[children[flag]]);

                    drawer(alltreedata[children[flag]], beforeSize);
                    beforeSize += alltreedata[children[flag]].size;
                }

                //  画结点
                scope.e.drawer[0](pNode);

            })(alltreedata[rootid], 0);

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
            "id":id,
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
                    "id":id,
                    "children": []
                };
                createTree(children[flag], id);
            }
        })(temp, id);
        // 计算位置
        // 预计算
        // 因为最终位置会根据配置进行调整
        (function calcPosition(id) {
            var width = 1, flag = 0,
                children = alltreedata[id].children;
            for (; children && flag < children.length; flag++) {
                width += calcPosition(children[flag]);
            }
            alltreedata[id].size = children && children.length > 0 ? width - 1 : 1;
            return alltreedata[id].size;
        })(rootid);
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
