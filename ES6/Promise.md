### Promise

```
Promise是异步编程的一种解决方案，比传统的异步解决方案【回调函数】和【事件】更合理、更强大
```

```
new Promise(请求1)
    .then(请求2(请求结果1))
    .then(请求3(请求结果2))
    .then(请求4(请求结果3))
    .then(请求5(请求结果4))
    .catch(处理异常(异常信息))
```

```
function fo(resolve, reject) {
    let a = 3;
    console.log('begin')
    setTimeout(() => {
        console.log('settimeout')
        if (a === 2) {
            return resolve('suc') // 类似api中的Promise.resolve(value)
        } else {
            return reject('error') // 类似api中的Promise.reject(value)
        }
    }, 1000)
    console.log('end')
}

const p1 = new Promise(fo); // 生成promise的实例
console.log(
    p1.then(
        (v) => console.log(v), // 第一个参数获取resolve的结果
        (e) => console.log(e)) // 第二个参数获取reject的结果
    .catch(err => console.log(err)) // catch 用来捕获异常，err是catch注册之前的回掉抛出的异常信息
)
```
#### Promise - API

- Promise.prototype.then
- Promise.prototype.catch
- Promise.resolve(value)
- Promise.reject(value)


- Promise.all
```
多个promise任务同时执行
如果全部成功执行，则以数组的方式返回所有promise任务的执行结果；
如果有一个rejected，则只返回rejected任务的结果
```

- Promise.race
```
多个promise任务同时执行
返回最先执行结束的prmise结果，不管这个promise的结果是成功还是失败
```

#### promise 使用总结

- 首先初始化一个Promise对象，可以通过两种方式创建，都会返回一个Promise对象
    - 1、new Promise(fn)
    - 2、Promise.resolve(fn)
- 然后调用上一步返回的promise对象的then方法，注册回掉函数
    - then中的回掉函数可以有一个参数，也可以不带参数。如果then中的回掉函数依赖上一步的返回结果，那么要带上参数
    ```
    new Promise(fn)
        .then(fn1(value) {
            // 处理value
        })
    ```
- 通常注册catch异常处理函数，处理前面回掉中可能抛出的异常


#### Promise与事件循环

```
Promise 在初始化时，传入的函数是同步执行的，然后注册then回调。
注册完之后，继续往下执行同步代码，在这之前，then中回调不会执行
同步代码块执行完毕后，才会在时间循环中检测是否有可用的promise回调
有就执行，没有就继续下一个事件循环
```

#### 执行顺序

- 自身

```
let promise = new Promise(function(resolve, reject) {
    console.log(1)
    resolve();
})
promise.then(() => {
    console.log(2)
})
console.log(3)

// 执行顺序为1、3、2
```

- 与定时器混合
```
let promise = new Promise(function(resolve, reject) {
    console.log(1)
    resolve();
})
setTimeout(() => {
    console.log(2)
},0)
promise.then(() => {
    console.log(3)
})
console.log(4)

// 执行顺序为1、4、3、2

// 当promise执行时候，先执行同步的任务，打印出1，
// 然后执行4，这时候执行完同步任务了，
// 再去微任务队列执行promise的then，打印3，
// 最后去事件队列执行setTimeout,打印2
```