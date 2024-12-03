const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../model/blacklistTokenModel");
const captainModel = require("../model/captainModel");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split("")[1];
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }

  const isBlackList = await blacklistTokenModel.findOne({ token: token });

  if (isBlackList) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findByid(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: " unauthorized" });
  }
};

module.exports.authCaptain = async(req, res, next)=> {
   try{

      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      // console.log(token)
      
       if (!token) {
         return res.status(401).json({ message: "unauthorized"})
       }
       const isBlackListed = await blacklistTokenModel.findOne({ token: token });
      //  console.log(isBlackListed)
   
       if (isBlackListed) {
       return res.status(401).json({ message: "unauthorized - Token Blacklisted"})
       }
       
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const captain = await captainModel.findOne(decoded._id);
         req.captain = captain;
         return next();

         // console.log(decoded)

        //  if (!captain) {
        //     return res.status(401).json({ message: "Unauthorized - Captain Not Found" }); // Stop execution
        // }

        
   }
      
     catch (error) {
      console.log(error);
          res.status(401).json({ message: "Unauthorized - Invalid Token" });
     }

   }
