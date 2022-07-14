var express = require('express');
var router = express.Router();
const { query, rekam } = require('./controller')

/* GET home page. */
router.post('/query', query);
router.get('/pasien', rekam);

module.exports = router;
