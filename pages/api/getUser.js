// Next.js API route support: https://nextjs.org/docs/api-routes/inBooksion
import User from "../../models/User";
import connectDB from "../../middleware/mongoose";

const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    //console.log(req.body)
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_Key);
      let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      //console.log(decryptedPassword);
      if (
        req.body.email == user.email &&
        req.body.password == decryptedPassword
      )
      
      {
        const jwt = require('jsonwebtoken');
        var token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_Key , { expiresIn: '3d' });
        res
          .status(200)
          .json({ success: true, token:token });
      } else {
        res.status(200).json({ success: false, error: "Invalid Password" });
      }
    } else {
      res.status(200).json({ success: false, error: "User Not Found" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
