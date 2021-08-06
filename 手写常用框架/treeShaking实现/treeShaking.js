const acorn = require("acorn");
const fs = require("fs");
const JSEmitter = require("./js-emitter");
const l = console.log;

// 获取命令行参数
const args = process.argv[2];
const buffer = fs.readFileSync(args).toString();    //读取代码为String
const body = acorn.parse(buffer).body;  //生成AST树
const jsEmitter = new JSEmitter();
let decls = new Map();  //存储所有函数或变量声明类型节点
let calledDecls = [];   //存储代码中真正使用到的变量
let code = [];          //存储其他所有没有被节点类型匹配的AST部分
l(body);
//遍历处理
body.forEach(function(node) {
    // 对于不同的节点类型，调用JS Emitter实例不同的处理方法
    if (node.type == "FunctionDeclaration") {   //函数声明
        const code = jsEmitter.run([node])
        decls.set(jsEmitter.visitNode(node.id), code)
        return;
    }

    if (node.type == "ExpressionStatement") {
        // 函数的执行 代表声明函数的函数被执行了
        if (node.expression.type == "CallExpression") { 
            const callNode = node.expression
            calledDecls.push(jsEmitter.visitIdentifier(callNode.callee))
            const args = callNode.arguments
            for (const arg of args) {
                if (arg.type == "Identifier") {
                    calledDecls.push(jsEmitter.visitNode(arg))
                }
            }
        }
    }

    if (node.type == "VariableDeclaration") {   //变量声明
        const kind = node.kind
        for (const decl of node.declarations) {
            decls.set(jsEmitter.visitNode(decl.id), jsEmitter.visitVariableDeclarator(decl, kind))
        }
        return
    }

    if (node.type == "Identifier") {    //对变量的取值，这也代表声明的变量用到了
        calledDecls.push(node.name)
    }
    code.push(jsEmitter.run([node]))
});

// 生成 code
code = calledDecls.map(c => {
    return decls.get(c)
}).concat([code]).join('')
fs.writeFileSync('test.shaked.js', code)