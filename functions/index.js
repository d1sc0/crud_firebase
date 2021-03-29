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
let title = request.body.sms.title;
let from = "SendPics";
let to = request.body.sms.recipient;
let link = request.body.sms.link;
let text = `Hello somebody sent you this ${title} picture. You can see it here - ${link}`;
functions.logger.info(to, {structuredData: true});
functions.logger.info(title, {structuredData: true});

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        functions.logger.info(err, {structuredData: true});
    } else {
        if(responseData.messages[0]['status'] === "0") {
            functions.logger.info("Message sent successfully", {structuredData: true});
            response.send("Message sent successfully!");
        } else {
            functions.logger.info(`Message failed with error: ${responseData.messages[0]['error-text']}`, {structuredData: true});
            response.send(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})

});
