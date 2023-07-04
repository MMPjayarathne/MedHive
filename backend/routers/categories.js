const {Category} = require('../models/category');
const express = require('express');
const router = express.Router(); 


router.get(`/`, async(req,res)=>{
    const categoryList = await Category.find();
    res.send(categoryList)
})

router.post('/', async (req,res)=>{
    let category = new Category({
        Name: req.body.name,
        Image: req.body.image
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})



module.exports = router;