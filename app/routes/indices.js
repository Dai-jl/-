var express = require('express');
var router = express.Router();
// var mysql = require('mysql')
var query = require('../db.js');
/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.send('respond with a resource');
});

function formatIndex(data){
	console.log(data)
	var res = [];
	for (i in data){
		var t={};
		t.type = i;
		t.index = data[i];
		res.push(t);
	}
	console.log(res);
	return res;
}

var sql = 'select type_name,index_name from job_type t, job_index i where i.type_id = t.id'


router.get('/',async(req,res)=>{
	let data = {};
	const rows = await query(sql);
	for(row of rows){
	  	if(!data[row.type_name]){
	  		data[row.type_name] = [];
	  	}
	  	data[row.type_name].push(row.index_name);
	}
	console.log(data);
	data = formatIndex(data);
	console.log(data);
	res.json(data);
})

module.exports = router;
