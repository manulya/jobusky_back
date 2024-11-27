const express = require('express')
const cors = require ('cors')
const fileUpload = require('express-fileupload')
const PORT=process.env.PORT || 5000
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandingMiddleware')
const path = require('path')
require('dotenv').config()

const app = express()
app.use(cors({
    origin: "http://localhost:3001", // Разрешаем запросы только с этого домена
    methods: "GET,POST,DELETE,PUT", // Разрешаем только GET и POST запросы
    optionsSuccessStatus: 200, // Устанавливаем код ответа для успешного принятия запроса
  }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload())
app.use('/api', router)

app.use(errorHandler)



const start = async()=>{
    try{
        app.listen(PORT, ()=>console.log(`Server starter on port ${PORT}`))
    }catch(e){
        console.log(e);
    }
}

start()
