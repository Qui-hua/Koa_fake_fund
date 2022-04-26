const router = require('koa-router')();

const maillist = require('../controllers/maillistController');
router.prefix('/maillist');



router.get('/list', maillist.list);
router.get('/', maillist.queryByID);
router.post('/', maillist.create);
router.put('/', maillist.updateByID);
router.delete('/', maillist.deleteByID);




module.exports = router;
