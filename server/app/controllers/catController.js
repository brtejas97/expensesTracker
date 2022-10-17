const mongoose = require('mongoose')
const Category = require('../models/category')
const Expense = require('../models/expense')

const catController = {}

catController.getOne = (req,res) => {
    const userId = req.user._id
    const id = req.params.id
    Category.findOne({_id:id,user:userId})
        .then(resp=>res.json(resp))
        .catch(err=>res.json(err))
}

catController.newCat = (req,res) => {
    const body = req.body
    const userId = req.user._id
    const newCategory = new Category(body)
    newCategory.user = userId
    newCategory.save()
        .then((newCtg)=>{
            res.json(newCtg)
        })
        .catch((err)=>{
            res.json(err)
        })
}

catController.listCat = (req,res) => {
    const userId = req.user._id
    Category.find({user:userId})
        .then((list)=>{
            res.json(list)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//dev
catController.delCat = (req,res) => {
    const id = req.params.id
    Category.findByIdAndDelete(id)
        .then((deleted)=>{
            res.json(deleted)
        })
        .catch(err=>res.json(err))
}

//dev
catController.uniqUpd = (req,res) => {
    const id = req.params.id
    Category.findById(id)
        .then(cat=>{
            Category.find({name:'uncategorised',user:cat.user}) //can use findByOne
                .then(unCatg=>{
                    Expense.updateMany({category:id},{category:unCatg[0]._id}) //findByOne
                        .then((updOnes)=>{
                            Category.findByIdAndDelete(id)
                                .then(()=>res.json(updOnes))
                                .catch(err=>res.json(err))
                        })
                        .catch(err=>res.json(err))                
                })
                .catch((err)=>res.json(err))
        })
        .catch((err)=>res.json(err))
}

catController.delUpd = (req,res) => {
    const id = req.params.id
    const user = req.user
    Category.findOne({user:user._id,name:'uncategorised'})
        .then((unCtg)=>{
            Expense.updateMany({category:id},{category:unCtg._id})
                .then(()=>{
                    Category.findByIdAndDelete(id)
                        .then(delCat=>res.json(delCat))
                        .catch(err=>res.json(err))
                })
                .catch(err=>res.json(err))
        })
        .catch(err=>res.json(err))
}

catController.updCat = (req,res) => {
    const id = req.params.id
    const userId = req.user._id
    const body = req.body
    Category.findOneAndUpdate({user:userId,_id:id},body,{runValidators:true,new:true})
        .then(updCatg=>res.json(updCatg))
        .catch(err=>res.json(err))
}

module.exports = catController