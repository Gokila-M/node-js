import mongoose from "mongoose";

const author =  new mongoose.Schema({
    authorName:{
        type:String,
        required: true
    },
   
    dob:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    email:{
        type:String,
    },
    mobileNo:{
        type:Number
    },    
    isBlock:{
        type:Boolean,
        default:false
    },
   
    
    
},  {
    timestamps: true
}
)

const validateAuthor=(author)=>{    
    let email=author.email
    let phone=author.mobileNo
    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{3}$/.test(email)){
        return {error:"invalid email"}
    }
    if(!/^[0-9]{10}$/.test(phone)){
        return {error:"invalid phone number"}
    }
}

export {validateAuthor}

const Author=mongoose.model('Author',author)
export default Author;