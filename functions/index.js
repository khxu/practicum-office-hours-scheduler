const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Listen to Eventbrite webhooks that come in
exports.recordEventbritePayload = functions.https.onRequest((req, res) => {
  const eventbritePayload = req.body;
  console.log(eventbritePayload);
  res.end();
})