### Babel原理

> 编译器原理：将源代码按照一定的转换规则转换成目标代码

> Babel就是JavaScript编译器，将es6的代码转换为向后兼容的JavaScript语法
> 将jsx语法转换成JavaScript语法

```
Babel的主要处理步骤是：解析(parse)、转换(transform)、生成(generate)
```
-  解析(parse)

```
    将代码解析成抽象语法树(AST)，每个js引擎都有自己的AST解析器，Babel是通过Babylon实现的
    解析过程中有两个阶段：语法分析和词法分析
    
    词法分析：会把字符串形式的代码转换为令牌（tokens）流，令牌类型于AST中的节点
    
    语法分析：会把令牌转换成AST的形式，这个阶段也会把令牌中的信息转换成AST的表述结构
```

- 转换(transform)
```
    Babel在这个阶段接收到AST并通过babel-traverse对其进行深度优先遍历，在此过程中对节点进行添加、更新及移除操作
```

- 生成(generate)
```
    将经过转换的AST通过babel-generator再转换成js代码，过程就是深度优先遍历整个AST，然后构建可以表示转换后代码的字符串
```

- 【[AST原理](https://juejin.im/post/5bfc21d2e51d4544313df666)】
