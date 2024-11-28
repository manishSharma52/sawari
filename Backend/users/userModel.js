const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        require: true,
        minlength :[3, "first name must be at least 3 character"]
    },
    lastname:{
        type: String,
        
        minlength :[3, " last name must be at least 3 character"]
    }
})
mongoose.model("User", userSchema)