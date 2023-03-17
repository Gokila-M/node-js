import UserbookMapping from "../models/userbookmapping";

export const userReg = async (req, res) => {
   let userId=req.query.userId
   let bookId=req.query.bookId
   let mappingCode = req.body.mappingCode
    let exmapping= await UserbookMapping.findOne({ mappingCode:mappingCode});
    let exUserEmail = await User.findOne({ email: email });
    if (exUserEmail)
      return res.status(400).json({ message: "email already register" });
    if (exUserPhone)
      return res.status(400).json({ message: "Phone No already exists" });
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      let register = new User({       
        email: email,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        dob: req.body.dob,
        gender: req.body.gender?.toLowerCase(),
        bloodGroup: req.body.bloodGroup,       
        mobileNo: req.body.mobileNo,
       
      });
      try {
        let User = await register.save();
        res.status(201).json({ message:User});
      } catch (error) {
        res.status(400).json({ message:error.message });
      }
    });
  };