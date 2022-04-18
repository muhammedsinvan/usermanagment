const express=require ('express')
const app=express()
const cors =require('cors')
const db =require('./config/connection')
const cookieParser = require('cookie-parser')
var userrouter=require("./route/userroute")
var createError =require('http-errors')
var path=require('path')

db.connect((err)=>{
    if(err) console.log('connection error'+err)
    else console.log("connected")
})

app.get('/',(req,res)=>{
    res.send("welcome home page")
})


app.listen(4000,()=>{
   console.log("port is connected")
})




app.get("/api",(req,res)=>{
    try{
        res.json({message:"sample from server"})
    }catch(error){
        console.log(error)
        res.json(error)
    }
})

// app.get("/login",(req,res)=>{
//     try{
//         res.json({message:"sample from server"})
//     }catch(error){
//         console.log(error)
//         res.json(error)
//     }
// })






app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))

app.use(
    cors({
        origin:["http://localhost:3000"],
        credentials:true
    })
)

// app.use(session({
//     secret:"key",
//     resave:false,
//     saveUninitialized:true,
//     store:MongoStore.create({
//         mongoUrl:'mongodb://localhost:27017',
//         ttl:2*24*60*60,
//         autoRemove:'native'
//     })
// }))

app.use("/",userrouter)

app.use(function(req,res,next){
    next(createError(404))
})

module.exports=app