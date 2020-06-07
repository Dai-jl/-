var express = require('express');
var router = express.Router();
// var mysql = require('mysql')
var query = require('../db.js');
/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.send('respond with a resource');
});

var sql = 'select name from ';

var table_name = [['月薪范围','job_sala'],['公司性质','comp_type'],['工作年限','job_year'],['学历要求','job_edu'],['公司规模','comp_size']];

router.get('/',async(req,res)=>{
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
    console.log(data);
    res.json(data);
})

module.exports = router;
