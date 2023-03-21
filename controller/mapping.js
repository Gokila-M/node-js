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
