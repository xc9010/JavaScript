### redux-saga

```
redux-saga是一个用于管理应用程序side effect的库
<side effect> 副作用,例如异步获取数据，访问浏览器缓存等

目标是让副作用管理更容易，执行更高效，测试更简单，处理故障更容易
```

```
一个saga像是应用程序中一个单独的线程，它独自负责处理副作用

redux-saga是一个redux的中间件，意味着这个线程可以通过正常的redux action从主应用程序启动，暂停和取消
它能访问完整的redux state，也可以dispatch redux action
```

```
redux-saga使用了ES6的Generator功能，让异步的流程更易于读取，写入和测试

通过这样的方式，这些异步的流程看起来像是标准同步的JavaScript代码
```

#### 1创建一个saga.js

```
export function* helloSaga() {
    console.log('hello sagas')
}
```

如何运行saga呢，
- 创建一个Saga middleware 和要运行的Sagas
- 将这个Saga middleware 连接至Redux store

```
// ...
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

//1.引入sagas
import { helloSaga } from './sagas'

// 2.createSagaMiddleware工厂函数创建saga middleware
const sagaMiddleware = createSagaMiddleware(helloSaga);

// 3.运行之前，必须使用applyMiddleware将middleware连接至store,
const store = createStore(reducer, applyMiddleware(sagaMiddleware))

//4. 使用执行sagaMiddleware的run方法
sagaMiddleware.run(helloSaga)

// rest unchanged
```
到这里一个简单的saga算是执行了


#### 2.发起异步调用

```
const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
  <div>
    <button onClick={onIncrementAsync}>
      Increment after 1 second
    </button>
    {' '}
    <button onClick={onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Clicked: {value} times
    </div>
  </div>
```

```
function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}
```

```
import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'


function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}


function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}
```

```
// ...
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = ...
sagaMiddleware.run(rootSaga)

// ...
```
