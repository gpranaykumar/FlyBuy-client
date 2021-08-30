const { Router } = require('express');
const router = Router();
const itemController = require('../controllers/itemController');

router.get('/items', itemController.getItems);
router.post('/items',itemController.postItem);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;