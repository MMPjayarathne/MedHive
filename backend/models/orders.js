const mongoose = require('mongoose')
const { Users } = require('./user')
const { OrderItems } = require('./orderItems')

const ordersSchema = mongoose.Schema({
    OrderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    ShippingAddress1: {
        type: String,
        required: true,
    },
    ShippingAddress2: {
        type: String,
    },
    City: {
        type: String,
        required: true,
    },
    PostalCode: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    TotalPrice: {
        type: Number,
    },
    User:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    OrderedDate: { type: Date, default: Date.now },
})

exports.Orders = mongoose.model('Orders',ordersSchema)
