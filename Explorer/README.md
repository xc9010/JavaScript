### 记录

- 1，刷新和重输入URL有什么区别
    ```
        刷新是触发了location.href.reload()事件

        URL重新回车是location.href = location.href事件
        问题：假如有锚点的话，页面并不会刷新，而是直接定位到锚点的位置
    ```