import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import multer from "multer";
import fs from "fs";

const app = express();
app.use(cors());

// setup image upload folder
const upload = multer({ dest: "uploads/" });

// handle formData (text + optional image)
app.post("/generate", upload.single("image"), async (req, res) => {
    const prompt = req.body.prompt || "";
    let systemMessage = "You are a helpful AI that generates full website code (HTML, CSS, JS) based on the user's description or uploaded design image. Do not explain, only provide code.";

    try {
        // if image uploaded, include instruction
        let userContent = prompt;
        if (req.file) {
            userContent += " Also analyze the uploaded image for layout and design.";
            // optionally, you can pass image as base64 (depends on API support)
            const imageBase64 = fs.readFileSync(req.file.path, { encoding: "base64" });
            userContent += ` Image base64: ${imageBase64}`;
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer YOUR_API_KEY",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                messages: [
                    { role: "system", content: systemMessage },
                    { role: "user", content: userContent }
                ]
            })
        });

        const data = await response.json();
        const code = data.choices[0].message.content;

        // remove uploaded file
        if (req.file) fs.unlinkSync(req.file.path);

        res.json({ code });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("CodeLab AI running on http://localhost:3000"));
