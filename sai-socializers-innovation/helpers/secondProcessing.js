const processData=require("../model/generateMessageData");
const messageSender=require("./messageSender");
const handOver = require("./handOverProtocol");

module.exports = (event,postback_Payload,preferences) =>
{
  var newPayLoad=postback_Payload+"_2";
  var senderId=event.sender.id;
  switch (postback_Payload) {
    case "yes_block_card_video":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);

    }, 15000);
    break;
    // Debit debit_card_unblock process Start
    case "yes_unblock_card_video":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);
    }, 15000);
    break;
    case "yes_replace_card_video":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);
    }, 15000);
    break;
  }
}
