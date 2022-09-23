// Next.js API route support: https://nextjs.org/docs/api-routes/inBooksion
import Book from "../../models/Book";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == 'POST') {
    //console.log(req.body)
    for (let i = 0; i < req.body.length; i++) {
      let nb = new Book({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        img: req.body[i].img,
        author: req.body[i].author,
        category: req.body[i].category,
        price: req.body[i].price,
        availableQuantity: req.body[i].availableQuantity,
      });
      await nb.save();
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
