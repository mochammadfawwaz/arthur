var express = require('express');
var router = express.Router();

const { index, viewEdit, viewDetailPasien ,actionEdit, actionDelete, data } = require('./controller')

router.get('/', index)
router.get('/edit/:id', viewEdit);
router.get('/detail/:id', viewDetailPasien);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);
router.post('/query', data);

module.exports = router;