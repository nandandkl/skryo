const { GoogleGenerativeAI } = require("@google/generative-ai");

const run = async () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const modelsToTest = [
        "gemini-1.5-pro",
        "gemini-1.5-pro-latest",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    for (const modelName of modelsToTest) {
        try {
            console.log(`\nAttempting ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, are you there?");
            console.log(`SUCCESS with ${modelName}:`, result.response.text().slice(0, 50) + "...");
        } catch (e) {
            console.log(`FAILED ${modelName}:`, e.message.split("\n")[0]); // Print first line of error
        }
    }
};

run();
