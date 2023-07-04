const { Category } = require('../models/category');
const {Product} = require('../models/product');
const express = require('express');
const router = express.Router(); 


router.get(`/`, async(req,res)=>{
    const productsList = await Product.find();
    res.send(productsList)
})
router.post(`/`,(req,res)=>{
    const product = new Product({
        Name : req.body.name,
        Description: req.body.des,
        Category: req.body.cat,
        Type: req.body.type,
        Image1: req.body.image1,
        Image2: req.body.image2,
        Brand: req.body.brand,
        Price: req.body.price,
        Category: req.body.category,
        Rating: req.body.rating,
        Quentity: req.body.quentity

    })
    product.save().then((createdProduct=>{res.status(201).json(createdProduct)})).catch((err)=>{
        res.status(500).json({
            error:err,
            success: false
        })
        console.log(err)
    })


})

module.exports = router;