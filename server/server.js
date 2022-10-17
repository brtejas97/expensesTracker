const express = require('express')
const cors = require('cors')

const configDb = require('./config/database')
const routes = require('./config/routes')

const PORT = 3005
const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)

configDb()

app.listen(PORT,()=>{
    console.log('listening on',PORT)
})