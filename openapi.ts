import OpenAIApi from "openai";
const openai = new OpenAIApi({
    apiKey: process.env.NEXT_PUBLIC_CHATGPT_API_KEY,
});
export default openai;