// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import React from "react";
import connectDB from "../../middleware/mongoose";
import ForgotPassword from "../../models/ForgotPassword";
import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  // console.log(req.method);
  // console.log(req.body.sendmail)
  if (req.method == "POST") {
    if (req.body.sendmail) {
      // console.log(req.body.email)
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        // console.log("here");
        // const jwt = require("jsonwebtoken");
        var token = jsonwebtoken.sign(
          { email: req.body.email },
          process.env.RP_Key,
          {
            expiresIn: "1d",
          }
        );
        // console.log(token);
        let forgotPassword = new ForgotPassword({
          email: req.body.email,
          token: token,
        });
        let email = `We have sent you this email in response to your request to reset your password on NV Bookstore. 
  
      To reset your password, please follow the link below:
      
      ${process.env.NEXT_PUBLIC_VERCEL_URL}/forgotPassword?token=${token}
      
      We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your Profile Page.
  
      Nandan Vyas`;
        res.status(200).json({ success: true, msg: "Email Sent" ,token:token});
      } else {
        res.status(400).json({ success: "false", error: "Email not found" });
      }
    } else {
      const jwt = require("jsonwebtoken");
      const CryptoJS = require("crypto-js");
      const token = req.body.token;
      // console.log(req.body.token)
      // console.log("i am here");
      // console.log(process.env.RP_Key)
      const data = jwt.verify(req.body.token, process.env.RP_Key);
      let updatedpassword = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.AES_Key
      ).toString();
      // let updatedpassword=req.body.password
      const user = await User.findOneAndUpdate(
        { email: data.email },
        { password: updatedpassword }
      );
      res.status(200).json({ success: true, msg: "Password has been reset" });
    }
  } else {
    res.status(400).json({ success: "false", error: "ERROR" });
  }
}

export default connectDB(handler);
