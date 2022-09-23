import User from "../../models/User";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const jwt = require('jsonwebtoken');
    const token = req.body.token;
    const data = jwt.verify(token, process.env.JWT_Key);
    // console.log(data.email)
    const user = await User.findOne({ email: data.email });
    // console.log(user);
    res.status(200).json({ user });
  } else {
    res.status(400).json({ error: "Error" });
  }
};

export default connectDB(handler);
