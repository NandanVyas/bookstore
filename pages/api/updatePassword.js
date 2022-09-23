import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const token = req.body.token;
    const data = jwt.verify(token, process.env.JWT_Key);
    // console.log(data)
    const myuser = await User.findOne({ email: data.email });
    // console.log(myuser)
    let bytes = CryptoJS.AES.decrypt(myuser.password, process.env.AES_Key);
    let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (decryptedPassword == req.body.password) {
      if (req.body.newpassword == req.body.confirmnewpassword) {
        // console.log(data)
        //   console.log(req.body.password);
        let updatedpassword = CryptoJS.AES.encrypt(
          req.body.newpassword,
          process.env.AES_Key
        ).toString();
        // console.log(updatedpassword)
        // console.log(process.env.AES_Key)
        // console.log("secret123")
        // let bytes = CryptoJS.AES.decrypt(updatedpassword, process.env.AES_Key);
        // let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(decryptedPassword)
        const user = await User.findOneAndUpdate(
          { email: data.email },
          { password: updatedpassword }
        );
        res.status(200).json({ success: true });
      } else {
        res.status(200).json({ success: false, error: "Passwords do not match" });
      }

      // console.log(user);
    } else {
      res.status(200).json({ success: false, error: "Incorrect Password" });
    }
  } else {
    res.status(400).json({ error: "Error" });
  }
};

export default connectDB(handler);
