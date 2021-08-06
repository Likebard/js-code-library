// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// 示例 1：

// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。


/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let dp = [], len = nums.length;
    if (nums.length === 0) return 0;
    dp[0] = nums[0], maxSum = dp[0];
    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(dp[i-1] + nums[i], nums[i]);
        maxSum = Math.max(dp[i], maxSum);
    }
    return maxSum;
};

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));