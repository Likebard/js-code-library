// 简单版本
function _new(func) {
    let obj = {};   //创建对象
    obj.__proto__ = func.prototype; //空对象的__proto__指向构造函数的原型
    func.call(obj);     //构造函数的this指向这个对象
    return obj;     //返回这个对象
}

function Person() {
    this.name = "Bob";
    this.sayName = function() {
        console.log("my name is", this.name);
    }
}
let p1 = _new(Person);
p1.sayName();

//考虑构造函数返回一个值的情况
// 如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；
// 如果返回的不是一个对象，那么 this 仍然指向实例。那么改进版本如下：
function new1(func) {
	let target = {};
	target.__proto__ = func.prototype;
	let res = func.call(target);
	if (typeof(res) == "object" || typeof(res) == "function") {
		return res;
	}
	return target;
}
