const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    AddedDate: { type: Date, default: Date.now },
})

categorySchema.virtual('id').get(function(){
    return this._id.toHexString();
})




exports.Category = mongoose.model('Category',categorySchema)
