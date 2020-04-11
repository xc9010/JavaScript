### AST（抽象语法树）

> javascript转译、代码压缩、css预处理器、elint，这些大量的插件，都是建立在AST的基础上的

#### 什么是AST
```
It is a hierarchical program representation that presents source code structure 
according to the grammar of a programming language, 
each AST node corresponds to an item of a source code.

它是一个分层的程序表示，
根据编程语言的语法来表示源代码结构，
每个AST节点对应一个源代码项。
```
【[astexplorer](https://astexplorer.net/)】

#### AST关键所在--词法分析和语法分析

- 词法分析
```
词法分析，也叫做扫描scanner

它读取我们的代码，
然后把它们按照预定的规则合并成一个个的标识tokens。
它会移除空白符，注释，等。
最后，整个代码将被分割进一个tokens列表（或者说一维数组）。

const a = 5;
[{value:'const', type: 'keyword'}, {value:'a', type: 'identifier'}, ...]

当词法分析源代码的时候，它会一个一个字母地读取代码， 称之为扫描-scans
当它遇到空格，操作符，或者特殊符号的时候，它会认为一个话已经完成了。


```

- 语法分析

```
语法分析，也解析器

它会将词法分析出来的数组转化成树形的表达形式
同时，验证语法，语法如果有错的话，抛出语法错误。

// [{value:'const', type: 'keyword'}, {value:'a', type: 'identifier'}, ...]
{
'type': 'VariableDeclarator',
'id': {
        type: 'identifier',
        name: 'a',
        ...
      } 
    
}

当生成树的时候，解析器会删除一些没必要的标识tokens（比如不完整的括号）
所以AST不是100%与源码匹配的

- 解析器100%覆盖所有代码结构生成树叫做CST（具体语法树）

```

> const a = 5; // AST 转换结果如下
```
{
  "type": "Program",
  "start": 0,
  "end": 11,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 11,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 11,
          "id": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "start": 10,
            "end": 11,
            "value": 5,
            "raw": "5"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}
```



[参考](https://juejin.im/post/5bfc21d2e51d4544313df666)
