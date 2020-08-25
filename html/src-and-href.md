### src and href

> src 和 href都是外部引入资源，js、css、img、html
```
    js: src="index.js"
    css: href="common.css"
    img: src='pic.jpg'
    link: href="www.xc9010.com"
```
#### 主要区别：src用于替代这个元素，href用于建立这个标签与外部资源之间的关系

-   href
```
    <link href="style.css" rel="stylesheet" />
    当浏览器解析到href时候，会继续往后面解析，不会停下来，继续解析
    css会同步执行加载操作
```

-   src
```
    <script src="script.js"></script>
    当浏览器解析到src时候，会停止，直到拿到这个资源，然后注入到script这个标签里面
    这也是为什么script放在body的后面的原因
```