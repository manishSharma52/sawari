const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
  
    fullname:{
      firstname: {
          type: String,
          require: true,
          minlength: [3, "first name must be at least 3 character"],
      },
      lastname: {
          type: String,
          minlength: [3, " last name must be at least 3 character"],
      },

  },
    email: {
        type: String,
        require: true,
        unique: true,
        
    },
    password :{
        type : String,
        require: true,
        select : false,
    },
    socketId : {
        type: String,
    }
});
userSchema.methods.generateAuthToken = ()=>
{
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}
userSchema.methods.comparePassword = async(password)=>{
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}
userSchema.statics.hashPassword = async(password)=>{
    return await bcrypt.hash(password,10)
}
module.exports = mongoose.model("user", userSchema);
