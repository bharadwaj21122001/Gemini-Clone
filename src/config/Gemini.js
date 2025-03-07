import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// console.log("API Key:", import.meta.env.VITE_GEMINI_API_KEY); // For Debugging Purposes Only
const genAI = new GoogleGenerativeAI(apiKey);
// console.log(genAI)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    const responseText = result.response.text();

    console.log("Gemini Response:", responseText);
    return responseText;
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    return "An error occurred while processing your request.";
  }
}

export default run;