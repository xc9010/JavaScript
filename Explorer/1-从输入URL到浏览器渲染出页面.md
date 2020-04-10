### 浏览器从输入URL到页面渲染的过程

```
1-从浏览器输入url到开启网络请求线程
2-开启请求线程到发出一个完整的HTTP请求
3-从服务器接收到请求到对应后台接收到请求
4-后台和前台的HTTP交互
5-单独拎出来的缓存问题
6-浏览器接收到HTTP数据包后的解析过程
7-css的可视化模型
8-js引擎的解析过程
9-其他问题
```

```
个人的一个理解过程
1，输入URL后会访问到dns服务器进行解析，将域名解析为对应的IP地址，
2，访问IP地址，请求服务器的资源
3，服务器返回资源到前台
4，浏览器进行解析操作，html解析、css解析、js解析
```

#### 1.从浏览器输入url到开启网络请求线程
```
输入URL后会进行解析
URL包括几大部分：
- protocol, 协议头:http,https,ftp
- host, 主机域名或IP
- port，端口号
- path，目录路径
- query，查询参数
- fragment，即#后的hash值，一般用来定位到某个位置

每次网络请求都需要开辟单独的线程进行，所以会新建一个网络线程去处理资源下载
```

#### 2.开启请求线程到发出一个完整的HTTP请求

```
如果输入的URL是域名，就会进行dns解析成IP，流程如下：
1，如果浏览器有缓存，直接使用浏览器缓存，否则使用本机缓存，再没有的话就用host
2，如果本地没有，就向dns服务器请求查询，查到对应的IP

注意，域名查询时有可能是经过了CDN调度器的
另外，dns解析是很耗时的，因此解析域名过多的话会让首屏加载很慢，可以考虑dns-prefetch优化
<link rel="dns-prefetch" href="//domain.com">
```
```
解析好IP地址后就开始HTTP请求了
HTTP的本质就是tcp/ip请求
需要了解3次握手建立连接，4次挥手断开连接
```
```
三次握手
client: hello,你是server么？
server：hello,我是server，你是client么？
client：yes，我是client

完成，接下来开始正式传输数据
```
```
四次挥手
client：我已经关闭向你那边的主动通道了，只能被动接收了
server:收到通道关闭的信息
server:我现在也关闭向你的主动通道了
client：最后收到数据

之后双方无法通信了，除非再次进行三次握手
```

#### 3.从服务器接收到请求到对应后台接收到请求
```
用户发起的请求都指向调度服务器（比如nginx反向代理服务器，控制负载均衡）
然后nginx根据实际的调度算法，分配不同的请求给对应集群中的服务器执行，
然后调度器等待实际服务器的HTTP响应，并反馈给用户
```
```

```





#### 4.后台和前台的HTTP交互

> 前后端交互，HTTP报文作为信息的载体,所以HTTP的报文是很重要的

```
HTTP报文分为：通用头部、请求/响应头部、请求/响应体
```

```
Request Url:请求的web服务器地址
Request Method:请求方式（get/post/options/put/delete...）
Status Code:请求的返回状态码（200，302，404，500）
Remote Address:请求的远程服务器地址（会转为IP）
```

##### 请求响应头部
```
Access-Control-Allow-Headers: 服务器端允许的请求Headers
Access-Control-Allow-Methods: 服务器端允许的请求方法
Access-Control-Allow-Origin: 服务器端允许的请求Origin头部（譬如为*）
Content-Type：服务端返回的实体内容的类型
Date：数据从服务器发送的时间
Cache-Control：告诉浏览器或其他客户，什么环境可以安全的缓存文档
Last-Modified：请求资源的最后修改时间
Expires：应该在什么时候认为文档已经过期,从而不再缓存它
Max-age：客户端的本地资源应该缓存多少秒，开启了Cache-Control后有效
ETag：请求变量的实体标签的当前值
Set-Cookie：设置和页面关联的cookie，服务器通过这个头部把cookie传给客户端
Keep-Alive：如果客户端有keep-alive，服务端也会有响应（如timeout=38）
Server：服务器的一些相关信息
```

##### 请求头部
```
Accept: 接收类型，表示浏览器支持的MIME类型
（对标服务端返回的Content-Type）
Accept-Encoding：浏览器支持的压缩类型,如gzip等,超出类型不能接收
Content-Type：客户端发送出去实体内容的类型
Cache-Control: 指定请求和响应遵循的缓存机制，如no-cache
If-Modified-Since：对应服务端的Last-Modified，用来匹配看文件是否变动，只能精确到1s之内，http1.0中
Expires：缓存控制，在这个时间内不会请求，直接使用缓存，http1.0，而且是服务端时间
Max-age：代表资源在本地缓存多少秒，有效时间内不会请求，而是使用缓存，http1.1中
If-None-Match：对应服务端的ETag，用来匹配文件内容是否改变（非常精确），http1.1中
Cookie: 有cookie并且同域访问时会自动带上
Connection: 当浏览器与服务器通信时对于长连接如何进行处理,如keep-alive
Host：请求的服务器URL
Origin：最初的请求是从哪里发起的（只会精确到端口）,Origin比Referer更尊重隐私
Referer：该页面的来源URL(适用于所有类型的请求，会精确到详细页面地址，csrf拦截常用到这个字段)
User-Agent：用户客户端的一些必要信息，如UA头部等
```


#### 5.单独拎出来的缓存问题

#### 6.浏览器接收到HTTP数据包后的解析过程

>现在资源都给我们了，需要浏览器自己渲染出来了

```
浏览器渲染大致分以下几步：
1，解析HTML，构建DOM树
2，解析CSS，生成CSS规则树
3，合并DOM和CSS，生成render树
4，布局render树，负责各元素尺寸、位置的计算
5，绘制render树，绘制页面像素信息
6，浏览器将各层的信息发送给GPU，GPU会将各层合成，显示在屏幕上
```

-  1.解析HTML，构建DOM
```
转换：将HTML获得的内容转换为单个字符
分词：按HTML规范标准将这些字符转换为不同的标记token，每个token都有自己独特的含义以及规则集
词法分析：分词的结果就是得到一堆token，将他们转换为对象，分别定义他们的属性和规则
DOM构建
```

- 2.生成css规则 -同上
- 3.构建渲染树
```
一般来说，渲染树和DOM树相对应的，但不是严格意义上的一一对应
因为有一些不可见的DOM元素不会插入到渲染树中，如head标签或display:none
```
- 4.渲染
```
1.计算css样式
2.构建渲染树
3.布局，主要定位坐标和大小，是否换行，各种position/overflow/z-index属性
4.绘制，将图像绘制出来

然后js动态处理DOM或css，导致重新布局Layout或渲染Repaint
Layout(Reflow):即回流。一般意味着元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树
Repaint:即重绘。意味着元素发生的改变只是影响了元素的一些外观之类的时候（背景色，边框颜色，文字颜色），此时只需要应用新样式绘制这个元素就可以了

回流的成本开销要高于重绘，而且一个节点的回流会导致子节点以及同级节点的回流，所以优化方案中会提到：尽量避免回流

回流一定伴随着重绘，重绘却会单独出现

```
**注意：改变字体大小会引发回流**

```
引申出一些优化方案：
1.减少逐项修改样式，一次性修改style，或定义class一次性更新
2.避免循环操作DOM
3.避免多次读取offset，或缓存到变量
4.将复杂的元素绝对定位或固定定位，使他们脱离文档流，减少回流成本
```

#### 7.CSS的可视化格式模型

#### 8.JS引擎解析过程

[参考](https://dailc.github.io/2018/03/12/whenyouenteraurl.html)
