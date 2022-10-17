const Budget = require('../models/budget')

const bdgtController = {}

bdgtController.newBdgt = (req,res) => {
    const body = req.body
    const userId = req.user._id
    const newBdgt = new Budget(body)
    newBdgt.user = userId
    newBdgt.save()
        .then(bdgt=>res.json(bdgt))
        .catch(err=>res.json(err))
}

bdgtController.listBdgt = (req,res) => {
    const userId = req.user._id
    Budget.findOne({user:userId})
        .then(bdgt=>{
            res.json(bdgt)})
        .catch(err=>res.json(err))
}

//for dev
bdgtController.listAllBdgt = (req,res) => {
    Budget.find()
        .then(list=>res.json(list))
        .catch(err=>res.json(err))
}

// it works with token only
bdgtController.delBdgt = (req,res) => {
    const id = req.params.id
    // const userId = req.user._id
    Budget.findOneAndDelete({_id:id})
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
}

bdgtController.updBdgt = (req,res) => {
    const id = req.params.id
    const userId = req.user._id
    const body = req.body
    Budget.findOneAndUpdate({user:userId,_id:id},body,{runValidators:true,new:true})
        .then(updOne=>res.json(updOne))
        .catch(err=>res.json(err))
}

module.exports = bdgtController