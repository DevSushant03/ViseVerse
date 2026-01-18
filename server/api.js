import env from "dotenv";
env.config();

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// You can change this model anytime
const MODEL = "openai/gpt-4o-mini";
// Other good options:
// "deepseek/deepseek-chat"
// "anthropic/claude-3.5-sonnet"
// "google/gemini-2.0-flash"

const api = async (text, action) => {
  try {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000", // or your site
        "X-Title": "Resume Maker AI", // your app name
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "You are a strict text processing assistant.",
          },
          {
            role: "user",
            content: `Your task is to strictly perform the given action: ${action}, on the user content.
If action is "translate", then translate into English.
Return only the final result with no markdown, no extra notes, no instructions.

User content: ${text}`,
          },
        ],
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenRouter API error:", err);
      return "AI service error. Try again later.";
    }

    const data = await res.json();

    const result =
      data?.choices?.[0]?.message?.content || "No response from AI";

    return result;
  } catch (err) {
    console.error("API call failed:", err);
    return "Service Down! Try again later.";
  }
};

export default api;
