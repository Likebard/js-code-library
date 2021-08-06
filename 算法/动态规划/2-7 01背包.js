//数组每元素花费为c, 价值为v, 容量为W
function maxValue(c, v, W) {
    let len = c.length;
    if (len === 0) return 0;

    let dp = [];
    for (let i = 0; i < len; i++) {
        dp[i] = [];
        if (W > v[i]) {
            dp[0][i] = v[i];
        } else {
            dp[0][i] = 0;
        }
    }

    for (let i = 1; i < len; i++) {
        for (let j = 1; j < W; j++) {
            let value_withI = j <= c[j] ? 0 : dp[i-1][W-c[j]];
            let value_withOutI = dp[i-1][j];
            dp[i][j] = Math.max(value_withI, value_withOutI);
        }
    }
    return dp[len-1][W];
}