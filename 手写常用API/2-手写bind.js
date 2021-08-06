Function.prototype.myBind = function(ctx, ...args) {
    // ctx代表上下文环境，也就是this要指向的对象
    return (...innerArgs) => this.call(ctx, ...args, ...innerArgs);
}

Function.prototype.myBind2 = function(ctx, args) {
    return (innerArgs) => this.apply(ctx, args.concat(innerArgs));  
    //注意这里的this，因为该方法挂在Function原型上，因此这里的this指向调用它的函数，函数就是Function的一个实例
}

//以上版本均不支持打破new绑定， 要想实现使其优先级高于new绑定，你不知道的js书上有polyfill，或者看这：
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
//https://blog.csdn.net/q3254421/article/details/82999718



// test样例
const obj = {
    x: 42,
    getX: function() {
        return this.x;
    }
};
  
const unboundGetX = obj.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.bind(obj);
console.log(boundGetX());
// expected output: 42


const myBoundGetX = unboundGetX.myBind(obj);
console.log(myBoundGetX());
// expected output: 42

const myBoundGetX2 = unboundGetX.myBind2(obj);
console.log(myBoundGetX());
// expected output: 42
