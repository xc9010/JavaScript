### parseInt和parseFloat

```
都是用来处理字符串转换的
```

#### 1.parseInt
```
parseInt()函数在转换字符串时，会忽略字符串前面的空格，直到找到第一个非空格字符
- 如果第一个字符不是数字或者负号，return NaN
- 转换空字符串，return NaN
- 转换undefined、null、Boolean、return NaN

如果第一个字符是数字，会继续解析第二个字符，直到解析完所有字符串或遇到一个非数字字符
```
```
parseInt还有基模式，可以把二进制、八进制、十六进制或其他任何进制转换成整数
```
***

#### 2.parseFloat
```
- parseFloat从第一个字符开始解析每一个字符，也是一直解析到字符串末尾，或解析到遇见一个无效的浮点数字字符为止
- 字符串中第一个小数点是有效的，而第二个小数点就是无效的了，后面的也会忽略
- 如果字符串中包含的是一个可解析为正数的数（没有小数点或小数点后都是0）会返回整数
```
***

#### 区别
```
parseFloat所解析的字符串中第一个小数点是有效的，
parseInt遇到小数点会停止解析，因为小数点不是有效的数字字符
```
```
parseFloat始终会忽略前导的零，十六进制格式的字符串始终会转换成0
parseInt的第二个参数可以设置基数，按这个基数的进制转换
```
***

#### 备注
```
let n = '123.879a'

console.log(Number(n))      // NaN
console.log(parseInt(n))    //123
console.log(parseFloat(n))  //123.879
```
```
// 以字符串开头转换都报NaN
let n = 'a123.879a'

console.log(Number(n))      // NaN
console.log(parseInt(n))    //NaN
console.log(parseFloat(n))  //NaN
```

```
[1,2,3].map(parseInt)
[1,2,3].map((v, i) => parseInt(v, i))
// [1, NaN, NaN]
```
