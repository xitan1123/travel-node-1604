var express = require('express')
var router = express.Router()

router.route('/browse/:category/:iid')
  .get(function (req, res) {
    console.log(req.params.category)
    console.log(req.params.iid)
    res.send({message: 'OK'})
  })

module.exports = router
