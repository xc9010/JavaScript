### webpack性能优化分析
##### T 20.05.05

```
mms每次构建的时候都很慢，
今天拉了分支进行交互升级并使用hooks来重写，
构建的时候发现有几个文件居然达到了几百KB，
决定使用webpack-bundle-analyzer整体分析一下打包目录结构
```

```
分析的结果出来了
总的大小是16.15MB
index.js有5.23MB
这些就算了，关键是component里面的文件光9百多KB的就有两个，
根据可视化的结果可以看到，这几个组件里面都引用了业务组件，其中一个还引用了moment.js
```

```
import moment from 'moment/moment';

import moment from 'moment';

这两种写法虽然一样，但是打包的结果就不一样，
上面一个就把moment打包进去了，
而下面一种就隔离了出来
因为在externals里面已经配置过了

现在总包大小还有15.64MB了
```

```
那两个9百多KB的我看了下，是直接引用了E-charts导致的，
所以下面的优化方案是隔离出来到vender.js里面
利用CommonsChunkPlugin隔离出公用的组件
```
```
const glob = require('glob');
const temp = glob.sync()
```
[参考打包公共模块](https://segmentfault.com/a/1190000012828879?utm_source=tag-newest)

***

##### T 20.05.14

```
经过几天的折腾，现在包还有10MB的大小，压缩后只有5MB了，
把echarts，还有一个第三方包配成了CDN引入，加上本身HappyPack的使用，打包速度提高了许多


```

