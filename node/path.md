### path

> webpack里面常用到，基于node环境

```
var path = require("path")     //引入node的path模块

path.resolve('/foo/bar', './baz')           // returns '/foo/bar/baz'
path.resolve('/foo/bar', 'baz')             // returns '/foo/bar/baz'
path.resolve('/foo/bar', '/baz')            // returns '/baz'
path.resolve('/foo/bar', '../baz')          // returns '/foo/baz'
path.resolve('home','/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','./foo/bar', '../baz')  // returns '/home/foo/baz'
path.resolve('home','foo/bar', '../baz')    // returns '/home/foo/baz'
```

```
从后往前拼接

需要注意的是：如果在处理完所有给定的 path 片段之后还未生成绝对路径，则再加上当前工作目录。
```

#### 实例
```
path: path.resolve(__dirname, 'bundle'),

Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径，
所以当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2 。

```
