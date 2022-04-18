const db=require("../config/connection")
const collection=require("../config/collection")
const objectId=require("mongodb").ObjectId
const { response } = require("express")

module.exports={
    dosignup:(name,email,number,password)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).insertOne({
                name,
                email,
                number,
                password,
            })
            .then((response)=>{
                resolve(response)
                console.log(response)
            })
            .catch((err)=>{
                console.log(err.massage)
                reject(err)
            })
        })
    },

    dologin:(email,password)=>{
        return new Promise((resolve,reject)=>{ 
         db.get().collection(collection.USER_COLLECTION).findOne({email}).then((response)=>{
             resolve(response)
             console.log("loggedin")
             console.log(response)
         })
    })
 
    },

    doadminlogin:(email,password)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ADMIN_COLLECTION).findOne({email}).then((response)=>{
                resolve(response)
                console.log("logged in")
            })
        })
    },


 //getting all users
getalluser:()=>{
    return new Promise(async(resolve,reject)=>{
        let user =await db.get().collection(collection.USER_COLLECTION).find().toArray()
        resolve(user)
    })
},

//delete user
deleteuser:(userid)=>{
    return new Promise(async(resolve,reject)=>{
        await db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(userid)}).then((response)=>{
            resolve(response)
        })
    })
},

//get one user
getoneuser:(userid)=>{
    return new Promise(async(resolve,reject)=>{
        await db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(userid)})
        .then((response)=>{
         resolve(response)
        })
    })
},

//update user
updateUser: (data) => {
    const email = data.email
    const name = data.name
    const number=data.number
    const password=data.password
    return new Promise((resolve, reject) => {
        db.get().collection(collection.USER_COLLECTION)
            .updateOne(
                { _id: objectId(data.id) },
                {
                    $set:{
                        name: name,
                            email:email ,
                            number:number,
                            password: password
                    }
                })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                resolve(err)
            })
    })
},

//get searched user
getsearchuser:(data)=>{
    return new Promise(async(resolve,reject)=>{
      let searchuser= await db.get().collection(collection.USER_COLLECTION).find({name:data}).toArray()
      resolve(searchuser)
    })
}

}


