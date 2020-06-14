# JS



#### 运行

- 用node-dev 实现热部署 `npm run dev`

#### 框架

- 前端 vue.js
- 后端 express
- 数据库 mysql

#### restful API

- /indices

  ![](img/indices.jpg)

- /jobtype

  ![](img/jobtype.jpg)

- /users

  - #登录	预定session、密码加密
  - POST /users #注册
  - PUT /users/:id #改密码
  - DELETE /users/:id #注销用户
#### 正则表达式

- 判断密码强弱

```js
var s1 = "123456"
var s2 = "jjjj5678"
var s3 = "12&*(3456j+))(*&"


function testPassWord(password) {
	var res = 0;
	var patterns = [/\d+/,/[.*+?^${}()|[\]\\]+/,/[a-zA-Z]/]
	for(i of patterns){
		if(i.test(password)){
			res++;
		}
	}
	return res
}
console.log(testPassWord(s1));//-> 1
console.log(testPassWord(s2));//-> 2
console.log(testPassWord(s3));//-> 3
```

#### NPM

#### Ramda

​	test——正则表达式检验

#### GraphQL

#### Session

#### 搜索联想DOM

#### 回调函数

```js
router.get('/',(req,res)=>{
    let data
    client.get('comptype',function(err,value){
        data = JSON.parse(value) 
        console.log(data);
        res.send(data);
    })
    console.log(data) //结果为空，回调函数中不能改变外部变量
})
```

​	是因为异步调用，回调函数的赋值语句还没执行，结果就输出了。

​	即使使用了async await，还是无效，为什么呢？？？？？？？？？？？？

#### 搜索

​	前端返回关键词列表

​	根据关键词去索引找东西