export default num => {
    let temp = [];
    for (let flag = 1; flag <= num; flag++)
        temp.push('rgb(' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ',' + (Math.random(1) * 230 + 20).toFixed(0) + ')');
    return temp;
};
