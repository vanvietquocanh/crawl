var mongoose =  require('mongoose');

var newUser = new mongoose.Schema({
  id : {
    type: Number,
    required: true,
    default: 0
  },
  username : {
    type: String,
    required: true,
    default : ""
  },
  password : {
    type: String,
    required: true,
    default : ""
  }
},{ colletion : "user" });

let user = module.exports = mongoose.model("user", newUser)