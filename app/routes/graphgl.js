var express = require('express');
var router = express.Router();
// var mysql = require('mysql')
var query = require('../db.js');
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
var R = require('ramda')

/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.send('respond with a resource');
});
var benefit = ['五险一金','带薪年假','弹性工作','年终奖金','餐饮补贴','六险一金','免费三餐','租房补贴','带薪休假','下午茶','扁平管理','绩效奖金','高温补贴','节日福利','餐补','免费班车','员工旅游','通讯补贴','交通补贴','专业培训','补充医疗保险','补充公积金','定期体检','出国机会','周末双休','工作氛围好']


const schema = buildSchema(`
    type Job {
        name: String
        company: String
        salary: String
        require: String
        addr: String
        welfare:[String]
    }
    type Index{
        type: String
        index: [String]
    }
    type Query {
        highPay(limit:Int):[Job]
        indices:[Index]
    }
`)

async function getJob() {
    var sql = 'select job_name name,comp_name company,sala salary,job_edu.name `require`,job_place.city addr,benefit from job,job_place,job_edu WHERE job.job_place = job_place.id AND job.edu_id = job_edu.id';
    var data = []
    const rows = await query(sql)
    // console.log(rows)
    data = rows.map((x)=>{
        var w = x.benefit.split(",")
        x.welfare = w.map((a)=>benefit[a],w)
        return x
    },rows)
    // console.log(data)
    return data

}



const byTypeName = R.groupBy(function (row){
    return row.type_name;
})
var result = []
function deal (value,key){
    result.push({"type":key,"index":R.pluck('index_name')(value)})
}
async function getIndex(){
    var sql = 'select type_name,index_name from job_type t, job_index i where i.type_id = t.id'
    const rows = await query(sql);
    R.forEachObjIndexed(deal,byTypeName(rows))
    return result
}
// 定义查询所对应的 resolver，也就是查询对应的处理器
const root = {
    highPay:async ({limit:l}) =>{
        var j = await getJob()
        return j.slice(0,l)
    },
    indices:async() =>{
        var i = await getIndex()
        return i
    }
}

module.exports = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
})

// query{
  
//   highPay(limit:9) {
//     name
//     company
//     salary
//     require
//     addr
//     welfare
//   }
// }

// query{
//   indices {
//     type
//     index
//   }
// }