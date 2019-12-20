const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var prefSchema =new mongoose.Schema(
  {
    _id: String,
    activeConversation: Boolean,
    priavcyAccepted: Boolean,
    handoverDone: Boolean,
    firstName: String ,
    lastName: String,
    fullName: String,
    dateTimeStamp :Date,
    failCount : Number,
    lastBlockName : String,
    privacyAcceptedDate :Date,
    lastConversation : Date
  },
  { _id: false
  });

  var prefModel= mongoose.model('prefSchema', prefSchema,process.env.DB_COLLECTION_NAME);
  module.exports = prefModel;
