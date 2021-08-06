/**
爱丽丝和鲍勃一起玩游戏，他们轮流行动。爱丽丝先手开局。

最初，黑板上有一个数字 N 。在每个玩家的回合，玩家需要执行以下操作：

选出任一 x，满足 0 < x < N 且 N % x == 0 。
用 N - x 替换黑板上的数字 N 。
如果玩家无法执行这些操作，就会输掉游戏。

只有在爱丽丝在游戏中取得胜利时才返回 True，否则返回 False。假设两个玩家都以最佳状态参与游戏。 */

// 自上而下式递归
var divisorGame1 = function(N) {
    console.log("N is", N);

    //确定状态边界,1必输
    if (N === 1) return false;
    if (N === 2) return true;

    //确定状态转移，缩小问题规模,
    /*当前决策者都想让下个人输，因此在1~N之间寻找x,
    让divisorGame(N-x),能有false解*/
    for (let x = 1; x < N; x++) {
        if ((N % x === 0) && !divisorGame(N-x)) {
            return true;
        }
    }
    return false;
};

//自下而上记忆化(动态规划)
var divisorGame = function(N) {
    let F = [];
    F[1] = false, F[2] = true;
    for(let i = 3; i <= N; i++) {    //算出F3~FN的状态
        F[i] = false;
        for(let x = 1; x < i; x++) {
            if ((i % x === 0) && !F[i-x]) {
                F[i] = true;
            }
        }
    }
    return F[N];
}

// 当N = 1, Alice输，返False

// 当N = 2, Alice赢, true

// 当N = 3, Alice输, false

// 当N = 4, Alice可选1,2, 为赢选1, true

console.log("result is ", divisorGame(196));