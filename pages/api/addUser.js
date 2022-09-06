// Next.js API route support: https://nextjs.org/docs/api-routes/inBooksion
import User from "../models/User";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == 'POST') {
    //console.log(req.body)
    
      let nu = new User(req.body)
      await nu.save();
    
    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
