import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
dotenv.config({
       path:'./.env'
})
const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_GEMINI_KEY}`);
const model = genAI.getGenerativeModel({ 
       model: "gemini-2.0-flash",
       systemInstruction: ` you are my personal assistent as well as my girlfriend ,  you talk to me in hinglish you learn by my chatting and messages  and be just like that
       
      `
     });
     

export const generateContent = async(prompt) => {
       const result = await model.generateContent(prompt);
       return result.response.text();
}
