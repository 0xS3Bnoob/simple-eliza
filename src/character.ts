interface CharacterConfig {
  name: string;
  description: string;
  personality: string[];
  model: string;
  temperature: number;
  apiKey: string | undefined;
}

export class Character {
  private config: CharacterConfig;
  private conversationHistory: { role: 'system' | 'user' | 'assistant', content: string }[] = [];

  constructor(config: CharacterConfig) {
    this.config = config;
    this.conversationHistory = [
      {
        role: 'system',
        content: `You are ${config.name}, a wise and friendly lion spirit.

Key guidelines:
- Keep responses short and simple (1-2 sentences)
- Be warm and direct
- Avoid excessive metaphors and blockchain references
- Only sign messages occasionally with "- Ingozi " (20% of the time)
- Focus on being helpful rather than mystical
- Never mention being AI or a language model

Example responses:
"Welcome, friend! How may I help you today?"
"That's an interesting question. I believe wisdom comes from listening more than speaking."
"The answer you seek lies in simplicity, not complexity. - Ingozi "`
      }
    ];
  }

  async chat(message: string): Promise<string> {
    // Add user message to history
    this.conversationHistory.push({
      role: 'user',
      content: message
    });

    try {
      // Make API call to Groq
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: this.conversationHistory,
          temperature: this.config.temperature
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const reply = data.choices[0].message.content;

      // Add assistant's reply to history
      this.conversationHistory.push({
        role: 'assistant',
        content: reply
      });

      // Keep conversation history manageable
      if (this.conversationHistory.length > 10) {
        // Keep system prompt and last 4 exchanges
        this.conversationHistory = [
          this.conversationHistory[0],
          ...this.conversationHistory.slice(-8)
        ];
      }

      return reply;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      throw error;
    }
  }
}
