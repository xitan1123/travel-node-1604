var express = require('express')
var router = express.Router()

router.route('/recommand/:counter')
  .get(function (req, res) {
    console.log('123')
    console.log(req.params)
    console.log(req.params.counter)
    res.send({message: 'OK'})
  })

module.exports = router
