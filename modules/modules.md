### 模块化开发

- commonjs
    ```
    CommonJS主要用于服务器Node.js编程
    - 暴露模块
        module.exports=value或者module.xxx=value
    - 引入模块
        require(xxx)，如果引入的模块是第三方模块，那么xxx为模块名。如果引入的模块是自定义模块，那么xxx为文件路径。
    ```
- CMD
    ```
    CMD全称是Common Module Definition，它整合了CommonJS和AMD规范的特点，专门用于浏览器端，异步加载模块
    ```
- AMD

- ES6

    ```
    ES6模块规范的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系。而CommonJS和CMD，都只能在运行时确定依赖。

    - 暴露接口
       export命令用于规定模块的对外接口，基本语法为export xxx，暴露的接口可以是对象、函数、基本类型变量。另外可以使用export default xxx为模块指定默认输出，因为很多时候用户不知道要加载的模块的属性名。
    - 调用模块
       import命令用于输入其他模块提供的功能，基本语法为import xxx from xxx，其中第一个xxx为引入的模块的属性名，第二个xxx为模块的位置。如果不理解没关系，后面我们将看到具体的案例。
    ```