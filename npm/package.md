### package

> package.json 可以用npm init生成

```
    node.js中，模块是一个框架或库，也是一个node项目
    node.js遵循模块化的架构，当我们创建了一个Node.js项目，意味着创建了一个模块，这个模块的描述文件，被称为package.json

    dependencies-生产环境依赖包列表
    devDependencies-开发环境依赖包列表

```

```
    package-lock.json
    是npm install时候生产的文件，记录当前状态下实际安装的各个 npm package 的具体来源和版本号
    作用是 锁定安装时的包的版本号，并且需要上传到 git，以保证其他人在 npm install 时大家的依赖能保证一致

```

```
    比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x
    比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号
    latest：安装最新版本
```