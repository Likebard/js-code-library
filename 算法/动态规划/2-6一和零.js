/**
给你一个二进制字符串数组 strs 和两个整数 m 和 n 。

请你找出并返回 strs 的最大子集的大小，该子集中 最多 有 m 个 0 和 n 个 1 。

如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
 */
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

//  dp[i][m][n] 前i件物品放入容量为(m个0,n个1)的最大子集大小
//  max(dp[i-1][m-strs[i-1].0的个数])
伪代码：


//动态规划：定义二维数组dp[i][j],表示要生成i个0,j个1时，最大子集的大小
//状态转移方程： dp[i][j] = dp
//边界情况： dp[i][0] = 不含1的元素数量总和, dp[0][j] = 不含0得元素数量总和
var findMaxForm = function(strs, m, n) {
    let dp = [];
    //初始化边界态
    for(let i = 0; i <= m; i++) {
        dp[i] = [];
        dp[i][0] = 0;
        for(let j = 0; j <= n; j++) {
            dp[0][j] = 0;
        }
    }
    for(let i = 0; i <= m; i++) {
        for(let j = 0; j <= n; j++) {
            dp[i][j] = Math.max()
        }
    }
}
// 递归解法：
// 对strs中每个字符串，都有拿or不拿，两种选择
// 得状态转移方程为：
// f(strs, m, n) = 
// max{f(strs.slice(1, length), m-str1的0, n-str1的1)+1，f(strs.slice(1, length), m, n)};

// 边界条件: strs没有元素了，返回0，strs最后一项元素的0个数大于m或1个数大于n，也返回0
// var findMaxForm = function(strs, m, n) {
//     let strLen = strs.length;
//     if (strLen === 0 || (m === 0 && n === 0)) {
//         return 0;
//     }
    
//     console.log("params", arguments);
//     let str0 = strs[0];
//     let sum0 = 0, sum1 = 0;
//     // 计算0,1的个数
//     for (let i = 0; i < str0.length; i++) {
//         if (str0[i] === "0") sum0++;
//         if (str0[i] === "1") sum1++;
//     }
    
//     if (m < sum0 || n < sum1) return findMaxForm(strs.slice(1), m, n);
    
//     return Math.max(findMaxForm(strs.slice(1), m-sum0, n-sum1) + 1, findMaxForm(strs.slice(1), m, n));
// };


let strs = ["11","11","0","0","10","1","1","0","11","1","0","111","11111000","0","11","000","1","1","0","00","1","101","001","000","0","00","0011","0","10000"]
let m = 90;
let n = 66;
console.log("result is ", findMaxForm(strs, m, n));