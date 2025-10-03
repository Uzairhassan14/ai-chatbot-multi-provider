import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });
console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY?.slice(0, 10));

const app = express();
app.use(express.json());

// OpenAI (needs key)
app.post("/api/openai", async (req, res) => {
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: req.body.messages || [
          { role: "user", content: req.body.prompt },
        ],
      }),
    });
    const data = await r.json();
    res.json({ text: data?.choices?.[0]?.message?.content || "" });
  } catch (e) {
    res.status(500).json({ error: "OpenAI error" });
  }
});

// Gemini (needs key)
// app.post("/api/gemini", async (req, res) => {
//   try {
//     clg("Gemini request received");
//     const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: req.body.prompt }] }]
//       }),
//     });
//     const data = await r.json();
//     res.json({ text: data?.candidates?.[0]?.content?.parts?.[0]?.text || "" });
//   } catch (e) {
//     res.status(500).json({ error: "Gemini error" });
//   }
// });
// app.post("/api/gemini", async (req, res) => {
//   try {
//     console.log("Gemini request received");
//     const r = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${"AIzaSyD3CMZaqHII1gV1-Coz-Nm0uS6TR12s8IQ"}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: "user",
//               parts: [{ text: req.body.prompt }],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await r.json();
//     console.log("Gemini Response:", JSON.stringify(data, null, 2));

//     if (data.error) {
//       return res.status(400).json({ error: data.error.message });
//     }

//     const text =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "⚠️ Gemini: No response";
//     res.json({ text });
//   } catch (e) {
//     console.error("Gemini error:", e);
//     res.status(500).json({ error: "Gemini error" });
//   }
// });
app.post("/api/gemini", async (req, res) => {
  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: req.body.prompt }],
            },
          ],
        }),
      }
    );

    const data = await r.json();
    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Gemini: No response";
    res.json({ text });
  } catch (e) {
    console.error("Gemini error:", e);
    res.status(500).json({ error: "Gemini error" });
  }
});

// Free HuggingFace model
app.post("/api/free", async (req, res) => {
  try {
    const r = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: req.body.prompt }),
      }
    );
    const data = await r.json();
    res.json({ text: data[0]?.generated_text || "" });
  } catch (e) {
    res.status(500).json({ error: "Free model error" });
  }
});

app.listen(3001, () =>
  console.log("Server listening on http://localhost:3001")
);
