// 例如,美国有以下面额(硬币):d 1 =1,d 2 =5,d 3 =10,d 4 =25。
// 如果要找36美分的零钱,我们可以用1个25美分、1个10美分和1个便士(1美分)。
// 如何将这个解答转化成算法?
/**
 * 
 * @param {各种类硬币面额} coins 
 * @description
 */
function MinCoinChange(coins) {
    let conis = coins;
    let cache = [];

    /**
     * 
     * @param {要找零的金额} amount 
     */
    this.makeChange = function (amount) {
        // return `return ${coins}'s ${count} result`;
        if (!amount) {
            return [];
        }
        if (cache[amount]) {
            return cache[amount];
        }
        let min = [],
            newAmount,
            newMin;
        //遍历每个面额
        for (let i = 0; i < coins.length; i++) {
            let coin = coins[i];
            //尝试拆分子问题
            newAmount = amount - coin;
            if (newAmount >= 0) {
                //递归解决子问题
                newMin = this.makeChange(newAmount);
            }
            /* 记录每次dp划分的结果 */
            if (newAmount >= 0 && 
                (newMin.length < min.length - 1 || !min.length) &&  //通过比较len来取最少硬币数
                (newMin.length || !newAmount)
            ) {
                min = [coin].concat(newMin);
                console.log("new Min" + min + " for " + amount);
            }
            /* 记录每次dp划分的结果 */
        }
        return (cache[amount] = min);
    }
}

var minChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minChange.makeChange(36));