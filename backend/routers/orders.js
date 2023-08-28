const Orders = require('../models/orders');
const express = require('express');
const router = express.Router(); 
const upload = require('../middleware/prescriptionUpload');
const mongoose = require('mongoose');
const orderController = require('../controller/orderController');

router.post('/',
  upload.fields([
    { name: 'prescription1', maxCount: 1 },
    { name: 'prescription2', maxCount: 1 },
    { name: 'prescription3', maxCount: 1 },
  ]),orderController.store);
router.get('/', orderController.getOrderByUserId);



module.exports = router;