const fs = require("fs");
const babylon = require("babylon");
const babel = require("babel-core");
const traverse = require("babel-traverse").default;
const path = require("path");

const config = {
    entry: "./example"
}

/**
 * 获取文件，解析成ast语法
 * @param filename // 入口文件
 * @returns {*}
 */
function getAst(filename) {
    const content = fs.readFileSync(filename, "utf-8")

    return babylon.parse(content, {
        sourceType: "module"
    });
}

/**
 *
 * 编译ast，转为降级语法
 * @param {*} ast
 */
function getTraslateCode(ast) {
    const { code } = babel.transformFromAst(ast, null, {
        presets: ['env']
    });
    return code;
}

/**
 * 遍历AST获取依赖项
 *
 * @param {*} ast
 */
function getDependence(ast) {
    let dependencies = [];
    traverse(ast, {
        ImportDeclaration: ({node}) => {
            dependencies.push(node.source.value);
        },
    })
    return dependencies
}

/**
 * 生成完整的文件依赖关系映射
 * @param fileName
 * @param entry
 * @returns {{fileName: *, dependence, code: *}}
 */
function parse(fileName, entry) {
    let filePath = fileName.indexOf(".js") === -1 ? fileName + ".js" : fileName;
    let dirName = entry ? "" : path.dirname(config.entry);
    let absolutePath = path.join(dirName, filePath);
    const ast = getAst(absolutePath);
    return {
        fileName,
        dependence: getDependence(ast),
        code: getTraslateCode(ast),
    }
}

/**
 * 获取深度队列依赖关系
 * @param main
 * @returns {*[]}
 */
function getQueue(main) {
    let queue = [main];
    for (let asset of queue) {
        asset.dependence.forEach(function (dep) {
            let child = parse(dep);
            queue.push(child);
        })
    }
    return queue;
}

function bundle(queue) {
    let module = "";
    queue.forEach(function (mod) {
        
    })
}

// function 

module.exports = {
    getAst,
    getTraslateCode,
    parse
};