var router=require('express').Router()
const userhelper=require("../helpers/userhelper")
const jwt =require("jsonwebtoken")
const {json, response} =require ('express')

//signup user
router.post("/signup",async(req,res)=>{
    try{
        console.log(req.body)
        const {name,email,number,password}=req.body;
        if(!email||!password){
            res.status(400).json({errorMassage:"Please enter required field"})
        }
        if (password.length<6){
            res.status(400)
            .json({errorMassage:"Please enter atleast 6 characters"})
        }

        userhelper.dosignup(name,email,number,password)
        .then((response)=>{
            res.status(200).json({message:"registerd"})
        })
        .catch((err)=>{
            console.log(err)
            if(err.code===11000){
                res.status(400).json({errorMassage:"This email is already exist"})
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).send()
    }
})

//user login

router.post("/login" ,async (req,res)=>{
try{
    const{email,password}=req.body;

    if(!email || !password){
        res.status(400).json({errorMassage:"please enter require field"})
    }
    if(password.length<6){
        res.status(400).json({errorMassage:"please enter atleast 6 characters"})
    }
    const user=await userhelper.dologin(email,password)
    const token=jwt.sign(
        {
            user_id:user._id,
            email
        },
        "tokenkey",
        {
            expiresIn:"3h",
        }
    )
    res.status(200).json({message:"loggedin",token})
}catch(error){
    res.status(500).send()
}
})

//admin login

router.post("/adminlogin",async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            res.status(400).json({errorMassage:'plese enter valid'})
        }
        if(password.length<6){
            res.status(400).json({errorMassage:"please enter more than 6 characters"})
        }
        const admin=await userhelper.doadminlogin(email,password)
        const token=jwt.sign(
            {
                user_id:admin._id,
                email
            },
                "tokenkey",
                {
                    expiresIn:"1h"
                }
        )
        res.status(200).json({message:"loggedin",token})
    }catch(error){
        res.status(500).send()
    }
})


//user data
router.get("/getuserdata",async(req,res)=>{
 try{
  let data=await userhelper.getalluser()
  res.status(200).json(data)
  console.log(user)
 }catch(error){
     console.log(error)
 }
})


//delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try{
        let data=await userhelper.deleteuser(req.params.id)
        res.status(200).json(data)
    }catch(error){
        console.log(error)
    }
})

//get one user
router.get("/getoneuser/:id",async(req,res)=>{
    try{
        let user=await userhelper.getoneuser(req.params.id)
        res.status(200).json(user)
    }catch(error){
        console.log(error)
    }
})

//update user
router.post("/updateuser/:id",async(req,res)=>{
    console.log(req.params.id)
    console.log(req.body)
    try{
        let update=await userhelper.getupdate(req.params.id,name,email,number,password)
        res.status(200).json(update)
    }catch(error){
        console.log(error)
    }
})

//update user data
router.post("/updateUser",(req,res)=>{
    console.log(req.body)
    userhelper.updateUser(req.body)
      .then((response)=>{
        res.status(200).json({response})
      })
      .then((err)=>{
        res.status(401).send()
      })
  })

  //finding a user
  router.get("/find/:data",async(req,res)=>{
      try{
          let user=await userhelper.getsearchuser(req.params.data)
          res.status(200).json(user)
      }catch(error){
          console.log(error)
      }
  })
module.exports=router