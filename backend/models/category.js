const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    Name: String,
    Image: String,
    AddedDate: { type: Date, default: Date.now },
})

exports.Category = mongoose.model('Category',categorySchema)
