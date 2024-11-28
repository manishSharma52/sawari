const userModel = require("../model/userModel");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");
module.exports.registerUser = async (req, res, next) => {
  const error =  validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }


  const { fullname, email, password } = req.body;

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email,
    password: hashPassword,
  });
  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};


module.exports.loginUser = async(req,res, next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ error : error.array() });

    }

    const {email, password} =req.body
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message : 'Invalid email or password'})
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message : 'Invalid credentials'})
    }
    const token = user.generateAuthToken();
    res.json({token, user})
     
}