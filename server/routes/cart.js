const { Router } = require('express');
const router = Router();
const cartController = require('../controllers/cartController');

router.get('/cart/:id', cartController.getCartItems);
router.post('/cart/:id', cartController.addCartItem );
router.delete('/cart/:userId/:itemId', cartController.deleteCartItem);

module.exports = router;