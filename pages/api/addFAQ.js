// Next.js API route support: https://nextjs.org/docs/api-routes/inBooksion
import FAQ from "../../models/FAQ";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == 'POST') {
    //console.log(req.body)
      let nq = new FAQ({
        question: req.body.question,
        answer: req.body.answer,
        name: req.body.name,
      });
      await nq.save();
    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
