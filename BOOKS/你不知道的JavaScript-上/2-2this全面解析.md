### this全面解析

#### 1-调用位置

```
    在理解this的绑定过程之前，
    首先理解调用位置：
    调用位置是函数在代码中被调用的位置，而不是声明的位置

    通常来说，寻找调用位置就是寻找"函数被调用的位置"，但是不简单，有些编程模式会隐藏真正的调用位置

    最重要的是分析调用栈，
    我们关系的调用位置，就在当前正在执行的函数的前一个调用中
```

```
    function baz() {
        // 当前调用栈是：baz
        // 当前调用位置是全局作用域
        console.log('baz')
        bar();
    }

    function bar() {
        // 当前调用栈是：baz -> bar
        // 当前调用位置是 baz
        console.log('bar')
        foo();
    }

    function foo() {
        // 当前调用栈是：baz -> bar -> foo
        // 当前调用位置是 bar
        console.log('foo')
    }

    baz(); // baz的调用位置
    
    注意： 我们是如何从调用栈中，分析出真正的调用位置的，它决定了this的绑定
```


#### 2-绑定规则

- 默认绑定

> 最常用的函数调用类型：独立函数调用；无法应用其他规则时的默认规则

> foo()是 直接使用不带任何修饰的函数引用进行调用的

```
1，非严格模式

this指向window，指向全局对象

function foo() {
    console.log(this.a);
}
var a = 2;
foo(); // 2

2，严格模式

不能将全局对象用于默认绑定
this会绑定到undefined

function foo() {
    'use strict';
    console.log(this.a);
}
var a = 2;
foo(); // this is undefined

```

- 隐式绑定

> 调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含

```
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};

obj.foo(); // 2

foo()函数，无论是直接在obj中定义，还是先定义再添加为引用属性，这个函数严格来说都不属于obj对象

调用位置会使用obj上下文来引用函数，因此，函数被调用时obj对象，拥有或包含 函数引用

当obj.foo()时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象

此时调用foo()时，this被绑定到obj,此时this.a 和obj.a是一样的

注意：对象属性引用链中，只有上一层或者说最后一层在调用位置中起作用
function foo() {
    console.log(this.a);
}

var obj2 = {
    a: 42,
    foo: foo
}

var obj1 = {
    a: 2,
    foo: foo
}

obj1.obj2.foo(); // 42
```

【隐式丢失】

> 被隐式绑定的函数会丢失绑定对象，会应用默认绑定，从而把this绑定到全局对象或者undefined上
```
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2,
    foo: foo
}

// 函数别名
var bar = obj.foo;

var a = 'global';

bar(); // 'global'

bar虽然是obj.foo的一个引用，但是，它引用的是foo函数本身，此时其实是不带任何修饰符的函数调用，应用了默认绑定
```

```
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
}
var a = 'global';

setTimeout(obj.foo, 100); // 'global'

```

- 显式绑定
```

```

```
```

- new绑定

#### 3-优先级

#### 4-绑定例外

#### 5-this词法