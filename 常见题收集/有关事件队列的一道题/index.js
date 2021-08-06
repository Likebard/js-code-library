// 摘自： https://mp.weixin.qq.com/s/14DvwrpEO3QqUiriO9dB1Q
// const assert = require('assert');

let executeCount = 0
const fn = nums => {
  executeCount++
  return nums.map(x => x * 2)
}

const batcher = f => {
  // todo 实现 batcher 函数
  //这个nums是个闭包，它将存下每次调用batchedFn时传入的数组元素
  let nums = [];

  // 使用promise将f函数延迟执行
  const p = new Promise(resolve =>　
    setTimeout(_ => resolve(f(nums)), 100)
  );

  // 这是要返回赋给batchedFn的函数，返回一个promise，promise.then回调的值是对应这次调用的arr
  return arr => {
    let s = nums.length;
    nums = nums.concat(arr);
    let e = nums.length;
    return p.then(r => r.slice(s, e));
  }
}

const batchedFn = batcher(fn);  // 注意看这一步，说明了元素*2的fn只执行了一次，executeCount自然是1，
// 返回的这个返回值是promise的batchedFn倒是要在后面的all里面执行三次

const main = async () => {
  const [r1, r2, r3] = await Promise.all([
    // 这里调用三次，所以同一个promise的.then倒是执行了三次，每次都在对nums数组做切割
    batchedFn([1,2,3]),
    batchedFn([4,5]),
    batchedFn([7,8,9])
  ]);
  
  //满足以下 test case
//   assert(r1).tobe([2, 4, 6])
//   assert(r2).tobe([8, 10])
//   assert(r3).tobe([14, 16, 18])
//   assert(executeCount).tobe(1)
  console.log("executeCount is", executeCount)
}
main();

// 题解中提到，只要使用了事件队列，让主程先走完即可，所以还可以使用Promise.resolve().then(_ => f(num))来异步调用它，只是宏任务与微任务的区别罢了
// 同理requestAnimationFrame这种宏任务，或者MutationObserver微任务也能实现这个功能。
// setTimeout的延迟时间可以为0，理论上来说 setTimeout() 的最小间隔值无法设置为 0。它的最小值和浏览器的刷新频率有关系，根据 MDN[1] 描述，它的最小值一般为 4ms。