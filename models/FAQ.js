// Starting mongoDB
// import { Schema, models, model } from 'mongoose';
import mongoose  from "mongoose";

const FAQSchema = new mongoose.Schema({
    question: { type : String , required : true , unique: true},
    answer: { type : String , default:""},
    name: { type : String , required : true},
  },
  {timestamps:true});
  // mongoose.models = {}
  // export default mongoose.model("FAQ",BookSchema);
  export default mongoose.models.FAQ || mongoose.model("FAQ",FAQSchema); 
  //If we use the above comment the we dont need to use the line mongoose.models={}
 