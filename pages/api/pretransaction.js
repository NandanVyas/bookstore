const https = require("https");
// const PaytmChecksum = require("node_modules/paytmchecksum/PaytmChecksum");
const PaytmChecksum = require("paytmchecksum");
import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";
// const express = require('express')
// const app = express()

// const { parse } = require('querystring');

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
// app.set('views', __dirname);
// app.use(express.static('./assets'));

// const port = 8080

// const Config = require("./config");
// var orderId = "Ord_" + Math.floor(Math.random()+ Date.now());

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = async (req, res) => {
  if (req.method == "POST") {
    
    let order = new Order({
      name:req.body.name,
      email: req.body.email,
      orderID: req.body.oid,
      amount: req.body.subTotal,
      products: req.body.cart,
      address:req.body.address,
    });
    await order.save();

    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: process.env.NEXT_PUBLIC_WEBSITE,
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    //console.log(paytmParams);
    //console.log("nandan vyas");
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MERCHANT_KEY
    );
    //console.log("nandan vyas");

    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    const requestAsync = () => {
      return new Promise((resolve, reject) => {
        //working
        var options = {
          /* for Staging */
          hostname: "securegw-stage.paytm.in",
          /* for Production */
          // hostname: 'securegw.paytm.in',
          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            console.log("response :".response);
            resolve(JSON.parse(response).body);
          });
        });
        // console.log(post_req);
        post_req.write(post_data);

        post_req.end();
      });
    };
    let myr = await requestAsync();
    res.status(200).json(myr);
  }
}
export default connectDB(handler);
