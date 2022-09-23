// Next.js API route support: https://nextjs.org/docs/api-routes/inBooksion
import Book from "../../models/Book"
import connectDB from "../../middleware/mongoose"

const handler= async(req, res) =>{
    let books = await Book.find()
    res.status(200).json({ books })
}

export default connectDB(handler);
  