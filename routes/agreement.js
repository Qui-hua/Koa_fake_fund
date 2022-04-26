const router = require('koa-router')();

const agreement = require('../controllers/agreementController');
router.prefix('/agreement');



router.get('/list', agreement.list);
router.get('/', agreement.queryByID);
router.post('/', agreement.create);
router.put('/', agreement.updateByID);
router.delete('/', agreement.deleteByID);




module.exports = router;
