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
