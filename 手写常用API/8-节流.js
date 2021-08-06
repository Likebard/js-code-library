// 节流重在开关锁，事件触发之后有一段时间的冷却
function throttle(fn, wait) {
    let timer;
    return function (...args) {
        let that = this;
        if (timer) return null; //只要定时器还存在，什么也不做
        timer = setTimeout(() => {
            fn.call(that, ...args);
            clearTimeout(timer);    //做了之后记得清除定时器
        }, wait);
    }
}