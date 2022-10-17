const mongoose = require('mongoose')

const Expense = require('../models/expense')

const expController = {}

expController.newExp = (req,res) => {
    const body = req.body
    const userId = req.user._id
    const newExp = new Expense(body)
    newExp.user = userId
    newExp.save()
        .then(exp=>res.json(exp))
        .catch(err=>res.json(err))
}

expController.listExp = (req,res) => {
    const userId = req.user._id
    Expense.find({user:userId})
        .then(list=>res.json(list))
        .catch(err=>res.json(err))
}

expController.delExp = (req,res) => {
    const userId = req.user._id
    const id = req.params.id
    Expense.findOneAndDelete({user:userId,_id:id})
        .then(exp=>res.json(exp))
        .catch(err=>res.json(err))
}


expController.updExp = (req,res) => {
    const id = req.params.id
    const userId = req.user._id
    const body = req.body
    Expense.findOneAndUpdate({user:userId,_id:id},body,{runValidators:true,new:true})
        .then(updOne=>res.json(updOne))
        .catch(err=>res.json(err))
}

module.exports = expController