const router = require('koa-router')();

const deal = require('../controllers/dealController');
router.prefix('/deal');



router.get('/list', deal.list);
router.get('/', deal.queryByID);
router.post('/', deal.create);





module.exports = router;
