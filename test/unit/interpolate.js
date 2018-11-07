QUnit.test('Hermite插值法', 4, function () {

    /**
     * 对于已知函数
     * y=x(3次方)+1
     * 使用斜率不调整的Hermite插值法求出回归曲线
     */
    var hermite = $$.hermite().setU(-1).setP(0, 1, 3, 28, 0, 27);

    equal(hermite(0), 1, 'x=0');
    equal(hermite(1), 2, 'x=1');
    equal(hermite(2), 9, 'x=2');
    equal(hermite(3), 28, 'x=3');

});
