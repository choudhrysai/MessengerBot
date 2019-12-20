const prefSchema=require("../model/customerPrefModel");
const fbDetails=require("../helpers/getCustomerFbDetails");
const processor= require("../helpers/messageProcessor");

module.exports=(req,res) => {
  console.log("sai test header",req.headers);

  var senderId='';
  if (req.body.object === "page") {
    req.body.entry.forEach(entry => {
      console.log("entry object",JSON.stringify(entry));
      if(entry.messaging)
      {
        entry.messaging.forEach(event => {
          senderId=event.sender.id;
          console.log("Sender event",event);
          if(event.postback || (event.message && ! event.message.is_echo))
          {
            prefSchema.findById(senderId, function (err, preferences)
            {
              if(err)
              {
                console.log("Error Occured while finding record by Id"+err);
                processor(event);
              }
              else if(preferences){
                console.log("Data found from DB"+preferences);
                processor(event,preferences);
              }
              else {
                console.log("Data not find so create a new doc");
                fbDetails(event);
              }
            });
          }
        });
      }
      else if(entry.standby)
      {
          entry.standby.forEach(event => {
            if(event.postback)
            {
              senderId=event.sender.id;
              prefSchema.findById(senderId, function (err, preferences)
              {
                if(err)
                {
                  console.log("Error Occured while finding record by Id"+err);
                  processor(event);
                }
                else if(preferences){
                  console.log("Data found from DB"+preferences);
                  processor(event);
                }
                else {
                  console.log("Data not find so create a new doc");
                  fbDetails(event);
                }
              });
            }
            console.log("standby Event", event);
          });
      }
    });
    res.status(200).end();
  }
};
