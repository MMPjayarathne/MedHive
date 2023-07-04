const mongoose = require('mongoose')
const { Category } = require('./category')

const productSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Description: String,
    Type: {
        type: String,
        enum: ['OTC', 'NONOTC'],
        required: true
      },
    Image1: String,
    Image2: String,
     /* image1: {
        data: Buffer,
        contentType: String
      },
      image2: {
        data: Buffer,
        contentType: String
      },
      image3: {
        data: Buffer,
        contentType: String
      },
      image4: {
        data: Buffer,
        contentType: String
      },*/
    Brand: String,
    Price: Number,
    Category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    Rating: Number,
    Quentity: Number,
    AddedDate: { type: Date, default: Date.now },
})

exports.Product = mongoose.model('Product',productSchema)
