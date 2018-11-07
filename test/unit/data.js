QUnit.test('datum', 2, function () {

    equal($$('ul').find('li').eq(0).datum(), "datum_test", 'datum value');
    equal($$('ul').find('li').eq(2).datum(), "datum_test_update", 'datum function');

});

QUnit.test('data', 9, function () {

    // 结点个数
    equal($$('ol.one').find('li').length, 3, 'data 数据不足，补入结点');
    equal($$('ol.two').find('li').length, 3, 'data 结点过剩，删除结点');
    equal($$('ol.one2').find('li').length, 2, 'data 数据不足，删除结点');
    equal($$('ol.two2').find('li').length, 4, 'data 结点过剩，补入结点');

    // 值问题
    equal($$('ol.one').find('li').data()[2], 3, '获取存在的值');
    equal($$('ol.two2').find('li').data()[3], undefined, '获取不存在的值');

    // 属性值
    equal($$('ol.one').find('li').eq(0).attr('val'), '1_0', '属性值 1');
    equal($$('ol.one').find('li').eq(1).attr('val'), '2_1', '属性值 2');
    equal($$('ol.one').find('li').eq(2).attr('val'), '3_2', '属性值 3');

});
