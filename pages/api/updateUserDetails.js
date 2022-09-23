import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const token = req.body.token;
    const data = jwt.verify(token, process.env.JWT_Key);
    // console.log(data.email)
    const user = await User.findOneAndUpdate(
      { email: data.email },
      {
        address: req.body.address,
        phone: req.body.phone,
        pincode: req.body.pincode,
        city: req.body.city,
        state: req.body.state,
        name: req.body.name,
      }
    );
    console.log(user);
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "Error" });
  }
};

export default connectDB(handler);
