const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
    Image: {
        type: String,
        default: 'https://freesvg.org/img/abstract-user-flat-4.png',
    },
   /*
    Street: String,
    Postalcode: String,
    City: String,
    Phone:  String,*/
    isAdmin: { 
        type: Boolean,
        default:false
    },
    authNumber:Number,
    isActive: { 
        type: Boolean,
        default:false
    },
    AddedDate: { type: Date, default: Date.now },
})


userSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User',userSchema)
