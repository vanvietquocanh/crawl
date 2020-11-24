var mongoose =  require('mongoose');

var productSchema = new mongoose.Schema({
  url : {
    type: String,
    required: true,
  },
  name : {
    type: String,
    required: true
  },
  code: {
  	type: String
  },
  price : {
    type: Number,
    required : true
  },
  images : {
    type: Array
  },
  description : {
    type: String,
    default: ""
  },
  rate : {
    type: Number,
    default: 0
  },
  color : {
  	type: Array,
  	required : true,
  },
  saleOf : {
  	type: Array
  },
  brand: {
  	type : String
  },
  size: {
  	type : String
  },
  weight: {
  	type : String
  },
  ram: {
  	type : String
  },
  rom: {
  	type : String
  },
  typeSIM: {
  	type : String
  },
  typeDisplay: {
  	type : String
  },
  sizeDisplay: {
  	type : String
  },
  screenResolution: {
  	type : String
  },
  os: {
  	type : String
  },
  versionOs:{
  	type: String
  },
  cpu: {
  	type: String
  },
  memoryCardSlot: {
  	type: String
  },
  rearCamera: {
  	type: String
  },
  fontCamera: {
  	type: String
  },
  video: {
  	type: String
  },
  WLAN: {
  	type: String
  },
  bluetooth: {
  	type: String
  },
  gps: {
  	type: String
  },
  battery: {
  	type: String
  },
  NFC: {
  	type: String
  },
  sensor: {
  	type: String
  },
  specifications:{
  	type: String
  }
},{colletion:"product"});
// Giá , khuyến mại, ảnh , tên, đánh giá, thông số kỹ thuật

let product = module.exports = mongoose.model("product", productSchema)