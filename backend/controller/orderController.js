const { Orders} = require('../models/orders');
const {User} = require('../models/user');
const express = require('express');
const jwt = require('jsonwebtoken');
const { OrderItems } = require('../models/orderItems');
const { Product } = require('../models/product');
require('dotenv').config();
const { secret, API_URL } = process.env;
const mongoose = require('mongoose');
const { Cart } = require('../models/cart');
const { CartItems } = require('../models/cartItems');

const getOrderByUserId = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
        const decodedUser = jwt.verify(token, secret);
        const order = await Orders.findByUser(decodedUser.userId);
        if (order) {
            const temporaryList = [];
            for (const orderItemId of order.OrderItems) {
                console.log(orderItemId);
                try {
                    const orderItem = await OrderItems.findById(orderItemId);
                    
                    const product = await Product.findById(orderItem.Product); 

                    temporaryList.push({
                        orderItemId: orderItemId,
                        name: product.Name,
                        quantity: orderItem.Quantity,
                        price: product.Price,
                        image: product.Image1,
                    });
                } catch (error) {
                    console.log(error)
                    console.log("Error fetching order item or product:", error);
                }
            }

            const data = {
                totalPrice: order.TotalPrice,
                productList: temporaryList,
                isPrescription: order.isPrescriptioned,
                accepted: order.Accepted,
                payed: order.Payed,
                status: order.Status,
                prescription1: order.Prescription1,
                prescription2: order.Prescription2,
                prescription3: order.Prescription3,
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
        const order = JSON.parse(req.body.order);
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address;
        const phone = req.body.phone;
        const payed = req.body.payed;
        const isCart = req.body.isCart;

        console.log("hello made step 1");
        console.log("here is the prescription: ",req.files['prescription1']);


        let orders = new Orders({
            Name:name,
            Address:address,
            Email:email,
            Phone:phone,
            Payed:payed,
            isPrescriptioned:order.needPrescription,
            TotalPrice:order.totalPrice,
            User:userId,
        })
        if(order.needPrescription){
            orders.Accepted = false;
        }

        console.log("hello made step 2");
        let tempList =[];
        for(const product of order.productList){

           // console.log("product: ",product);


            let orderItems = new OrderItems({
                Product:product.productId,
                Quantity:product.quantity,
              });
              orderItems = await orderItems.save();
              console.log("orderItems: ",orderItems._id);
              tempList.push(
                orderItems._id
              )  

        }

       // console.log("OrderItemList: ",tempList);

        orders.OrderItems = tempList;
        console.log("hello made step 3");

         // Handle prescription upload 
    if (req.files && req.files['prescription1']) {
        orders.Prescription1 = req.files['prescription1'][0].path;
      }
      if (req.files && req.files['prescription2']) {
        orders.Prescription2 = req.files['prescription2'][0].path;
      }
      if (req.files && req.files['prescription3']) {
        orders.Prescription3 = req.files['prescription3'][0].path;
      }


      orders = await orders.save();
      console.log("hello made step 4");

      if(!orders){
        return res.status(500).send("error is save the orders");
      }else if(isCart){

        console.log("hello made step 5");

        const cart = await Cart.findByUser(userId);

        if(cart){
            const existingCartItemsIds = cart.CartItems;
           // const existingCartItems = await CartItems.findById(existingCartItemsId);
           for (const cartItemId of existingCartItemsIds) {

            try{
              const existingCartItems = await CartItems.findById(cartItemId);
              if (!existingCartItems) { 
                console.log(`Cart item with ID ${cartItemId} not found.`);
                continue; // Skip this iteration and move to the next item
              }
              const deletedCartItem = await CartItems.findByIdAndDelete(cartItemId);
              if(!deletedCartItem){

                return res.status(500).send('Error deleteing the cartItem: ', cartItemId);

              }

            }catch(error){
              console.log(error);
              return res.status(400).send(error);
            }
            }
           const deletedCart = await Cart.findByIdAndDelete(cart._id);
           if(!deletedCart){
            return res.status(500).send('Error deleteing the cart ');
           }
          
        }
        return res.status(200).send("successfully save the orders");

      }else{

        for(const product of order.productList){

            try {
                const existProduct = await Product.findById(product.productId);
                const Newquantity =  existProduct.Quantity - product.quantity;
                const updatedProduct = await Product.findByIdAndUpdate(
                product.productId,
                { Quantity: Newquantity},
                { new: true } // Return the updated product
                )
            }catch{
              return res.status(500).send('Error updating product quantity');

            }
            return res.status(200).send("successfully save the orders");

        }



      }

        

    }catch(error){
        console.log(error);
    }


}


module.exports = {
    store,
getOrderByUserId,
}
