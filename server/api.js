import env from "dotenv";
env.config();

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const api = async (text, action) => {
  try {
    const res = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Your task is to strictly perform the given action: ${action}, on the user content.
If action is "translate", then translate into English.
Return only the final result with no markdown, no extra notes, no instructions.

User content: ${text}`,
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Gemini API error:", err);
      return "AI service error. Try again later.";
    }

    const data = await res.json();

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    return result;
  } catch (err) {
    console.error("API call failed:", err);
    return "Service Down! Try again later.";
  }
};

export default api;
