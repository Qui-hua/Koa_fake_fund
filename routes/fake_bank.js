const router = require('koa-router')();

const fake_bank = require('../controllers/fake_bankController');
router.prefix('/fake_bank');


router.get('/', fake_bank.queryByID);
router.put('/buy', fake_bank.buy);




module.exports = router;
