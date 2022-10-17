const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expenseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'UserModel',
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false,
        required:true
    }
},{timestamps:true})

const Expense = mongoose.model('Expense',expenseSchema)

module.exports = Expense