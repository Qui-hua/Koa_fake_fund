const router = require('koa-router')();

const fund = require('../controllers/fundController');
router.prefix('/fund');



router.get('/list', fund.list);
router.get('/', fund.queryByID);
router.post('/', fund.create);
router.put('/', fund.updateByID);
router.delete('/', fund.deleteByID);




module.exports = router;
