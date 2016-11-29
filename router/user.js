var express = require('express')
var router = express.Router()

// var multer = require('multer');

// var upload = multer()

// router.use(function timeLog(req, res, next) {
//   console.log('[info] Time:', Date.now());
//   next();
// });

router.route('/check')
  .get(function (req, res) {
    res.send({message: 'OK', counter: 1})
  })

module.exports = router