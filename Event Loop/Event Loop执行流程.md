### Event Loop
**javascript是一门单线程的语言，它的异步和多线程的实现是通过Event Loop事件循环机制来实现的**

Event Loop由三个部分组成
- 调用栈 - call stack
- 消息队列 - Message Queue
- 微任务队列 - Microtask Queue

```
Event Loop开始时候会从全局栈开始，一行一行执行，遇到函数调用会压入调用栈，被压入的函数叫做帧（Frame）
```

```
异步调用例如ajax、fetch、setTimeout、setInterval
这些会压入消息队列中，消息队列会在调用栈清空的时候执行
```

```
使用promise asyac await这些异步操作会加入到微任务队列中，会在调用栈清空的时候立即执行，最后再执行消息队列
```
