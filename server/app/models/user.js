const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')

const Schema = mongoose.Schema

const userSchema = new Schema({
   email:{
    type:String,
    required:true,
    unique:true,
    validate:{
      validator:(email)=>{
         return isEmail(email)
      },
      message:()=>{
         return 'invalid email format'
      }
    }
   },
   password:{
    type:String,
    required:true
   },
   occupation:{
      type:String
   },
   salary:{
      type:Number
   },
   name:{
      type:String
   }
},{timestamps:true})

const User = mongoose.model('UserModel',userSchema)

module.exports = User