function PromiseM(fn) {
    this.then = function(fulfilled, rejected) {
        return new PromiseM(function(){});
    }
    function resolve() {
        
    }
}

var p1 = new PromiseM(function() {
    setTimeout(() => {
        resolve("p1执行完毕");
    }, 1000);
});