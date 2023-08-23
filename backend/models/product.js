const mongoose = require('mongoose')
const { Category } = require('./category')

const productSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        text: true
    },
    Description: {
      type: String,
      text: true // Create a text index for this field
    },
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

productSchema.statics.findByCategoryId = async function (categoryId) {
  try {
    // Find products with the given categoryId
    const products = await this.find({ Category: categoryId }).populate('Category');
    return products;
  } catch (error) {
    throw error;
  }
};

productSchema.virtual('id').get(function(){
  return this._id.toHexString();
})
productSchema.set('toJSON', {
  virtuals: true,
});




exports.Product = mongoose.model('Product',productSchema)
