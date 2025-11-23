// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({ reply: "Message cannot be empty." });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 500,
        });

        const reply = response.choices[0].message.content.trim();
        res.json({ reply });
    } catch (err) {
        console.error("OpenAI API error:", err.response?.data || err.message);
        res.status(500).json({ reply: "Error connecting to AI. Please try again later." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
