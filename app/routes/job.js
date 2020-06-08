var express = require('express');
var router = express.Router();
// var mysql = require('mysql')
var query = require('../db.js');
/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.send('respond with a resource');
});

var sql = 'select job_name,comp_name,job_place.city,sala,up_time from job left join job_place on job.job_place = job_place.id';

var table_name = [['月薪范围','job_sala'],['公司性质','comp_type'],['工作年限','job_year'],['学历要求','job_edu'],['公司规模','comp_size']];

router.get('/',async(req,res)=>{
   
    var data = []
    const rows = await query(sql);
    console.log(rows)
    for(var i = 0;i<rows.length;i++){
        rows[i].up_time = rows[i].up_time.toLocaleDateString()
        data.push(rows[i])
    }
    res.json(data)
    
})

module.exports = router;
