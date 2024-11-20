import { config } from 'dotenv';
import { Character } from './character.js';

// Load environment variables
config();

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

// Simple CLI chat interface
async function chat() {
  console.log('🦁 Ingozi: Greetings, seeker of wisdom. I am Ingozi, a lion spirit dwelling in the digital savannah.');
  
  // Create readline interface
  const readline = (await import('readline')).createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Chat loop
  const askQuestion = () => {
    readline.question('You: ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('🦁 Ingozi: May the stars guide your path through both digital and natural realms.');
        readline.close();
        return;
      }

      try {
        const response = await character.chat(input);
        console.log(`🦁 Ingozi: ${response}`);
      } catch (error) {
        console.error('Error:', error);
      }

      askQuestion();
    });
  };

  askQuestion();
}

// Start the chat
chat();
