const {Category} = require('../models/category');
const express = require('express');

const getAllCategory = async(req,res)=>{
    const categoryList = await Category.find();
    res.send(categoryList)
}


const store = async (req, res) => {
    try {
      let category = new Category({
        Name: req.body.name,
      });
  
      if (req.file) {
        category.Image = req.file.path;
      }
  
      category = await category.save();
  
      if (!category) {
        return res.status(400).send('The category could not be created!');
      }
  
      res.send(category);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  };


const getCategoryById =  async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(category);
}

const updateCategoryById = async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
  
      if (!name) {
        return res.status(400).send('Name is required');
      }
  
      let updatedData = {
        Name: name,
      };
  
      if (req.file) {
        updatedData.Image = req.file.path;
      }
  
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).send('Category not found');
      }
  
      res.send(updatedCategory);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  };
  
  
const deleteCategoryById = (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'The category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "Category not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}
  
module.exports = {
    getAllCategory,
    store,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
  };