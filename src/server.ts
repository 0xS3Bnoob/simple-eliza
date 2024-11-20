import express from 'express';
import cors from 'cors';
import path from 'path';
import { Character } from './character.js';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const port = 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize the character
const character = new Character({
  name: 'Ingozi',
  description: 'A wise and friendly lion spirit',
  personality: [
    'Speaks simply and directly',
    'Focuses on being helpful',
    'Maintains a warm and friendly tone',
    'Sometimes signs messages with "- Ingozi 🦁"'
  ],
  model: 'mixtral-8x7b-32768',
  temperature: 0.7,
  apiKey: process.env.GROQ_API_KEY,
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await character.chat(message);
    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
