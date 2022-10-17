const mongoose = require('mongoose')

const configDb = () => {
    mongoose.connect('mongodb://localhost:27017/expenses')
        .then(()=>console.log('connected to db'))
        .catch(()=>console.log('ERROR in connecting with db'))
}

module.exports = configDb