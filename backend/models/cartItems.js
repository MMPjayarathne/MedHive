const mongoose = require('mongoose')
const { Product } = require('./product')

const cartItemsSchema = mongoose.Schema({
    Quantity: {
        type: Number,
        required: true
    },
    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }

})

cartItemsSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
cartItemsSchema.set('toJSON', {
    virtuals: true,
});

exports.CartItems = mongoose.model('CartItems',cartItemsSchema)
