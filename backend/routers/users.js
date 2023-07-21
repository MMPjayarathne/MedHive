const express = require('express');
const router = express.Router(); 
const userController = require('../controller/userController')
const upload = require('../middleware/userUpload');



router.get(`/`,userController.getAllUsers)
router.get('/:id',userController.getUserById);
router.get('/register/get',userController.getUserIdByEmail);
router.put('/:id',userController.updateUserById);
router.put('/register/auth',userController.activate);
router.delete('/:id',userController.deleteUserById);
router.post('/register', upload.single('image'), userController.store);
router.post('/login',userController.login)


module.exports = router;