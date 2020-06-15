var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var query = require('../db.js');
var md5 = require('md5')

/* GET users listing. */
// router.get('/test', function(req, res, next) {
//   res.send('respond with a resource');
// });

//test sessions
router.get('/test',function(req,res){
	
	if(req.session.phone){
		res.json({"code":200,"msg":"ok"})
	}else{
		res.json({"code":200,"msg":"no"})
	}
})


//注册
router.post('/',async(req,res)=>{
	var sql = 'select * from user where phone = ?'
	var sql2 = 'insert into user values(?,?)'	
	var data = {}
	data.phone = req.body.phone
	data.password = req.body.password
	// console.log(data);
	const u = await query(sql,data.phone);
	console.log(u)
	if(u === []){
		res.json({"code":300,"msg":"该手机号已被注册"})
	}
	else{
		await query(sql2,[data.phone,data.password]);
	}
	req.session.userinfo = data.phone
	res.json({"code":200,"msg":"注册成功"})
})
// //登陆
router.post('/login',async(req,res)=>{
	var sql = 'select * from user where phone = ?'
	var data = {}
	data.phone = req.body.phone
	data.password = req.body.password
	// console.log(data);
	const u = await query(sql,data.phone);
	if(u === []){
		res.json({"code":300,"msg":"该手机号未被注册"})
	}
	else if(md5(u[0].password) !== data.password){
		console.log(u[0].password)
		res.json({"code":300,"msg":"密码错误"})
	}
	req.session.phone = data.phone
	req.session.save();
	res.json({"code":200,"msg":"登录成功"})
})
//登出
router.get('/logout',function(req,res,next){
	delete req.session.user;
	return res.json({"code":200,"msg":'登出成功'})
})
// //改密码
// router.put('/{id}',async(req,res) => {
	
// })
// //注销用户
// router.delete('/{id}',async(req,res)=> {
	
// })

module.exports = router;
