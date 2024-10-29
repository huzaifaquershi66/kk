const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173' // Change this to your React app's URL
}));
app.use(express.json()); // To parse JSON request bodies

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('./firebaseadminfile.json')),
});

const db = admin.firestore();

// Endpoint to set custom claims for a user
app.post('/set-custom-claim/:uid', async (req, res) => {
  const uid = req.params.uid;
  const { role } = req.body; // Extract role from request body

  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    res.status(200).json({ message: `Custom claims set for user ${uid}` });
  } catch (error) {
    console.error("Error setting custom claims:", error);
    res.status(500).json({ error: 'Failed to set custom claims', details: error.message });
  }
});

// Other endpoints (like fetching users)
// ...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
