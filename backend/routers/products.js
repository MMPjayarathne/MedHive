const express = require('express');
const router = express.Router();
const upload = require('../middleware/productUpload');
const productController = require('../controller/productController')
const mongoose = require('mongoose');

router.get(`/search`,productController.searchProducts);
router.get('/category',productController.getProductsByCategory);
router.get('/:id',productController.getProductById);
router.put('/:id',productController.updateProductById);
router.put('/updateImage/:id',productController.updateImageById);
router.delete('/:id',productController.deleteProductById);
router.post('/',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),productController.store);
router.get('/', productController.getAllProducts );
router.get(`/get/count`,productController.getProductCount );
router.get(`/get/featured/:count`, productController.getProducts);




module.exports = router;
