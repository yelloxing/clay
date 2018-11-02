QUnit.test('结点查找', 26, function () {

    // 单一查找成功
    equal($$('li').length, 7, '元素选择器 存在');
    equal($$('.cls').length, 2, '类选择器 存在');
    equal($$('[target]').length, 3, '属性选择器 存在');
    equal($$('[target="attr"]').length, 1, '属性选择器（指定属性值） 存在');
    equal($$('#uq').length, 1, 'ID选择器 存在');

    // 单一查找失败
    equal($$('span').length, 0, '元素选择器 不存在');
    equal($$('.cls2').length, 0, '类选择器 不存在');
    equal($$('[targets]').length, 0, '属性选择器 不存在');
    equal($$('[target="attrs"]').length, 0, '属性选择器（指定属性值） 不存在');
    equal($$('#uniq').length, 0, 'ID选择器 不存在');

    // 简单混合
    equal($$('li.cls').length, 2, '元素选择器和类选择器 存在');
    equal($$('li[target]').length, 3, '元素选择器和属性选择器 存在');
    equal($$('li#uq').length, 1, '元素选择器和ID选择器 存在');
    equal($$('[target].cls').length, 1, '类选择器和属性选择器 存在');
    equal($$('#uq.cls').length, 0, '类选择器和ID选择器 不存在');
    equal($$('#uq[target="attr"]').length, 1, '属性选择器和ID选择器 存在');
    equal($$('#uq[target="attr2"]').length, 0, '属性选择器和ID选择器 不存在');

    // 复杂混合
    equal($$('#uq[target="attr2"].cls').length, 0, '混合查找 不存在');
    equal($$('li[name="nm"][target][target="attr"]#uq').length, 1, '混合查找 存在');

    // find查找
    equal($$('ul').find('li.cls').length, 2, 'find查找 元素选择器和类选择器 存在');
    equal($$('ul').find('li[target]').length, 3, 'find查找 元素选择器和属性选择器 存在');
    equal($$('ul').find('li#uq').length, 1, 'find查找 元素选择器和ID选择器 存在');
    equal($$('ul').find('[target].cls').length, 1, 'find查找 类选择器和属性选择器 存在');
    equal($$('ul').find('#uq.cls').length, 0, 'find查找 类选择器和ID选择器 不存在');
    equal($$('ul').find('#uq[target="attr"]').length, 1, 'find查找 属性选择器和ID选择器 存在');
    equal($$('ul').find('#uq[target="attr2"]').length, 0, 'find查找 属性选择器和ID选择器 不存在');

});

QUnit.test('结点操作', 5, function () {

    // 删除和修改
    equal($$('ol').find('li').length, 3, 'appendTo + remove');
    equal($$('ol').find('[name="appendTo"]').length, 1, 'appendTo');
    equal($$('ol').find('li').length, 3, 'remove');

    // 属性操作
    equal($$('[attrname1="attrValue1"]').length, 2, '设置属性');
    equal($$('[attrname1="attrValue1_update"]').length, 1, '使用方法属性');

});
