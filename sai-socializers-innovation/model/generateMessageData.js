const messageSender=require("../helpers/messageSender");
const globalVariablesUtil = require('./globalVariablesUtil');
const exitGify=require('../model/endGifGenerator');

module.exports=(selectedPostback,senderId,preferences) => {
  var returnMessageJson;
  var first_Name="";
  if(preferences)
  {
    first_Name=preferences.firstName;
  }
  if(selectedPostback == 'Deevloper_Getting_Started_tag')
  {
    returnMessageJson={
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          //welcome message
          "text": globalVariablesUtil.m28 + first_Name + globalVariablesUtil.m27,
          "buttons":[
            {
              "type":"postback",
              "title":"Ik heb een vraag",
              "payload":"Choice_exit"
            }
          ]
        }
      }
    };
  }
  else if(selectedPostback=="retry_message")
  {
    returnMessageJson={
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text": globalVariablesUtil.m28 + first_Name + globalVariablesUtil.m34,
          "buttons":[
            {
              "type":"postback",
              "title":"Ik heb een vraag",
              "payload":"Choice_exit"
            }
          ]
        }
      }
    };
  }
  else if(selectedPostback=="Choice_exit")
  {
    returnMessageJson={
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text": globalVariablesUtil.m7 + first_Name + globalVariablesUtil.m8,
          "buttons":[
            {
              "type":"postback",
              "title":"Mijn Betaalpas",
              "payload":"Card_choices"
            },
            {
              "type":"postback",
              "title":"Iets anders",
              "payload":"Webcare_agent_dizzyWoman" //missing block
            }
          ]
        }
      }
    };

  }
  else if(selectedPostback=="Card_choices")
  {
    returnMessageJson={
      text:  globalVariablesUtil.m10 + first_Name+globalVariablesUtil.m11,
      quick_replies:[
        {
          "content_type":"text",
          "title":process.env.PASS_BLOCK_LABEL,
          "payload":"debit_card_block"
        },
        {
          "content_type":"text",
          "title":process.env.PASS_UNBLOCK_LABEL,
          "payload":"debit_card_unblock"
        },
        {
          "content_type":"text",
          "title":process.env.PASS_REPLACE_LABEL,
          "payload":"debit_card_replace"
        }

      ]
    };
  }
  else if(selectedPostback=="debit_card_block")
  {
    returnMessageJson={
      text: globalVariablesUtil.m1,
    };
  }
  else if(selectedPostback=="debit_card_block_1")
  {
    returnMessageJson={
      text: globalVariablesUtil.m2,
      quick_replies:[
        {
          "content_type":"text",
          "title":"Ja",
          "payload":"yes_block_card_video"
        },
        {
          "content_type":"text",
          "title":"Nee",
          "payload":"webcare_agent_oldSchool"
        }

      ]
    };
  }
  else if(selectedPostback=="yes_block_card_video")
  {
    returnMessageJson={
      text: globalVariablesUtil.m3
    }
  }
  else if(selectedPostback=="yes_block_card_video_1")
  {
    returnMessageJson={
      attachment: {
        type: "template",
        payload:
        {
          "template_type": "media",
          "elements": [
            {
              "media_type": "video",
              "attachment_id": process.env.YES_BLOCK_CARD_VIDEO
            }
          ]
        }
      }
    };
  }
  else if(selectedPostback=="yes_block_card_video_2")
  {
    messageSender.sendUserAction(senderId,true);
    returnMessageJson={
      text: first_Name +globalVariablesUtil.m4,
      quick_replies:[
        {
          "content_type":"text",
          "title":"Ja",
          "payload":"Success_block"
        },
        {
          "content_type":"text",
          "title":"Nee",
          "payload":"Webcare_agent_dizzyWoman"
        }
      ]
    };
    messageSender.sendUserAction(senderId,false);
  }
  else if(selectedPostback=="Success_block")
  {
    returnMessageJson={
      text: globalVariablesUtil.m5+ first_Name+globalVariablesUtil.m6,
      quick_replies:[
        {
          "content_type":"text",
          "title":"Ja",
          "payload":"Choice_exit"
        },
        {
          "content_type":"text",
          "title":"Nee",
          "payload":"End_Chat"
        }
      ]
    };
  }
  else if(selectedPostback=="Webcare_agent_dizzyWoman")
  {
    returnMessageJson={
      "attachment": {
        "type": "image",
        "payload":
        {
          "attachment_id": process.env.DIZZY_WOMAN_GIF_MP4
        }
      }
    };
  }
  else if(selectedPostback=="Webcare_agent_dizzyWoman_1")
  {
    returnMessageJson={
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text": globalVariablesUtil.m12+ globalVariablesUtil.m31+globalVariablesUtil.m32,
          "buttons":[
            {
              "type":"postback",
              "title":"Ja, slimmere collega",
              "payload":"_nothing"
            },
            {
              "type":"postback",
              "title":"Stop deze chat",
              "payload":"End_Chat"
            }
          ]
        }
      }
    };
  }
  else if(selectedPostback=="End_Chat")
  {
    var gifyId=exitGify();
    returnMessageJson={
      "attachment": {
        "type": "image",
        "payload":
        {
          //need to replace gif with image for end chat
          "attachment_id": gifyId
        }
      }
    };
  }
  else if(selectedPostback=="End_Chat_1")
  {
    returnMessageJson={
      "text": globalVariablesUtil.m16
    };
  }
  else if(selectedPostback=="webcare_agent_oldSchool")
  {
    returnMessageJson={
      "attachment": {
        "type": "image",
        "payload":
        {
          "attachment_id": process.env.OLD_SCHOOL_GIF_MP4
        }
      }

    };
  }
  else if(selectedPostback=="webcare_agent_oldSchool_1")
  {
    returnMessageJson={
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text": globalVariablesUtil.m14 +globalVariablesUtil.m31+ globalVariablesUtil.m32,
          "buttons":[
            {
              "type":"postback",
              "title":"Ja, slimmere collega",
              "payload":"_nothing"
            },
            {
              "type":"postback",
              "title":"Stop deze chat",
              "payload":"End_Chat"
            }
          ]
        }
      }
    };
  }
  else if(selectedPostback=="chat_agent")
  {
    returnMessageJson={
      text: globalVariablesUtil.m29 + first_Name + globalVariablesUtil.m30
    };
  }
  else if(selectedPostback=="yes_end_flow")
  {
    returnMessageJson={
      text: 'Dag '+first_Name+ globalVariablesUtil.m13 //i guess random gifs 1-10 needs to show
    };
  }

  // debit_card PASS_UNBLOCK flow Start
  else if(selectedPostback=="debit_card_unblock")
  {
    returnMessageJson={
      text: globalVariablesUtil.m29 + first_Name + globalVariablesUtil.m30,
    };
  }
  else if(selectedPostback=="debit_card_unblock_1")
  {
    returnMessageJson={
      text: globalVariablesUtil.m2,
      quick_replies:[
        {
          "content_type":"text",
          "title":"Ja",
          "payload":"yes_unblock_card_video"
        },
        {
          "content_type":"text",
          "title":"Nee",
          "payload":"webcare_agent_oldSchool"
        }

      ]
    };
  }
  else if(selectedPostback=="yes_unblock_card_video")
  {
    returnMessageJson={
      text: globalVariablesUtil.m24
    }
  }
  else if(selectedPostback=="yes_unblock_card_video_1")
  {
    returnMessageJson={
      attachment: {
        type: "template",
        payload:
        {
          "template_type": "media",
          "elements": [
            {
              "media_type": "video",
              "attachment_id": process.env.YES_UNBLOCK_CARD_VIDEO
            }
          ]
        }
      }
    };
  }
  else if(selectedPostback=="yes_unblock_card_video_2")
  {
    messageSender.sendUserAction(senderId,true);
    returnMessageJson={
      text: globalVariablesUtil.m25 + first_Name + globalVariablesUtil.m26,
      quick_replies:[
        {
          "content_type":"text",
          "title":"Ja",
          "payload":"Success_block"
        },
        {
          "content_type":"text",
          "title":"Nee",
          "payload":"Webcare_agent_dizzyWoman"
        }
      ]
    };
    messageSender.sendUserAction(senderId,false);
  }
  //Debit card replace flow starts
  else if(selectedPostback=="debit_card_replace")
  {
    returnMessageJson={
      text: globalVariablesUtil.m19,
    };
  }
  else if(selectedPostback=="debit_card_replace_1")
  {
    messageSender.sendUserAction(senderId,700);
    returnMessageJson={
      text: globalVariablesUtil.m2,
      quick_replies:[
        {
          "content_type":"text",
          "title":"Ja",
          "payload":"yes_replace_card_video"
        },
        {
          "content_type":"text",
          "title":"Nee",
          "payload":"webcare_agent_oldSchool"
        }

      ]
    };
  }
  else if(selectedPostback=="yes_replace_card_video")
  {
    returnMessageJson={
      text: globalVariablesUtil.m20
    };
  }
  else if(selectedPostback=="yes_replace_card_video_1")
  {
    console.log('came inside video block ****'+globalVariablesUtil.m20 +'attacht id is::::'+process.env.YES_REPLACE_CARD_VIDEO);
    text: globalVariablesUtil.m20,
    returnMessageJson={
      attachment: {
        type: "template",
        payload:
        {
          "template_type": "media",
          "elements": [
            {
              "media_type": "video",
              "attachment_id": process.env.YES_REPLACE_CARD_VIDEO
            }
          ]
        }
      }
    };
  }
  else if(selectedPostback=="yes_replace_card_video_2")
  {
    messageSender.sendUserAction(senderId,true);
    returnMessageJson={
      text: first_Name +globalVariablesUtil.m21,
      quick_replies:[
        {
          "content_type":"text",
          "title":"Ja",
          "payload":"Success_block"
        },
        {
          "content_type":"text",
          "title":"Nee",
          "payload":"Webcare_agent_dizzyWoman"
        }

      ]
    };
    messageSender.sendUserAction(senderId,false);
  }
  /*else if(selectedPostback=="Success_block")
  {
    returnMessageJson={
      text: globalVariablesUtil.m5+ first_Name+globalVariablesUtil.m6,
      quick_replies:[
        {
          "content_type":"text",
          "title":"Ja",
          "payload":"Choice_exit"
        },
        {
          "content_type":"text",
          "title":"Nee",
          "payload":"chat_agent"
        }
      ]
    };
  }*/

  else if(selectedPostback=="Exit_Bot")
  {
    returnMessageJson={
      text: "Ik heb een medewerker geïnformeerd, we komen ze snel mogelijk bij je terug"
    };
  }
  return returnMessageJson;
};
