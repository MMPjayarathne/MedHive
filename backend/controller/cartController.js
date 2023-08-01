const {Cart} = require('../models/cart');
const {User} = require('../models/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const { CartItems } = require('../models/cartItems');
const { Product } = require('../models/product');
require('dotenv').config();
const { secret, API_URL } = process.env;
const mongoose = require('mongoose');

const getCartByUserId = async(req,res)=>{
    try{
        const decodedUser = jwt.verify(req.body.token, secret);
        const cart = await Cart.findByUser(decodedUser.userId);
        if(cart){
            res.send(cart);
        }
        else{
            res.status(400).send("There is a server issue. Try again later");
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send("Invalid Authentication")
    }
    
}

const store = async(req,res)=>{
    try{
        const decodedUser =  jwt.verify(req.body.token, secret);
        console.log(decodedUser);
        const userId = decodedUser.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const cart = await Cart.findByUser(userId);
        console.log("the cart" , cart)
        if(cart){ 
            console.log("Hello")

            let cartItems = new CartItems({
                Product:productId,
                Quantity:quantity,

              });
            cartItems = await cartItems.save();

            
            const totalPrice = cart.TotalPrice || 0;
            

            const product = await Product.findById(productId);
        
            const newTotal = totalPrice + (req.body.quantity * product.Price);
           // console.log(" quentity : ",req.body.Quantity)


           const updatedCart = await Cart.findByIdAndUpdate(
            cart._id,
            {
              $push: { CartItems: cartItems },
              $set: { TotalPrice: newTotal }, // If you want to update TotalPrice as well
            },
            { new: true }
          );
          
            if (!updatedCart) {
                return res.status(404).send('User not found');
            }
         
            res.status(200).send("Successfully added to the cart")
            
            
        }
        else{
            console.log("in else")
            try{
            
               
                const product = await Product.findById(productId);
                const total =  quantity * product.Price; 

                let cartItems = new CartItems({
                    Product:productId,
                    Quantity:quantity,

                  });
                  cartItems = await cartItems.save();

  
                if (!cartItems) {
                    return res.status(400).send('The cart could not be created!');
                }
                else{

                    let cart = new Cart({
                        CartItems: cartItems,
                        User : userId,
                        TotalPrice: total,

    
                      });
                    cart = await cart.save();



                }


                res.status(200).send("Successfully added to the cart")
                
            }
            catch(error){
                console.log(error);
                res.status(500).send("Internal server error. Try again later")

        }
    }

    }catch(error){
        console.log(error);
        res.status(500).send("Invalid Authentication")
    }
}


module.exports = {
    getCartByUserId,
    store


};