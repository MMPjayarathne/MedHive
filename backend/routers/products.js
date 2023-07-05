const { Category } = require('../models/category');
const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();
const upload = require('../middleware/productUpload');

router.get('/', async (req, res) => {
  const productsList = await Product.find();
  res.send(productsList);
});

router.post(
  '/',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  (req, res) => {
    const product = new Product({
      Name: req.body.name,
      Description: req.body.des,
      Category: req.body.cat,
      Type: req.body.type,
      Brand: req.body.brand,
      Price: req.body.price,
      Category: req.body.category,
      Rating: req.body.rating,
      Quantity: req.body.quantity,
    });

    // Handle image upload for Image1, Image2, Image3, and Image4
    if (req.files && req.files['image1']) {
      product.Image1 = req.files['image1'][0].path;
    }
    if (req.files && req.files['image2']) {
      product.Image2 = req.files['image2'][0].path;
    }
    if (req.files && req.files['image3']) {
      product.Image3 = req.files['image3'][0].path;
    }
    if (req.files && req.files['image4']) {
      product.Image4 = req.files['image4'][0].path;
    }

    product
      .save()
      .then((createdProduct) => {
        res.status(201).json(createdProduct);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          success: false,
        });
        console.log(err);
      });
  }
);

module.exports = router;
