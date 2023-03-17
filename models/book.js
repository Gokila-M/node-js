import mongoose from "mongoose";

const book  =  new mongoose.Schema({
    bookName:{
        type:String,
        required: true
    },
    bookType:{
        type:String,
        required: true
    },
    bookCode:{
        type:String,
        required: true
    },
    stock:{
        type:Number,
        required: true
    },
    isBlock:{
        type:Boolean,
        default:false
    },
   
},  {
    timestamps: true
}
)



const Book=mongoose.model('Book',book)
export default Book;