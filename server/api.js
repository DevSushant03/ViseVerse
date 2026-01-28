import env from "dotenv";
import { PROMPTS } from "../server/src/services/ai_services.js";

env.config();

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-4o-mini";

const api = async (text, action, signals) => {
  try {
    if (!PROMPTS[action]) {
      return "Invalid AI action";
    }

    const prompt = PROMPTS[action](text);

    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Resume Maker AI",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a strict text processing tool. You return only the final result.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.1, 
        signal: signals,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenRouter API error:", err);
      return "AI service error. Try again later.";
    }

    const data = await res.json();

    const result =
      data?.choices?.[0]?.message?.content?.trim() || "No response from AI";

    return result;
  } catch (err) {
    console.error("API call failed:", err);
    return "Service Down! Try again later.";
  }
};

export default api;
