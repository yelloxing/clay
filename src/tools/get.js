let get = url => {

    let data = sessionStorage.getItem(url);
    if (data) {
        return new Promise(resolve => {
            resolve(JSON.parse(data));
        });
    }

    // 获取xhr对象
    let xhr = window.XMLHttpRequest ?
        // IE7+, Firefox, Chrome, Opera, Safari
        new XMLHttpRequest() :
        // IE6, IE5
        new ActiveXObject("Microsoft.XMLHTTP");

    // 打开请求地址
    xhr.open("GET", url, true);

    let promise = new Promise(resolve => {

        // 请求成功回调
        xhr.onload = () => {
            sessionStorage.setItem(url, JSON.stringify(xhr.response));
            resolve(xhr.response);
        };

    });

    // 发送请求
    xhr.send();

    return promise;

};

export default packages => {

    let date = new Date();
    let year = date.getFullYear();
    let month_day = "-" + (date.getMonth() - (-1)) + "-" + date.getDate();

    let url = "https://api.npmjs.org/downloads/range/" + (year - 1) + month_day + ":" + year + month_day + "/";
    return get(url + packages.replace(/,$/, ''));
};
