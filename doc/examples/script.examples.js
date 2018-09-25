function toggle() {
    var target = $$('body').find('header').find('ul');
    if (target.attr('class') == 'show') {
        target.attr('class', 'hidden');
    } else {
        target.attr('class', 'show');
    }
}
