var express = require('express')

var router = express.Router()

router.route('/')
  .get(function (request, response) {
    response.send({message: 'OK', counter: 1})
  })

module.exports = router
