const FACEBOOK_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const request = require("request");
const prefModel=require("../model/customerPrefModel");
const processor= require("./messageProcessor");
//const dataUtil=require("../model/customerDataUtil");

module.exports = (event) => {
  const senderId=event.sender.id;
  console.log("Customer id is "+senderId);
  var returnData;
  request({
    url: 'https://graph.facebook.com/'+senderId,
    qs:
    { fields: 'first_name,last_name',
    access_token: FACEBOOK_ACCESS_TOKEN
  },
  method: "get",
},
function (error, response, body) {
  if(error)
  {
    console.log("Error Occured While retriving the Customer Info from FB");
    return returnData;
  }
  else {
    var res=JSON.parse(response.body);
    var fail=0;
    if(response.statusCode == 200)
    {
      if(event.message && event.message.text && event.message.quick_reply == null)
      {
        fail=1;
      }
      var newData=new prefModel(
        {
          _id : res.id,
          firstName : res.first_name,
          lastName : res.last_name,
          fullName : res.first_name +" "+ res.last_name,
          failCount : fail,
          lastConversation : new Date().getTime(),
          handoverDone:false
        });
        prefModel.create(newData, function (err, preferences) {
          if (err)
          {
            console.log("Error Occured " + err);
          }
          else {
            //dataUtil.save(preferences);
            processor(event,preferences);
          }
        });
      }
      else {
        console.log("Error in Response",JSON.parse(data));
      }
    }
  });
}
