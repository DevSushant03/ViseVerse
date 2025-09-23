import env from "dotenv";
env.config();

const api = async (text, action) => {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY, // from your .env
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
      }
    );

    const data = await res.json();

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Service Down! Try again later";

    return result;
  } catch (err) {
    return err.message;
  }
};

export default api;
