const processPostbacks=require("./processPostbacks");
const processMessage=require("./processMessage");

module.exports=(event,preferences)=>{
  if (event.message != null && event.message.attachments != null) {
    console.log("raj ");
  }
  else if (event.postback != null && event.postback.payload) {
    processPostbacks(event,true,preferences);
  }
  else if(event.message && event.message.text){
    if(event.message.quick_reply != null)
    {
      processPostbacks(event,false,preferences);
    }
    else if(!event.message.is_echo)
    {
      processMessage(event,preferences);
    }
  }
}
