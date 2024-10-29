const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setCustomClaim = functions.https.onRequest(async (req, res) => {
    const uid = req.body.uid; // User ID from request body
    const role = req.body.role; // Role from request body

    if (!uid || !role) {
        return res.status(400).send('Missing uid or role');
    }

    try {
        await admin.auth().setCustomUserClaims(uid, { role });
        return res.status(200).send(`Custom claim set for user: ${uid}`);
    } catch (error) {
        console.error("Error setting custom claims:", error);
        return res.status(500).send("Failed to set custom claim");
    }
});
