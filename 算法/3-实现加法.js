// 考察对位运算的使用 https://juejin.cn/post/6844903570584633351
function twoSum(a, b) {
    if ( b === 0) return a;
    if ( a === 0) return b;
    //异或把两个数相加但是不能进位
    let c = a ^ b;
    //通过与运算能够知道哪些位需要进位
    let d = a & b;
    d = d << 1;
    twoSum(c, d);
}

// test

a = twoSum("" + Math.pow(2, 20), "" + Math.pow(2, 20));

console.log(a, Math.pow(2, 21));
