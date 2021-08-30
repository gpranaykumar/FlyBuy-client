const { Router } = require('express');
const router = Router();
const orderController = require('../controllers/orderController');

router.get('/order/:id', orderController.getOrders);
router.post('/order/:id', orderController.checkout);

module.exports = router;