var express = require('express');
var router = express.Router();
// var mysql = require('mysql')
var query = require('../db.js');
/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.send('respond with a resource');
});
var R = require('ramda')

// function formatIndex(data){
// 	var res = [];
// 	for (i in data){
// 		var t={};
// 		t.type = i;
// 		t.index = data[i];
// 		res.push(t);
// 	}
// 	return res;
// }

var sql = 'select type_name,index_name from job_type t, job_index i where i.type_id = t.id'

const byTypeName = R.groupBy(function (row){
    return row.type_name;
})
var result = []
function deal (value,key){
    result.push({"type":key,"index":R.pluck('index_name')(value)})
}
router.get('/',async(req,res)=>{
	// let data = {};
	const rows = await query(sql);
	//before:
	// for(row of rows){
	//   	if(!data[row.type_name]){
	//   		data[row.type_name] = [];
	//   	}
	//   	data[row.type_name].push(row.index_name);
	// }
	// data = formatIndex(data);
	//after:
	R.forEachObjIndexed(deal,byTypeName(rows))
	res.json(result);
})

module.exports = router;
