// Starting mongoDB
// import { Schema, models, model } from 'mongoose';
import mongoose  from "mongoose";

const BookSchema = new mongoose.Schema({
    title: { type : String , required : true},
    slug: { type : String , required : true, unique:true},
    desc: { type : String , required : true},
    img: { type : String , required : true},
    author: { type : String , required : true},
    year: { type : String },
    price: { type : Number , required : true},
    availableQuantity: { type : Number , required : true},
  },
  {timestamps:true});

  mongoose.models = {}
  export default mongoose.model("Book",BookSchema);
  // export default mongoose.models("Book",BookSchema);
  // module.exports = mongoose.model('Book', BookSchema);