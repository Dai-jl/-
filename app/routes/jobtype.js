var express = require('express');
var router = express.Router();
// var mysql = require('mysql')
var query = require('../db.js');
var redis = require('redis')
/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.send('respond with a resource');
});

var client = redis.createClient(6379,'39.98.131.44')
client.on('error',function(err){
    console.log('error'+err)
})

var sql = 'select name from ';

var table_name = [['月薪范围','job_sala'],['公司性质','comp_type'],['工作年限','job_year'],['学历要求','job_edu'],['公司规模','comp_size']];

//查询数据
async function getdata(callback){
    let data = [];
    for( t of table_name){
        let temp = {};
        temp['type'] = t[0];
        let str = sql + t[1];
        console.log(str)
        const rows = await query(str);
        let arr = []
        for(row of rows){
            arr.push(row.name);
        }
        temp['index'] = arr;
        data.push(temp);
    }
    callback(data)
}

//存储到redis
function redis_get_string(data) { 
    client.set('comptype',JSON.stringify(data),function(err, res) 
    { 
        client.get('comptype', function(err, res) {
            // console.log(res); 
        }); 
    })
}

getdata(redis_get_string)

router.get('/',(req,res)=>{
    let data
    client.get('comptype',function(err,value){
        data = JSON.parse(value) 
        console.log(data);
        res.send(data);
    })
})

module.exports = router;
