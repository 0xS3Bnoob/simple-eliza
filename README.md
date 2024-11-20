# Ingozi Chat API

A simple chat API for Ingozi, a wise and friendly lion spirit powered by the Groq API.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Groq API key:
```
GROQ_API_KEY=your_api_key_here
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### POST /api/chat
Send a message to Ingozi.

Request body:
```json
{
  "message": "Your message here"
}
```

Response:
```json
{
  "response": "Ingozi's response here"
}
```

## Integration

To integrate with your website, make POST requests to the chat endpoint:

```javascript
const response = await fetch('YOUR_API_URL/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: 'Your message' }),
});

const data = await response.json();
console.log(data.response);
```

## Environment Variables

- `GROQ_API_KEY`: Your Groq API key
- `PORT`: (Optional) Port number (defaults to 3000)
