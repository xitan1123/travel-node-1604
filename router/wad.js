var express = require('express')
var mysql = require('../util/mysql')

var router = express.Router()

router.route('/recommand/:counter')
  .get(function (req, res) {
    mysql.pool.getConnection(function (error, connection) {
      if (error) {
        res.send({message: 'ERROR_ON_CONNECT_TO_DATABASE'})
        return
      }
      let sql = 'select id, name, alias, taste, area, history, propose, intro, pic_1, pic_2 '
          + 'from wine_and_dine '
          + 'order by id desc '
          + 'limit ?'
      let param = [parseInt(req.params.counter), ]
      connection.query({
        sql: sql,
        values: param
      }, function (error, data) {
        connection.release()
        if (error) {
          console.log(error)
          res.send({message: 'ERROR', error: 'QUERY_FAILED'})
          return
        }
        res.json(data)
      })
    })
  })

module.exports = router
