const https = require('https');

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.log("API Error:", json.error);
            } else if (json.models) {
                console.log("Available Models:");
                json.models.forEach(m => {
                    if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                        console.log(`- ${m.name}`);
                    }
                });
            } else {
                console.log("Unexpected response:", json);
            }
        } catch (e) {
            console.log("Parse error:", e);
            console.log("Raw data:", data);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
