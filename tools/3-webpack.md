### webpack是一个JavaScript应用程序的模块打包器

#### webpack的四个核心概念
- 入口（entry）
- 出口（output）
- 加载器（loaders）
- 插件（plugins）

#### webpack模块
webpack模块能够以各种方式表达它们的依赖关系

#### 依赖图表
```
webpack从命令行或配置文件中定义一个模块列表的开始（package.json中的script）,
从这些入口起点开始，webpack递归地构建一个依赖图表，
这个依赖图表包含着应用程序所需的每个模块，
然后将所有这些模块打包为少量的bundle可以由浏览器加载（通常只有一个）
```

- 1.entry入口文件
> 简单说就是html里面直接引入的，由浏览器触发执行的js文件，其他文件都是由入口文件直接或间接引入的

- 2.loader
> webpack本身只能处理js文件，所以需要loader将一些非js文件转换成js，再require进来

> loader可以串联，并且接收参数

```
module.exports = {
    entry: {
        // index-应用程序
        // vendor-第三方库
        index: ['./src/entry.jsx'],
        vendor: [
            'redux',
            'react-redux',
            'react-router',
            'react-router-redux',
        ],
    },
    output: {
        path: path.resolve(__dirname,'bundle'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', 'css','.json'],
        alias: {
              "TYPE": path.resolve(__dirname, "./node_modules")
        }
    },
    module: {
        preLoaders: [],
        loaders: [
            {test: '', loader:'vue-loader'}
        ],
        postLoaders: []
    },
    plugins: [],
    devtool: 'source-map',
    devServer: {
        hot: true,
        proxy: {}
    }
}
```

- 3.vendor配置：入口配置里的vendor属性配置公共的很少改动的第三方库，结合CommonsChunkPlugin插件可以将第三方库打包到vendor.[hash].js文件，这里的hash是
一个与文件内容有关的哈希码，当文件内容改变时，哈希值会发生变化，而第三方库很少改动，所以对应的哈希值很少改动，在浏览器访问时就可以利用缓存提高访问速度。
而如果将第三方库与业务代码打包到一起，因为业务代码经常改动，会导致对应的哈希值经常变化，这样就会重新加载第三方库，影响加载速度

- 4.externals配置： externals里配置一些不参与打包的第三方库，这样可以提高打包的速度，减小打包后生成的文件的体积，这些不参与打包的库可以在index.ejs里通过script引入一些cdn资源，提高加载速度。

#### webpack插件

```
function MyPlugin(options) {
  // Configure your plugin with options...
}
MyPlugin.prototype.apply = function (compiler) {
  compiler.plugin("compile", function (params) {
    console.log("The compiler is starting to compile...");
  });
  compiler.plugin("compilation", function (compilation) {
    console.log("The compiler is starting a new compilation...");
    compilation.plugin("optimize", function () {
      console.log("The compilation is starting to optimize files...");
    });
  });
  compiler.plugin("emit", function (compilation, callback) {
    console.log("The compilation is going to emit files...");
    callback();
  });
};
module.exports = MyPlugin;
```

- 3.webpack-dev-server
