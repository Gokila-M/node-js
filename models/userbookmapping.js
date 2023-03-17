import mongoose from "mongoose";

const userbookMapping  =  new mongoose.Schema({
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    
   
},  {
    timestamps: true
}
)



const UserbookMapping=mongoose.model('UserbookMapping',userbookMapping)
export default UserbookMapping;