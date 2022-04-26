const router = require('koa-router')();

const order = require('../controllers/orderController');
router.prefix('/order');



router.get('/list', order.list);
router.get('/', order.queryByID);
router.post('/', order.create);
router.put('/', order.updateByID);
router.delete('/', order.deleteByID);




module.exports = router;
