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
                        cartItemId: cartItemId,
                        name: product.Name,
                        quantity: cartItem.Quantity,
                        price: product.Price,
                        image: product.Image1,
                    });
                } catch (error) {
                    console.log(error)
                    console.log("Error fetching cart item or product:", error);
                }
            }

            const data = {
                totalPrice: cart.TotalPrice,
                productList: temporaryList,
            };

            res.send(data);
        } else {
            res.status(400).send("There is a no cart. Try add something");
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
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
          }      
        const cart = await Cart.findByUser(userId);
       // const wantProduct = await Product.findById(productId);
        //console.log("the cart" , cart)
      
       //console.log(" quentity : ",req.body.Quantity)
        try {
            // Find the product by ID and update its Quantity field
            const Newquantity =  product.Quantity - quantity
            const updatedProduct = await Product.findByIdAndUpdate(
              productId,
              { Quantity: Newquantity},
              { new: true } // Return the updated product
            )
            }catch{
              return res.status(500).send('Error updating product quantity');

            }
       
        if(cart){ //when cart is available
            console.log("Hello")
            const totalPrice = cart.TotalPrice || 0;
            let newTotal = totalPrice + product.Price * quantity;
            const existingCartItemsIds = cart.CartItems;
           // const existingCartItems = await CartItems.findById(existingCartItemsId);
           for (const cartItemId of existingCartItemsIds) {
            try {
              const existingCartItems = await CartItems.findById(cartItemId);
              if (!existingCartItems) { 
                console.log(`Cart item with ID ${cartItemId} not found.`);
                continue; // Skip this iteration and move to the next item
              }
          
              const existingProductId = existingCartItems.Product.toString();
              //console.log(existingProductId);
              //console.log(productId);
          
              if (existingProductId === productId) {
                console.log(cartItemId);
                const newQuantity = existingCartItems.Quantity + quantity;
                try {
                  const updatedCartItem = await CartItems.findByIdAndUpdate(
                    cartItemId,
                    { Quantity: newQuantity },
                    { new: true } // Return the updated product
                  );
                 
                const updatedCart = await Cart.findByIdAndUpdate(
                    cart._id,
                    {
                    $set: { TotalPrice: newTotal }, // If you want to update TotalPrice as well
                    },
                    { new: true }
                );
                  return res.status(200).send("Successfully added to the existing cart")
                } catch (error) {
                  console.log(error);
                  return res.status(500).send('Error adding to the existing cart');
                }
              }
            } catch (error) {
              console.log(error);
              return res.status(500).send('Error fetching cart item from the database');
            }
          }
          
            let cartItems = new CartItems({
                Product:productId,
                Quantity:quantity,

              });
            cartItems = await cartItems.save();
            
            
         


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

const deleteCartItemByUserId = async (req, res) => {

  try{
    const cartItemId = req.body.cartItemId;
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    const decodedUser =  jwt.verify(token, secret);
    //console.log(decodedUser);
    const userId = decodedUser.userId;
    const cart = await Cart.findByUser(userId);

    const cartItems = await CartItems.findById(cartItemId);
    console.log("CartItems: ",cartItems)
    const productId = cartItems.Product;
    console.log("productId: ", productId)
    const deletedCartItem = await CartItems.findByIdAndDelete(cartItemId);

    const product = await Product.findById(productId)
  
    console.log("Product: ", product)
    const newTotal = cart.TotalPrice - cartItems.Quantity * product.Price;
                //console.log("new Total: ", newTotal);
                if (!deletedCartItem) {
                  return res.status(404).send('Cart item not found');
                }
              
                const updatedCart = await Cart.findByIdAndUpdate(
                    cart._id,
                    {
                      $set:{TotalPrice:newTotal},
                      $pull: { CartItems: cartItemId },
                    },
                    { new: true }
                  );
                  const productNewQuantity = product.Quantity + cartItems.Quantity;
                  const updatedProduct = await Product.findByIdAndUpdate(
                    productId,
                    {
                        $set:{Quantity:productNewQuantity}
                    },
                    {new:true}
                  );
                  if(!updatedProduct){
                    return res.status(500).send('Error deleteing the existing cart');
                  }
               return res.status(200).send("Successfully deleted from the existing cart")
  

  }catch(error){
    console.log(error);
  }




    // try{
    //     const productId = req.body.productId;
    //     const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    //     const decodedUser =  jwt.verify(token, secret);
    //     console.log(decodedUser);
    //     const userId = decodedUser.userId;
    //     const cart = await Cart.findByUser(userId);
    //     const product = await Product.findById(productId);
    //     const existingCartItemsIds = cart.CartItems;
  
    //     // const existingCartItems = await CartItems.findById(existingCartItemsId);
    //     for (const cartItemId of existingCartItemsIds) {
    //      try {
    //        const existingCartItems = await CartItems.findById(cartItemId);
    //        if (!existingCartItems) { 
    //          console.log(`Cart item with ID ${cartItemId} not found.`);
    //          continue; // Skip this iteration and move to the next item
    //        }
       
    //        const existingProductId = existingCartItems.Product.toString();
    //        //console.log(existingProductId);
    //        //console.log(productId);
       
    //        if (existingProductId === productId) {
    //          console.log(cartItemId);
    //          try {
    //             const cartItems = await CartItems.findById(cartItemId);
    //             const deletedCartItem = await CartItems.findByIdAndDelete(cartItemId);
    //             //console.log(cartItems.Quantity);
    //             const newTotal = cart.TotalPrice - cartItems.Quantity * product.Price;
    //             //console.log("new Total: ", newTotal);
    //             if (!deletedCartItem) {
    //               return res.status(404).send('Cart item not found');
    //             }
              
    //             const updatedCart = await Cart.findByIdAndUpdate(
    //                 cart._id,
    //                 {
    //                   $set:{TotalPrice:newTotal},
    //                   $pull: { CartItems: cartItemId },
    //                 },
    //                 { new: true }
    //               );
    //                 const productNewQuantity = product.Quantity + cartItems.Quantity;
    //               const updatedProduct = await Product.findByIdAndUpdate(
    //                 productId,
    //                 {
    //                     $set:{Quantity:productNewQuantity}
    //                 },
    //                 {new:true}
    //               );
    //               if(!updatedProduct){
    //                 return res.status(500).send('Error deleteing the existing cart');
    //               }
    //            return res.status(200).send("Successfully deleted from the existing cart")
    //          } catch (error) {
    //            console.log(error);
    //            return res.status(500).send('Error deleteing the existing cart');
    //          }
    //        }
    //      } catch (error) {
    //        console.log(error);
    //        return res.status(500).send('Error fetching cart item from the database');
    //      }
    //    }
       



    // }
    // catch(error){
    //     console.log(error);
    //     res.status(500).send("Invalid Authentication")

    // }




}


module.exports = {
    getCartByUserId,
    store,
    deleteCartItemByUserId

};