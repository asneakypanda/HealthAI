import axios from 'axios';

const API_KEY = '';
const openAiUrl = 'https://api.openai.com/v1/completions';

export const getAiResponse = async (prompt: string): Promise<string | null> => {
  try {
    const response = await axios.post(
      openAiUrl,
      {
        model: "gpt-3.5-turbo-instruct", // Specify the model
        prompt: prompt,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    if (axios.isAxiosError(error) && error.response) {
      // This logs more detailed info about the API error
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    return null;
  }
};

