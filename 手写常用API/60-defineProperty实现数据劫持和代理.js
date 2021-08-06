let data = {
    stage: 'GitChat',
    course: {
        title: '前端开发进阶',
        author: 'Lucas',
        publishTime: '2018 年 5 月'
    }
}

const observe = (data) => {
    if (!data || typeof data !== "object") {
        return ;
    }
    Object.keys(data).forEach(key => {
        // 注意 这行非常重要 当局部变量是值类型时,闭包在变量传递时使用了值拷贝.
        // 当局部变量是引用类型时,闭包在变量传递时使用了堆引用.
        let currentValue = data[key];
        observe(currentValue);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function() {
                console.log(`gettinng ${key} is: `, currentValue);
                return currentValue;
            },
            set: function(newValue) {
                debugger;
                currentValue = newValue;    //curretValue是个引用，所以改变它的值就能改变data中的值
                console.log(`setting ${key} is: `, newValue);
            }
        })
    })
}

observe(data);

//对于数组的情况，监听其变化还需要重写原生数组对象原型链上的方法