var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var query = require('../db.js');


/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register',async(req,res)=>{
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
	res.json({"code":200,"msg":"注册成功"})
})

router.post('/login',async(req,res)=>{
	var sql = 'select * from user where phone = ?'
	var data = {}
	data.phone = req.body.phone
	data.password = req.body.password
	// console.log(data);
	const u = await query(sql,data.phone);
	console.log(u)
	if(u === []){
		res.json({"code":300,"msg":"该手机号未被注册"})
	}
	else if(u[0].password !== data.password){
		console.log(u[0].password)
		res.json({"code":300,"msg":"密码错误"})
	}
	res.json({"code":200,"msg":"登录成功"})
})

module.exports = router;
