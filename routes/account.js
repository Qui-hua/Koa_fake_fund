const router = require('koa-router')();

const account = require('../controllers/accountController');
router.prefix('/account');



router.get('/list', account.list);
router.get('/', account.queryByID);
router.post('/', account.create);
router.put('/', account.updateByID);
router.delete('/', account.deleteByID);




module.exports = router;
