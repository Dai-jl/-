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

//登陆
router.post('/',async(req,res)=>{
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
router.delete('/',function(req,res,next){
    delete req.session.user;
    return res.json({"code":200,"msg":'登出成功'})
})

module.exports = router;
