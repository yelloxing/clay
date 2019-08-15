export default urlstring => {

    // 建立url对象
    let urlSearchParams = new URLSearchParams((urlstring + "").replace(/^[^?]+/, '').replace(/^\?/, ''));

    // 返回npm包和时间间隔
    return {
        packages: urlSearchParams.get('packages'),
        interval: urlSearchParams.get('interval')
    };
};
