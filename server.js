// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config(); // To load API_KEY from .env

const app = express();
app.use(cors());
app.use(express.json());

const HUGGING_FACE_API = 'https://api-inference.huggingface.co/models/gpt2';
const API_KEY = process.env.HF_API_KEY; // Store your key in .env file

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await fetch(HUGGING_FACE_API, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: message })
        });

        const data = await response.json();
        if(data && data[0] && data[0].generated_text){
            res.json({ reply: data[0].generated_text });
        } else {
            res.json({ reply: "Sorry, I couldn't generate a response." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ reply: "Error connecting to AI. Please try again later." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
