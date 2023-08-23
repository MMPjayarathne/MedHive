const { Product } = require('../models/product');
const express = require('express');
const mongoose = require('mongoose');


const getAllProducts = async (req, res) => {
    const productsList = await Product.find();
    res.send(productsList);
  }


const store = (req, res) => {
    const product = new Product({
      Name: req.body.name,
      Description: req.body.des,
      Category: req.body.cat,
      Type: req.body.type,
      Brand: req.body.brand,
      Price: req.body.price,
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

  const getProductById =  async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(500).json({message: 'The product with the given ID was not found.'})
    } 
    res.status(200).send(product);
}

const updateProductById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedData = { ...req.body };
  
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
  
      res.send(updatedProduct);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  };

  const updateImageById = async (req, res) => {
    try {
      const { id } = req.params;
      const { fieldName, imagePath } = req.body;
  
      const updateData = {
        [fieldName]: imagePath,
      };
  
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
  
      res.send(updatedProduct);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  };

  const deleteProductById = (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'The product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "Product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}
  
const getProductCount = async (req, res) => {
    try {
      const productCount = await Product.countDocuments();
  
      res.send({
        productCount: productCount,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  };
  


const getProducts = async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);
  
    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
  }

  
  const searchProducts = async (req, res) => {
    try {
      const searchQuery = req.query.q;
      console.log('hello search');
  
      const query = {
        $text: { $search: `"${searchQuery}"` }
      };
  
      const projection = {
        _id: 1, // Include _id field
        Name: 1,
        Image1:1,
        Price:1,
        Brand:1 // Include Name field
      };
  
      const cursor = await Product.find(query).select(projection);
  
      res.send(cursor);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  };
  
  
  


  const getProductsByCategory= async (req, res) => {
    console.log("Hello")
    const categoryId = req.query.id;
    console.log(req.query.id)

    try {
      const productsList = await Product.findByCategoryId(categoryId);
      res.send(productsList);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error. Try again later");
    }
  };
  
  
  
  
  module.exports = {
    getAllProducts,
    store,
    getProductById,
    updateProductById,
    updateImageById,
    deleteProductById,
    getProductCount,
    getProducts,
    searchProducts,
    getProductsByCategory,
  };