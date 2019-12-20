const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const verificationController = require("./controllers/verification");
const messageWebhookController = require("./controllers/messageWebhook");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Making a connection to mongodb with process.env.MONGODB_URI heroku variable
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true },function(err)
  {
    if(err)
    {
      console.log('Connection to DB Failed'+ err);
    }
    else
    {
      console.log('Connection to DB is successfull');
    }
  });
  //Connection Done
app.get("/", verificationController);
app.post("/", messageWebhookController);
app.listen(process.env.PORT || 3000, () => console.log("Webhook server is listening, port 3000"));
