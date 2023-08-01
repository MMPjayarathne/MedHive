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
        return res.status(400).send( 'Email already exists' );
      }
  
      let user = new User({
        Name: name,
        Email: email,
        PasswordHash: bcrypt.hashSync(password,10),
        authNumber,
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
      res.status(500).send(error.message);
      console.log(error);
    }
  };
  
  const sentAuthMail = async(req,res)=>{

      try{
        const authNumber = req.body.authNumber;
        const email = req.body.email;
        const name = req.body.name;
        const confirmationLink = `http://localhost:3000/signin?active=${authNumber}&email=${encodeURIComponent(email)}`;
                     // Replace this with the actual login page URL
        const transporter = nodemailer.createTransport({
      // Setup your email service configuration here
      service: 'gmail',
      auth: {
        user: 'pramujaya2000@gmail.com', // Replace with your email address
        pass: 'lsdudsnfwvxxgjjf', // Replace with your email password
      },
    });

    const mailOptions = {
      from: 'pramujaya2000@gmail.com', // Replace with your email address
      to: email,
      subject: 'Account Confirmation',
      html: `<html>
      <head>
        <title>Email Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Roboto', sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" style="background-image: url('https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'); background-size: cover; background-position: center;">
          <tr>
            <td align="center" valign="top" style="background-color: rgba(0, 0, 0, 0.5); padding: 20px;">
              <h1 style="font-size: 60px; color: #fff; margin-bottom: 20px;">
                MED<span style="color: #ffb700; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">HIVE</span>
              </h1>
              <p style="font-size: 20px; color: #fff; margin-bottom: 20px;">
                <b>Hello ${name}!</b> Welcome to MEDHIVE
              </p>
              <p style="font-size: 20px; color: #fff; margin-bottom: 20px;">
                <b>Thank you for registering!</b>
              </p>
              <p style="font-size: 20px; color: #fff; margin-bottom: 20px;">
                Please click the following link to confirm your account:
              </p>
              <a href="${confirmationLink}" style="display: inline-block; padding: 12px 20px; font-size: 20px; color: #fff; background: #111; cursor: pointer; text-decoration: none;">
                Confirm Email
              </a>
            </td>
          </tr>
        </table>
      </body>
      </html>`,
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send( 'Email could not be sent');
      }
      console.log('Email sent: ' + info.response);
      res.status(200).send("success");
     
    });


      }catch(error){

        res.status(500).send(error.message);
        console.log(error);

      }
      



    
  }
  

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
    if(!user.isActive){
      return res.status(500).send('The user is not authenticated');
    }
    else if(!bcrypt.compareSync(req.body.password, user.PasswordHash)){
      return res.status(400).send('password is wrong!');
    }
   

    if(user.isActive && bcrypt.compareSync(req.body.password, user.PasswordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({email: user.Email ,id:user.id,name:user.Name, token: token , isAdmin:user.isAdmin}) 
    }

    
}

const activate = async (req, res) => {
  try {
    const email = req.body.email;
    const authNumber = Number(req.body.authNumber);
    //console.log(email);
    //console.log(authNumber);
    // Check if email and authNumber are provided
    if (!email || !authNumber) {
      return res.status(400).json('Email and authentication number are required.');
    }

    const user = await User.findOne({ Email: email });
    const compareAuth = user.authNumber;
    if (!user) {
      return res.status(404).json('User not found for the given email.');
    }
    //console.log("h:",compareAuth);
    if (authNumber === compareAuth) {
      // Find the user by email and update isActive field to true
   
      const updatedUser = await User.findOneAndUpdate(
        { Email: email },
        { isActive: true },
        { new: true }
      );
      return res.status(200).json(updatedUser.Email);
    } else {
      return res.status(400).json('Authentication has expired!');
    }

  } catch (error) {
    return res.status(500).json(error.message);
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
    sentAuthMail,
    
  };