import env from "dotenv";
env.config();
const api = async (text, action) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEKSEEK_KEY}`,
        "X-Title": "SnapGuru",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "user",
            content: `Your task is to strictly perform the action: ${action}, on the following content:\n\n${text}\n\nIf the action is "summarize" or "explain", return the result professionally, with no markdown, no internal thoughts, and no prompt logic. If the action is "translate", translate the content into ${"english"}. Output only the final result. Do not include instructions, tags like <think>, or any additional commentary.`,
          },
        ],
      }),
    });

    const data = await res.json();
    
    const result = data?.choices?.[0]?.message?.content || "Unexpected response";

    return result;
  } catch (err) {
    
    return err.message;
  }
};
export default api;
