clay.layout.tree = function () {

    var scope = {
        "e": {}
    },
        // 维护的树
        alltreedata,
        // 根结点ID
        rootid;

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

        return tree;

    };

    // 挂载处理事件
    // 获取根结点的方法:root(initTree)
    // 获取子结点的方法:child(parentTree,initTree)
    // 获取结点ID方法:id(treedata)
    tree.bind = function (backname, callback) {
        scope.e[backname] = callback;
        return tree;
    };

    // 添加结点
    tree.add = function () {

    };

    // 删除结点
    tree.delete = function () {

    };

    // 修改结点
    // 只可以修改结点信息
    // 子结点的增删改不可以通过这里修改
    // 当然包括自己的删除和修改也不可以
    tree.update = function () {

    };

    return tree;

};
