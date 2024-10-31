require('dotenv').config('')
const express = require('express')
const connectDB = require('./config/DB')
const app = express()
const port = process.env.PORT || 2000

const cookie = require('cookie')




app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', u);

app.get((req,res)=>{
    res.send("Hello World")
})

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port http://localhost:${port}/`)
    })
})
.catch((err)=>{
    console.log(err);
    
})