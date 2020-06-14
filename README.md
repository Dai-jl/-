# JS大作业

[toc]


### 项目说明
项目 是独立开发
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
-  由于纯函数不允许有副作用，因此不允许更改外部数据结构,所以只能不变的方式处理数据。

#### 搜索

​	前端返回关键词列表

​	根据关键词去索引找东西

#### GraphQL

#### 同步

### 解决技术要点说明
- 解决 xxx 问题1， 关键代码与步骤如下
- 解决 xxx 问题2， 关键代码与步骤如下



### 项目分工表格
| 姓名   | 学号     | 班级       | 任务         | 权重 |
| ------ | -------- | ---------- | ------------ | ---- |
| 戴佳莱 | 31703032 | 计算机1701 | 前端 vue     | 1.0  |
| 郑诗雨 | 31701005 | 计算机1701 | 后端 express | 0.9  |

### 自我评估表

| 函数式编程 | xhr fetch api | FRP  | session Storage | 响应式设计(Desktop/Tablet/Mobile) | Other |
| ---------- | ------------- | ---- | --------------- | --------------------------------- | ----- |
|            |               |      |                 |                                   |       |

### 项目自评等级:(1-5)

- 原创性 (1-5)
- 技术难度 (1-5)
- 工作量 (1-5)



### 心得体会
- 大项目开发过程心得
- 本课程建议
> 大项目开发过程心得
遇到哪些困难，经历哪里过程，有哪些收获
本课程建议
课程难度方面，进度方面，课程内容，授课方式等，给出你的意见



## 待办

还能干的有

- 响应式设计

- npm打包

- graphgl