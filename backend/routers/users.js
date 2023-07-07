const express = require('express');
const router = express.Router(); 
const userController = require('../controller/userController')
const upload = require('../middleware/userUpload');


router.post('/login',userController.login)
router.get(`/`,userController.getAllUsers)
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);
router.post('/', upload.single('image'), userController.store);



module.exports = router;