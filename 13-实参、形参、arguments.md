### 实参、形参、arguments

```
function Person(name, age) {
    console.log(Person.length)
}
```
```
如上，name、age就是形参
形参就是在函数定义时，声明的变量
```
> 形参数量：Person.length


```
Person('xx', 30)
这里的'xx'和30就是实参了
假如传入的实参比形参少的话，剩下的形参的值都为undefined
```

#### arguments的特性

> 当调用函数时候，传入的实参数量>形参数量的时候，是没办法直接获得未命名值的引用

**可以用arguments这个标识符来解决**

```
let Person = function (name, age) {
    console.log(arguments)
}

Person('xx', 30, '175', '60kg')

// Arguments(4) ["xx", 30, "175", "60kg", callee: ƒ, Symbol(Symbol.iterator): ƒ]

这里函数体内用arguments，可以把传进来的实参都放在一个【伪数组】中，通过下表调用所有的实参
```
- 注意1：arguments是个伪数组，除了length属性外，几乎没有数组的其他属性
- 注意2：ES6中箭头函数里是无法使用arguments的

#### arguments的非标准用法
- callee
- caller

