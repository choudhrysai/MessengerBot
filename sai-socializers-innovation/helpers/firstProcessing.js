const processData=require("../model/generateMessageData");
const messageSender=require("./messageSender");
const handOver = require("./handOverProtocol");
const handlerUpdate=require("./dbUpdateHandler");

module.exports = (event,postback_Payload,preferences) =>
{
  var newPayLoad=postback_Payload+"_1";
  var senderId=event.sender.id;
  switch (postback_Payload) {
    case "yes_block_card_video":
    setTimeout(function () {
      var messageJson = processData(newPayLoad,senderId,preferences);
      messageSender.sendMessage(event,messageJson,newPayLoad);
    }, 2000);
    break;
    case "db_block_mobileapp_no":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);
    }, 2000);
    break;
    case "debit_card_block":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);
    }, 2000);

    break;
    // Debit debit_card_unblock process Start
    case "yes_unblock_card_video":
    setTimeout(function () {
      var messageJson = processData(newPayLoad,senderId,preferences);
      messageSender.sendMessage(event,messageJson,newPayLoad);
    }, 2000);
    break;
    case "Webcare_agent_dizzyWoman":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);
    }, 2000);
    break;
    case "webcare_agent_oldSchool":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);
    }, 2000);
    break;
    case "debit_card_unblock":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);
    }, 2000);
    break;
    // Debit debit_card_unblock process End

    //debit card replace starts
    case "yes_replace_card_video":
    setTimeout(function () {
      var messageJson = processData(newPayLoad,senderId,preferences);
      messageSender.sendMessage(event,messageJson,newPayLoad);
    }, 2000);
    break;
    case "db_replace_mobileapp_no":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);
    }, 2000);
    break;
    case "debit_card_replace":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);
    }, 2000);
    break;
    case "End_Chat":
    setTimeout(function () {
      messageSender.sendUserAction(senderId,true);
    }, 100);
    setTimeout(function () {
      messageSender.sendUserAction(senderId,false);
      setTimeout(function () {
        var messageJson = processData(newPayLoad,senderId,preferences);
        messageSender.sendMessage(event,messageJson,newPayLoad);
      }, 500);
    }, 2000);
    break;
    //debit card replace ends
    case "Exit_Bot":
    handlerUpdate.updateFailCount(senderId,3);
    handOver(senderId);
    break;
    case "_nothing":
    handlerUpdate.updateFailCount(senderId,3);
    handOver(senderId);
    break;
  }
}
