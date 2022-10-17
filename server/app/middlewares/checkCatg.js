const Category = require('../models/category')

const checkCatg = (req,res,next) => {
    const id = req.params.id
    const userId = req.user._id
    Category.findOne({user:userId,_id:id})
        .then((catg)=>{
            if(catg.name==='uncategorised'){
                res.json('cannot modify the uncategorised category')
            }else{
                next()
            }
        })
        .catch(err=>res.json(err))
}

module.exports = checkCatg