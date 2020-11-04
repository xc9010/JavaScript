
/**
 * promise 生成器
 * 将一个对象包装成promise对象
 * @param {*} fn 
 * @param {*} val 
 */
const newPromise = function (fn, param) {
    return new Promise((resolve) => {
        const res = fn(param)
        if (res) resolve(res)
        reject('error')
    })
}

const add = function (val) {
    return val + 'W';
};

const np = newPromise(add, 12)

np.then(res => console.log(res))
