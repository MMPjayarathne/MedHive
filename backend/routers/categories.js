const express = require('express');
const router = express.Router(); 
const categoryController = require('../controller/categoryController')
const upload = require('../middleware/categoryUpload');


router.get(`/`,categoryController.getAllCategory )
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategoryById);
router.delete('/:id', categoryController.deleteCategoryById);
router.post('/', upload.single('image'), categoryController.store);



module.exports = router;