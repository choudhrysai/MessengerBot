const processData=require("../model/generateMessageData");
const messageSender=require("./messageSender");
const firstProcessing=require("./firstProcessing");
const secondProcessing=require("./secondProcessing");
const handlerUpdate=require("./dbUpdateHandler");

module.exports = (event,isPostback,preferences) => {
  const senderId = event.sender.id;
	var payLoadTag="";
	if(isPostback)
	{
		payLoadTag = event.postback.payload;
	}
	else {
		payLoadTag=event.message.quick_reply.payload;
	}
	console.log("payLoadTag"+payLoadTag);

  if (payLoadTag !=null && payLoadTag !="") {

    var messageJson=processData(payLoadTag,senderId,preferences);
    messageSender.sendMessage(event,messageJson,payLoadTag);
    setTimeout(function () {
      firstProcessing(event,payLoadTag,preferences);
    }, 10);
    setTimeout(function () {
      secondProcessing(event,payLoadTag,preferences);
    }, 10);
    handlerUpdate.updateLastConversation(preferences);
  }
};
