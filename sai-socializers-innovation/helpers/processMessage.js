const moment=require("moment");
const processData=require("../model/generateMessageData");
const dbUpdate=require("./dbUpdateHandler");
const prefSchema=require("../model/customerPrefModel");
const getCustData=require("./getCustomerFbDetails");
const messageSender=require("./messageSender");
const handOver = require("./handOverProtocol");

module.exports = (event,preferences) => {
  console.log('Message Processer',event);
  const senderId = event.sender.id;
  const message = event.message.text;
  var hoursDifference=0;
  if(preferences)
  {
    var lastConvoDate=moment(new Date(preferences.lastConversation).getTime());
    var currentTime=moment(Date.now());
    hoursDifference=moment(currentTime).diff(lastConvoDate, 'hours');
    console.log("hoursDifference",hoursDifference);
    console.log("handover done ?",preferences.handoverDone);
    console.log("fail count ",preferences.failCount);
    if((!preferences.handoverDone && preferences.failCount < 2) || (preferences.handoverDone && hoursDifference > 2))
    {
      console.log("inside first if");
      var i=preferences.failCount+1;
      dbUpdate.updateFailCount(senderId,i);
      var responseMessage=processData("retry_message",senderId,preferences);
      messageSender.sendMessage(event,responseMessage,"");
    }
    else if (preferences.failCount == 2 && !preferences.handoverDone){
      console.log("inside second if");
      dbUpdate.updateFailCount(senderId,3);
      var responseMessage=processData("Exit_Bot",senderId,preferences);
      messageSender.sendMessage(event,responseMessage,"");
      handOver(senderId);
    }
    dbUpdate.updateLastConversation(preferences);
  }
  else {
    prefSchema.findById(senderId, function (err, dbResponse)
    {
      if(err)
      {
        console.log("Error Occured while finding record by Id"+err);
      }
      else if(dbResponse!= null) {
        console.log("fail count log "+dbResponse.failCount);
        if(dbResponse.failCount==null || dbResponse.failCount < 2)
        {
          var i=dbResponse.failCount+1;
          dbUpdate.updateFailCount(senderId,i);
          var responseMessage=processData("retry_message",senderId,dbResponse);
          messageSender.sendMessage(event,responseMessage,"");
        }
        else if (dbResponse.failCount && dbResponse.failCount == 2){
          dbUpdate.updateFailCount(senderId,3);
          var responseMessage=processData("Exit_Bot",senderId,dbResponse);
          messageSender.sendMessage(event,responseMessage,"");
          handOver(senderId);
        }
        dbUpdate.updateLastConversation(preferences);
      }
      else {
        getCustData(event);
      }
    });
  }
};
