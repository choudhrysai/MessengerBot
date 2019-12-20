const prefSchema=require("../model/customerPrefModel");

module.exports = {
   updateFailCount : function(senderId,noOfFails)
   {
     var query={_id:senderId};
     prefSchema.findById(senderId, function (err, preferences)
     {
       if(err)
       {
         console.log("Error Occured while finding record by Id"+err);
       }
       else {
         if(noOfFails<3)
         {
           preferences.failCount=noOfFails;
         }
         else if(noOfFails==3){
           preferences.failCount=0;
           preferences.handoverDone=true;
         }
         preferences.save(function(err)
         {
           if(err)
           {
             console.log("Errro While Saving the Privacy Update"+ err);
           }
           else {
             console.log("Data successfull Saved in DB");
           }
         });
       }
     });
   },
   updateLastConversation : function(dbData)
   {
     var timestamp=Date.now();
     dbData.lastConversation=timestamp;
     dbData.save(function(err)
     {
       if(err)
       {
         console.log("Errro While Saving the Privacy Update"+ err);
       }
       else {
         console.log("Data successfull Saved in DB");
       }
     });
   }
 }
