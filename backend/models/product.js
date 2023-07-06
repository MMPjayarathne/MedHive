const mongoose = require('mongoose')
const { Category } = require('./category')

const productSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: String,
    Type: {
        type: String,
        enum: ['OTC', 'NONOTC'],
        required: true
      },
    Image1: {
      type: String,
      required: true
  },
    Image2:{
      type: String
  },
    Image3: {
      type: String
  },
    Image4:{
      type: String
  },
    Brand: String,
    Price: Number,
    Category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    Rating: Number,
    Quantity: Number,
    AddedDate: { type: Date, default: Date.now },
})

productSchema.virtual('id').get(function(){
  return this._id.toHexString();
})
productSchema.set('toJSON', {
  virtuals: true,
});



exports.Product = mongoose.model('Product',productSchema)
