const {User} = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getAllUsers = async(req,res)=>{
    const userList = await User.find().select('-PasswordHash');
    res.send(userList)
}

const store = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ Email: email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      let user = new User({
        Name: name,
        Email: email,
        PasswordHash: bcrypt.hashSync(password,10),
      });
  
      if (req.file) {
        user.Image = req.file.path;
      }
  
      user = await user.save();
  
      if (!user) {
        return res.status(400).send('The user could not be created!');
      }
  
      res.send(user);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
      console.log(error);
    }
  };
  

  const getUserById =  async(req,res)=>{
    const user = await User.findById(req.params.id).select('-PasswordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
}

const deleteUserById = (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'The User is removed!'})
        } else {
            return res.status(404).json({success: false , message: "User is not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}

const updateUserById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedData = { ...req.body };
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
  
      res.send(updatedUser);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  };


const login =  async (req,res) => {
    const user = await User.findOne({Email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.PasswordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
}


module.exports = {
    getAllUsers,
    store,
    getUserById,
    deleteUserById,
    updateUserById,
    login,
    
  };