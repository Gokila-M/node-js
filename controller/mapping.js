import UserbookMapping from "../models/userbookmapping.js";

export const bookuserMapping = async (req, res) => {
   let userId=req.query.userId
   let bookId=req.query.bookId
   let mappingCode = req.body.mappingCode
   let mapping= await UserbookMapping.findOne({ mappingCode:mappingCode});
   if (mapping) return res.status(400).json({ message: "MappingCode  already Exists" });
   let exUsermapping = await UserbookMapping.findOne({ userId:userId ,bookId:bookId});
   if (exUsermapping) return res.status(400).json({ message: "This User already mapped with this Book " }); 
   let register = new UserbookMapping({       
     userId: userId,
     bookId: bookId,
     mappingCode: mappingCode,
     
   });
   try {
     let mapped = await register.save();
     res.status(201).json({ Data:mapped});
   } catch (error) {
     res.status(400).json({ message:error.message });
   }
   
};
export const mappingUpdate = async (req, res) => {
  let  id  = req.query.id;
  const exmap = await UserbookMapping.findOne({_id:id});
  try {
    if (!id) {
      return res.status(400).json({ message: "Please Provide A Id In Query" });
    }
    if (!exmap) {
      return res.status(400).json({ message: "Mapping Not Found" });
    }   
    await UserbookMapping.findByIdAndUpdate({ _id: id },{$set: req.body},{ new: true });
    return res.status(200).json({ message: "Mapping Data Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllmappings = async (req, res) => {
  try {
     const mapping = await UserbookMapping.find({})
     return res.status(200).json({ data:mapping });
   } catch (error) {
     return res.status(500).json({ message: error.message });
   }
};
export const getmappingById = async (req, res) => {
   let id = req.query.id
   try {
     const mapping = await UserbookMapping.findById({ _id:id });
     if (!mapping) return res.status(404).json({ message: "Mapping Not Found" });
     res.status(200).json({ data: mapping });
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
};
