const functions = require("firebase-functions");
const Vonage = require('@vonage/server-sdk')
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
let from = "Send Pic Test"
let to = "447804521377"
let text = 'A text message sent using the Vonage SMS API https://google.com'
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
