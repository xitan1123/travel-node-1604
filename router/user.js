var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('../util/mysql.js');

// var multer = require('multer');

// var upload = multer()

// router.use(function timeLog(req, res, next) {
//   console.log('[info] Time:', Date.now());
//   next();
// });

router.route('/check')
  .get(function (req, res) {
    console.log('Cookies: ', req.cookies)
    console.log('Cookies: ', req.signedCookies)
    res.send({message: 'OK', counter: 1})
  })

// 修改密码
router.route('/change-password')
  .post(function (req, res) {
    res.send({message: 'NOT_FINISHED'})
  })

// 修改昵称
router.route('/change-nickname')
  .post(function (req, res) {
    res.send({message: 'NOT_FINISHED'})
  })

module.exports = router
