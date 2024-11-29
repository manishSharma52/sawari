const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require ("jsonwebtoken")


module.exports.authUser = async(req, res, next) => {
 const token = req.cookies.token || req.headers.authorization?.split('')[1]
 if(!token){
     return res.status(401).json({message: 'You are not authenticated'})
 }

 const isBlackList = await userModel.findOne({token : token})

 if (isBlackList) {
    return res.status(401).json({message: 'unauthorized'})
 }

 try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findByid(decoded._id)

    req.user = user;

    return next();


 } catch (error) {
    return res.status(401).json({message: " unauthorized"})
 }
}