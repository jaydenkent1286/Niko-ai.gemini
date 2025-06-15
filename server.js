const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = "AIzaSyBIOqvAwqp-uatK8dFyg_cvsihS76MN9Qw";

app.use(express.static('public'));
app.use(express.json());

app.post('/generate', async (req, res) => {
  try {
    const userPrompt = req.body.prompt;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }]
      })
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    res.json({ reply: text });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate response." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});