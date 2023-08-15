const {Cart} = require('../models/cart');
const {User} = require('../models/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const { CartItems } = require('../models/cartItems');
const { Product } = require('../models/product');
require('dotenv').config();
const { secret, API_URL } = process.env;
const mongoose = require('mongoose');

const getCartByUserId = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
        const decodedUser = jwt.verify(token, secret);
        const cart = await Cart.findByUser(decodedUser.userId);

        if (cart) {
            const temporaryList = [];

            for (const cartItemId of cart.CartItems) {
                console.log(cartItemId);
                try {
                    const cartItem = await CartItems.findById(cartItemId); // Assuming the model is named "CartItem"
                    
                    const product = await Product.findById(cartItem.Product); // Assuming the model is named "Product"

                    temporaryList.push({
                        productId: cartItemId,
                        name: product.Name,
                        quantity: cartItem.Quantity,
                        price: product.Price,
                        image: product.Image1,
                    });
                } catch (error) {
                    console.log("Error fetching cart item or product:", error);
                }
            }

            const data = {
                totalPrice: cart.TotalPrice,
                productList: temporaryList,
            };

            res.send(data);
        } else {
            res.status(400).send("There is a server issue. Try again later");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Invalid Authentication");
    }
};



const store = async(req,res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
        const decodedUser =  jwt.verify(token, secret);
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