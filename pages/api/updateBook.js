// Next.js API route support: https://nextjs.org/docs/api-routes/inBooksion
import Book from "../../models/Book";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      let nb = await Book.findByIdAndUpdate(req.body[i]._id, req.body[i]);
    }
    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
//   let books = await Book.find();
//   res.status(200).json({ books });
// };

export default connectDB(handler);
