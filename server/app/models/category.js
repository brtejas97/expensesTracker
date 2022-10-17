const mongoose = require('mongoose')

const Schema = mongoose.Schema

const catSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'UserModel'
    }
},{timestamps:true})

const Category = mongoose.model('Category',catSchema)

module.exports = Category