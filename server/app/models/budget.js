const mongoose = require('mongoose')

const Schema = mongoose.Schema

const budgetSchema = new Schema({
    amount:{
        type:Number,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'UserModel',
        required:true
    }
},{timestamps:true})

const Budget = mongoose.model('Budget',budgetSchema)

module.exports = Budget