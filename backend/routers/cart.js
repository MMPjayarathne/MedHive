const express = require('express');
const router = express.Router(); 
const cartController = require('../controller/cartController')


router.get(`/`,cartController.getCartByUserId );
router.post('/addCart', cartController.store);
router.post('/deleteCartItem',cartController.deleteCartItemByUserId);
router.post('/deleteCart',cartController.deleteCartByUserId);




module.exports = router;