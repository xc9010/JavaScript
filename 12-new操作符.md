### new操作符

#### 先看一个正常情况下的构造函数生产对象的过程
```
function Person(name) {
    this.name = name;
}

Person.prototype.sayName = function () {
    console.log(this.name)
}

const p1 = new Person('yy');

console.log(p1) // Person {name: "yy"}
console.log(p1.sayName()) // yy
```

- new通过构造函数Person 创建出来的实例，可以访问到构造函数中的【属性】
- new通过构造函数Person创建出来的实例，可以访问到构造函数【原型链】中的【属性】<也就是说通过new，实例与构造函数通过原型链连接了起来>

#### 但是现在构造函数Person 并没有显式return任何值（默认返回undefined）

- 让它返回一个原始值
```
function Person(name) {
    this.name = name;
    return 12;
}

Person.prototype.sayName = function () {
    console.log(this.name)
}

const p1 = new Person('yy');

console.log(p1) // Person {name: "yy"}
console.log(p1.sayName()) // yy
```
> 打印结果和之前一样，说明返回【原始值是不生效的】


- 让它返回一个对象
```
function Person(name) {
    this.name = name;
    return {
        age: 30
    }
}

Person.prototype.sayName = function () {
    console.log(this.name)
}

const p1 = new Person('yy');

console.log(p1) // {age: 30}
console.log(p1.sayName()) // undefined
```
> 返回值为对象的时候，可以被正常的返回出去

#### 总结

【构造函数尽量不要返回值】


#### 自己实现一个new操作符

```
function create(Con, ...args) { // 接收不定量的参数，第一个为构造函数，后面是参数
    let obj = {} // 创建一个空对象obj
    
    Object.setPrototypeOf(obj, Con.prototype) // 通过setPrototypeOf将obj和构造函数链接起来
    
    let result = Con.apply(obj, args) // 将obj绑定到构造函数上，并传入剩余的参数
    console.log(result instanceof Object)
    console.log(obj)
    
    return result instanceof Object ? result : obj // 如果构造函数返回值为对象，如果为对象就使用构造函数返回的值，否则使用obj，这样就忽略了构造函数返回的原始值
}

const c1 = create(Person, 'xc')
console.log(c1)
```

```
思路解析：
1-new操作符会返回一个对象，所以在内部先创建一个对象
2-这个对象，就是构造函数中的this，可以访问到挂载在this上的任意属性
3-这个对象可以访问到构造函数原型上的属性，所以需要将对象和构造函数链接起来
4-返回原始值需要忽略，返回对象需要正常处理
```
