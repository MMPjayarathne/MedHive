const express = require('express');
const router = express.Router(); 
const cartController = require('../controller/cartController')


router.get(`/`,cartController.getCartByUserId );
router.post('/addCart', cartController.store);




module.exports = router;