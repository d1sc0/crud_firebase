const functions = require('firebase-functions');
const Vonage = require('@vonage/server-sdk');
const config = functions.config();
const vonageKey = config.env.vonage.apiKey
const vonageSecret = config.env.vonage.apiSecret
const vonage = new Vonage({
  apiKey: vonageKey,
  apiSecret: vonageSecret
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.sendSMS = functions.https.onRequest((request, response) => {

req = JSON.parse(request.body);
var title = req.sms.title
var from = "SendPics";
var to = req.sms.recipient;
var link = req.sms.link;
var text = `Hello somebody sent you this ${title} picture. You can see it here - ${link}`;

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        response.sendStatus(500)
        functions.logger.info(err, {structuredData: true});
    } else {
        response.sendStatus(200)
        if(responseData.messages[0]['status'] === "0") {
            functions.logger.info("Message sent successfully", {structuredData: true});
        } else {
            response.sendStatus(500)
            functions.logger.info(`Message failed with error: ${responseData.messages[0]['error-text']}`, {structuredData: true});
        }
    }
})

});
