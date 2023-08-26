const mongoose = require('mongoose')
const { Users } = require('./user')
const { CartItems } = require('./cartItems')

const cartSchema = mongoose.Schema({
    CartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItems',
        required:true
    }],
    TotalPrice: {
        type: Number,
    },
    NeedPrescription:{
        type:Boolean,
        default:false,
    }, 
    NoOfNONOTC:{
        type:Number,
        default:0,
    },

    User:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },

    CreatedDate: { type: Date, default: Date.now },
})

cartSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
cartSchema.set('toJSON', {
    virtuals: true,
});


cartSchema.statics.findByUser = async function (userId) {
    try {
      const cart = await this.findOne({ User: userId });
      return cart;
    } catch (error) {
      console.log(error.message);
    }
  };

exports.Cart = mongoose.model('Cart',cartSchema)
