var mongoose =  require('mongoose');

var urlSchema = new mongoose.Schema({
  url : {
    type: String,
    required: true,
  },
  index : {
    type: Number,
    default: 0
  },
},{colletion:"url"});

let url = module.exports = mongoose.model("url", urlSchema)