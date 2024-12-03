const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "first name must be at least 3 character"],
    },
    lastname: {
      type: String,
      minlength: [3, " last name must be at least 3 character"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});
userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn: '24h'});
  return token;
};
// userSchema.methods.comparePassword = async(password)=>{
//     const isMatch = await bcrypt.compare(password, this.password);
//     return isMatch;
// }

userSchema.methods.comparePassword = async function (password) {
  if (!password || !this.password) {
    throw new Error(" password or hashed password is missing");
  }
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
module.exports = mongoose.model("user", userSchema);
