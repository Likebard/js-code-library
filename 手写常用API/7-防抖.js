// 防抖重在清零
function debounce(fn, wait) {
    let timer;     //定时器的句柄是一个闭包
    return function (...args) { //返回一个包装函数
        let that = this;        //定时器等异步函数中都有this丢死的风险
        clearTimeout(timer);    //频繁触发的时候清除上一个定时器
        timer = setTimeout(() => {      //设置新的定时器
            fn.call(that, ...args);
        }, wait);
    }
}