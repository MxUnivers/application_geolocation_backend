


// sms.js

const twilio = require('twilio');
const dotenv =  require("dotenv");
dotenv.config();



//TWILIO_ACCOUNT_SSID=
//TWILIO_PASSWORD=
// const accountSid = `${process.env.TWILIO_ACCOUNT_SSID}`;
// const authToken = `${process.env.TWILIO_PASSWORD}`;

const accountSid = 'AC32fa86a39aeb34e3021cf3a07b874757';
  const authToken = '35b938bb6b86ae289704c3a3039fae1d';
const client = twilio(accountSid, authToken);

function envoyerSMS(message, destinataire) {
  return client.messages.create({
    body: message,
    from: '+18722393475',
    to: "+225"+destinataire,
  }).then(msg => console.log(msg.sid)).catch((err)=>{
    console.log(err);
  })
}

module.exports = { envoyerSMS };