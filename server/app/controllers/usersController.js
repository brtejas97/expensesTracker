const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Category = require('../models/category')

const usersController = {}

usersController.getOne = (req,res) => {
    // const id = req.params.id
    const userId = req.user._id
    User.findOne({_id:userId})
        .then(resp=>res.json({name:resp.name,email:resp.email,salary:resp.salary,occupation:resp.occupation}))
        .catch(err=>res.json(err))
}

usersController.registerUser = (req,res) => {
    const body  = req.body
    const newUser = new User(body)
    // console.log(newUser._id)
    bcryptjs.genSalt()
        .then((salt)=>{
            bcryptjs.hash(newUser.password,salt)
                .then((encPwd)=>{
                    newUser.password = encPwd
                    newUser.save()
                        .then((resp)=>{
                            const newCatg = new Category({
                                user:resp._id,
                                name:'uncategorised'
                            })
                            newCatg.save()
                                .then(()=>res.json(resp))
                                .catch(err=>res.json(err))
                        })
                        .catch((err)=>{
                            res.json(err)
                        })
                })
        })
}

usersController.deleteUser = (req,res) => {
    const id  = req.params.id
    User.findByIdAndDelete(id)
        .then(deletedUser=>res.json(deletedUser))
        .catch(err=>res.json(err))
}

//for dev
usersController.listUsers = (req,res) => {
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.json(err))
}

usersController.login = (req,res) => {
    const body = req.body
    User.findOne({email:body.email})
        .then(user=>{
            if(!user) {
                // console.log('first')
                res.json({errors:'invalid email or password'})
            }
            else{
                // console.log(body.password,user.password)
                bcryptjs.compare(body.password,user.password)
                .then(match=>{
                    // console.log(match)
                    if(match){
                        const data = {
                            _id:user._id,
                            email:user.email
                        }
                        const token = jwt.sign(data,'dct123',{expiresIn:'100d'})
                        res.json({token})
                    }
                    else {
                        // console.log('second')
                        res.json({errors:'invalid email or password'})
                    }
                })
            }
        })
}

usersController.update = (req,res) => {
    const userId = req.user._id
    const body = req.body
    User.findOneAndUpdate({_id:userId},body,{runValidators:true,new:true})
        .then(updOne=>res.json(updOne))
        .catch(err=>res.json(err))
}

module.exports = usersController