// import openai, { ClientOptions } from "openai";

// const openaiApiKey = process.env.OPENAI_API_KEY;
// const openaiInstance = new openai.OpenAI(openaiApiKey as ClientOptions);

// export { openaiInstance as openai };

import OpenAI from 'openai';

// Ensure that the environment variable is properly loaded
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export { openai };
