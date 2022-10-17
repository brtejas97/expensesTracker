const express = require('express')
const bdgtController = require('../app/controllers/bdgtController')
const catController = require('../app/controllers/catController')
const expController = require('../app/controllers/expController')
const usersController = require('../app/controllers/usersController')
const authenticateUser = require('../app/middlewares/authenticate')
const checkCatg = require('../app/middlewares/checkCatg')
const router = express.Router()

router.post('/api/users/reg',usersController.registerUser)
router.get('/api/users',usersController.listUsers) // dev purpose
router.get('/api/users/profile',authenticateUser,usersController.getOne) //dev purpose
router.delete('/api/users/:id',usersController.deleteUser) //dev purpose
router.post('/api/users/login',usersController.login)
router.put('/api/users/update', authenticateUser, usersController.update)

router.post('/api/categories', authenticateUser, catController.newCat)
router.get('/api/categories', authenticateUser,catController.listCat)
router.get('/api/categories/:id',authenticateUser,catController.getOne) //dev purpose
router.delete('/api/categories/dev/:id',catController.delCat) //dev purpose
// router.delete('/api/categories/try/:id',catController.uniqUpd) //dev purpose
router.put('/api/categories/:id',authenticateUser,checkCatg,catController.updCat)
router.delete('/api/categories/:id',authenticateUser,catController.delUpd)

router.post('/api/expenses',authenticateUser,expController.newExp)
router.get('/api/expenses',authenticateUser,expController.listExp)
router.put('/api/expenses/:id',authenticateUser,expController.updExp)
router.delete('/api/expenses/:id',authenticateUser,expController.delExp)

router.post('/api/budget',authenticateUser,bdgtController.newBdgt)
router.get('/api/budget',authenticateUser,bdgtController.listBdgt)
router.get('/api/budget/all',bdgtController.listAllBdgt) //dev purpose
router.put('/api/budget/:id',authenticateUser,bdgtController.updBdgt)
router.delete('/api/budget/:id',bdgtController.delBdgt) //dev purpose

module.exports = router