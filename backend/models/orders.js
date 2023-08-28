const mongoose = require('mongoose')
const { Users } = require('./user')
const { OrderItems } = require('./orderItems')

const ordersSchema = mongoose.Schema({
    OrderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    Name: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required:true,
    },
    Email: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    isPrescriptioned:{
        type:Boolean,
        default:false,

    },
    Accepted:{
        type:Boolean,
        default:true,
    },
    Payed:{
        type:Boolean,
        default:false,
    },
    Status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    TotalPrice: {
        type: Number,
    },
    Prescription1: {
        type: String,
    },
    Prescription2:{
        type: String
    },
    Prescription3: {
        type: String
    },
    User:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    OrderedDate: { type: Date, default: Date.now },
})

ordersSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
ordersSchema.set('toJSON', {
    virtuals: true,
});


ordersSchema.statics.findByUser = async function (userId) {
    try {
      const orders = await this.findOne({ User: userId });
      return orders;
    } catch (error) {
      console.log(error.message);
    }
  };

exports.Orders = mongoose.model('Orders',ordersSchema)
