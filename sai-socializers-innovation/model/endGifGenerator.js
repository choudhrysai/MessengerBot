module.exports= ()=>
{
  var attachmentId="";
  var max=10;
  var min=1;
  var i=Math.floor(Math.random()*(max-min+1)+min);
  console.log("switch number to",i);
  switch (i)
  {
    case 1:
      attachmentId=process.env.END_GIF_1;
    break;
    case 2:
      attachmentId=process.env.END_GIF_2;
    break;
    case 3:
      attachmentId=process.env.END_GIF_3;
    break;
    case 4:
      attachmentId=process.env.END_GIF_4;
    break;
    case 5:
      attachmentId=process.env.END_GIF_5;
    break;
    case 6:
      attachmentId=process.env.END_GIF_6;
    break;
    case 7:
      attachmentId=process.env.END_GIF_7;
    break;
    case 8:
      attachmentId=process.env.END_GIF_8;
    break;
    case 9:
      attachmentId=process.env.END_GIF_9;
    break;
    case 10:
      attachmentId=process.env.END_GIF_10;
    break;
  }
  console.log("Selected if"+attachmentId);
  return attachmentId;
}
