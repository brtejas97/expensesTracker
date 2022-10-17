const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticateUser = (req,res,next) => {
    const token = req.header('Authorization')
    let tokenData
    try {
        tokenData = jwt.verify(token,'dct123')
        User.findById(tokenData._id)
            .then((user)=>{
                req.user = user
                next()
            })
            .catch(err=>res.json(err))
    } catch (error) {
        // console.log(error)
        res.json(error)
    }
}

module.exports = authenticateUser