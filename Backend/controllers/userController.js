const userModel = require("../model/userModel");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const blacklistToken = require('../model/blacklistTokenModel')
module.exports.registerUser = async (req, res, next) => {
  const error =  validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }


  const { fullname, email, password } = req.body;
  const  isUserAlready = await userModel.findOne({ email});
  if (isUserAlready){
    res.status(400).json({message : "User already exists"})
  }
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


// module.exports.loginUser = async(req,res, next)=>{
//     const error = validationResult(req);
//     if(!error.isEmpty()){
//         return res.status(400).json({ error : error.array() });

//     }

//     const { email, password } =req.body;
//     const user = await userModel.findOne({email}).select('+password');
//     if (!user){
//         return res.status(401).json({message : 'Invalid email or password'})
//     }

//     const isMatch = await user.comparePassword(password);
//     if(!isMatch){
//         return res.status(401).json({message : 'Invalid email or password'});
//     }

//     const token = user.generateAuthToken();
//     res.status(200).json({token, user})
//   }


module.exports.loginUser = async (req, res, next) => {
  try {
      // Validate request input
      const error = validationResult(req);
      if (!error.isEmpty()) {
          return res.status(400).json({ error: error.array() });
      }

      const { email, password } = req.body;

      // Check if both email and password are provided
      if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required' });
      }

      // Find user by email and include password for comparison
      const user = await userModel.findOne({ email }).select('+password');
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }



      // console.log('Password from request:', password);
      // console.log('Hashed password from database:', user.password);

      if (!user.password) {
          return res.status(500).json({ message: 'Password not found for the user' });
      }




      // Compare passwords
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate authentication token
      const token = user.generateAuthToken();

      res.cookie("token" ,token,)

      // Respond with user and token
      res.status(200).json({ token, user });
  } catch (err) {
      // Catch and handle errors
      console.error('Error during login:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports.getUserProfile = async (req, res, next) => {
  
 res.status(200).json(req.user)


}

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token|| req.headers.authorization.split(' ')[1];

  await blacklistToken.create({token});
  res.status(200).json({ message: "Logged out successfully" });
}


