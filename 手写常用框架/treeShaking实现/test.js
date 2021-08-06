function add(a, b) {

    return a + b

}

// 这是打算被摇掉的代码
function multiple(a, b) {

    return a * b

}

var firstOp = 9

var secondOp = 10

add(firstOp, secondOp)

// 终端使用命令node treeShaking.js test.js