var express = require('express')
var mysql = require('../util/mysql')

var router = express.Router()

// 指定id的单个景点数据
router.route('/:id')
  .get(function (request, response) {
    mysql.pool.getConnection(function (error, connection) { if (error) {
        console.error(error)
        response.send({message: 'ERROR_ON_CONNECT_TO_DATABASE'})
        return
      }
      let sql = `
      select id, c.v as category, r.v as region, season, name, location, intro
      from scenery as s, (
        select k, v from kv where c = '景点类别'
      ) as c, (
        select k, v from kv where c = '景点地区'
      ) as r
      where s.id = ?
        and c.k = s.category_id
        and r.k = s.region_id
      `
      let param = [parseInt(request.params.id)]
      connection.query({sql: sql, values: param}, function (error, data) {
        connection.release()
        if (error) {
          console.error(error)
          response.send({message: 'QUERY_FAILED'})
          return
        }
        response.send(data)
      })
    })
  })

// 指定类别的所有景点
router.route('/region/:id')
  .get(function (request, response) {
    mysql.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error)
        response.send({message: 'ERROR_ON_CONNECT_TO_DATABASE'})
        return
      }
      let sql = `
      select id, c.v as category, r.v as region, season, name, location, intro
      from scenery as s, (
        select k, v from kv where c = "景点类别"
      ) as c, (
        select k, v from kv where c = "景点地区" and k = ?
      ) as r
      where c.k = s.category_id
        and r.k = s.region_id
      `
      let param = [parseInt(request.params.id)]
      connection.query({sql: sql, values: param}, function (error, data) {
        connection.release()
        if (error) {
          console.error(error);
          response.send({message: 'QUERY_FAILED'})
          return
        }
        response.send(data)
      })
    })
  })

// 指定类别的所有景点
router.route('/category/:id')
  .get(function (req, res) {
    mysql.pool.getConnection(function (error, connection) {
      if (error) {
        console.log(error)
        res.send({message: 'ERROR_ON_CONNECT_TO_DATABASE'})
        return
      }
      let sql = 'select id, c.v as category, r.v as region, season, name, location, intro '
          + 'from scenery s, ('
          + 'select k, v from kv where c = "景点类别" and k = ?'
          + ') as c, ('
          + 'select k, v from kv where c = "景点地区"'
          + ') as r '
          + 'where r.k = s.region_id '
          + 'and c.k = s.category_id'
      let param = [parseInt(req.params.id)]
      connection.query({sql: sql, values: param}, function (error, data) {
        connection.release()
        if (error) {
          console.log(error)
          res.send({message: 'QUERY_FAILED'})
          return
        }
        res.send(data)
      })
    })
  })

module.exports = router
