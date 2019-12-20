const request = require("request");
const FACEBOOK_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const secondary_App_Id=process.env.SECONDARY_APP_ID;

module.exports=(senderId)=>
{
  var options = { method: 'POST',
  url: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
  qs: { access_token: FACEBOOK_ACCESS_TOKEN },
  headers:
   {
     'content-type': 'application/json'
   },
  body:
   { recipient: { id: senderId },
     target_app_id: secondary_App_Id,
     metadata: 'Handing over from Bot to Agent' },
  json: true };

request(options, function (error, response, body) {
  if (error)
  {
    console.log("Handover failed");
  }
  else {
    console.log("Handover Successfull");
    console.log(body);
  }
});
}
