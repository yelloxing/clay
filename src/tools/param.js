export default urlstring => {

    let params = /\?([^&=]+=[^&=]+)(&[^&=]+=[^&=]+)*/.test(urlstring) ? urlstring.split("?")[1].split('&') : [], urlSearchParams = {};

    for (let index = 0; index < params.length; index++) {
        let temp = params[index].split('=');
        urlSearchParams[temp[0]] = temp[1];
    }

    // 如果请求参数非法
    if (!urlSearchParams['packages'] || !/^\d+$/.test(urlSearchParams['interval'])) {
        let interval = urlSearchParams['interval'];
        if (!/^\d+$/.test(interval)) interval = 7;
        let packages = urlSearchParams['packages'] || 'image2d,image3d';
        window.location.href = './index.html?interval=' + interval + '&packages=' + packages;
    }

    // 返回npm包和时间间隔
    return {
        packages: urlSearchParams['packages'],
        interval: +urlSearchParams['interval'] >= 356 ? 364 : urlSearchParams['interval']
    };
};
