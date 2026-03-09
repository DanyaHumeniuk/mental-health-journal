require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function testConnection() {
    console.log("Checking API Key: ", process.env.GEMINI_API_KEY ? "Key Found" : "Key Missing");
    
    try {
        console.log("--- Attempting to Fetch Available Models ---");
        // Using the listModels method to see what your key has access to
        const models = await ai.models.list();
        console.log("Success! Your key can access these models:");
        models.forEach(m => console.log(`- ${m.name}`));

        console.log("\n--- Testing Content Generation ---");
        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash", 
            contents: [{ role: "user", parts: [{ text: "Hello, are you active?" }] }]
        });
        console.log("AI Response:", result.candidates[0].content.parts[0].text);
        
    } catch (err) {
        console.error("\nDetailed Error Report:");
        console.error("Status Code:", err.status);
        console.error("Message:", err.message);
        console.log("\nPossible Fix: Go to AI Studio and create a 'Key in a NEW project'.");
    }
}

testConnection();