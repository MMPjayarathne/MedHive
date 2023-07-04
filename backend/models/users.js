const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    PasswordHash: {
        type: String,
        required: true,
    },
    Street: String,
    Postalcode: String,
    City: String,
    Phone:  {
        type: String,
        required: true,
    },
    isAdmin: { 
        type: Boolean,
        default:false
    },
    AddedDate: { type: Date, default: Date.now },
})

exports.Users = mongoose.model('Users',usersSchema)
