var mysql = require('mysql')
var pool = mysql.createPool({
  host:'39.98.131.44',
  user:'u1',
  password:'ZUCCdjl!',
  database:'JS'
})

var connMethod = function(callback){

}

let query = function( sql, values ) {
  // 返回一个 Promise
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

module.exports = query;