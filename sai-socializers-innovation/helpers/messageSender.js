const FACEBOOK_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const request = require("request");

module.exports = {
  sendMessage: function(event, replyMessage,payLoadTag) {
    var senderId=event.sender.id;
    console.log("inside sendMessage",replyMessage);
    console.log("inside sendMessage",senderId);
    if(senderId && replyMessage)
    {
      console.log("Inside message sender if");
      request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs:{
          access_token: FACEBOOK_ACCESS_TOKEN
        },
        method: "POST",
        json:
        {
          recipient: {
            id: senderId
          },
          message:replyMessage
        }
      },
      function (error, response, body) {
        if(error)
        {
          console.log("Error in response",error);
        }
        else {
          console.log("Body of the send messagge API",body);
        }
      });
    }
  },
  sendUserAction: function(senderId,isTypingOn) {
    console.log("sedner Id inside sender action" , senderId);
    var senderActionPref="typing_on";
    if(!isTypingOn)
    {
      senderActionPref="typing_off"
    }
    console.log("inside typing on",new Date());
    request({
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs:{
        access_token: FACEBOOK_ACCESS_TOKEN
      },
      method: "POST",
      json:
      {
        recipient: {
          id: senderId
        },
        sender_action:senderActionPref
      }
    },function (error, response, body) {
      if(error)
      {
        console.log("Error in response",error);
      }
      else {
        console.log("Body of the send messagge API typing on ",body);
      }
    });
  }
};
