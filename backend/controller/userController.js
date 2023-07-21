const {User} = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const getAllUsers = async(req,res)=>{
    const userList = await User.find().select('-PasswordHash');
    res.send(userList)
}

const store = async (req, res) => {
    try {
      const { name, email, password,authNumber } = req.body;

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
  
      // Send email with confirmation button
    const confirmationLink = `http://localhost:3000/signin?active=${authNumber}`; // Replace this with the actual login page URL
    const transporter = nodemailer.createTransport({
      // Setup your email service configuration here
      service: 'gmail',
      auth: {
        user: 'pramujaya2000@gmail.com', // Replace with your email address
        pass: 'fdbxiycncqlsnbrt', // Replace with your email password
      },
    });

    const mailOptions = {
      from: 'pramujaya2000@gmail.com', // Replace with your email address
      to: email,
      subject: 'Account Confirmation',
      html: `<p>Hello ${name}, Welcome to MEDHIVE</p><p>Thank you for registering! Please click the following link to confirm your account:</p><a href="${confirmationLink}">Confirm Account</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Email could not be sent',
          success: false,
        });
      }
      console.log('Email sent: ' + info.response);
      res.send(user);
    });
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
       
        res.status(200).send({email: user.Email ,id:user.id,name:user.Name, token: token , isAdmin:user.isAdmin}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
}

const activate = async (req, res) => {
  try {
    const email = req.body.email;

    // Find the user by email and update isActive field to true
    const updatedUser = await User.findOneAndUpdate(
      { Email: email },
      { isActive: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found for the given email.' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};


const getUserIdByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ Email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found for the given email.' });
    }

    res.status(200).json({ userId: user.id }); // Make sure to send userId in the response
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the user.', error: error.message });
  }
};


module.exports = {
    getAllUsers,
    store,
    getUserById,
    deleteUserById,
    updateUserById,
    login,
    activate,
    getUserIdByEmail,
    
  };