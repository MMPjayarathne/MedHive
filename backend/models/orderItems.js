const mongoose = require('mongoose')
const { Orders } = require('./orders')
const { Product } = require('./product')

const orderItemsSchema = mongoose.Schema({
    Quantity: {
        type: Number,
        required: true
    },
    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }

})

orderItemsSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
orderItemsSchema.set('toJSON', {
    virtuals: true,
});


exports.OrderItems = mongoose.model('OrderItems',orderItemsSchema)
