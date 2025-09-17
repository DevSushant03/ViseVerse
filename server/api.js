import env from "dotenv";
env.config();
const api = async (text, action) => {
  console.log("reach");

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
            role: "system",
            content: `Your task is to strictly perform the given action ${action} on the user content.if action is translate the translate in to english Return only the final result with no markdown, no extra notes, no instructions.`,
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
    });

    const data = await res.json();

    const result =
      data?.choices?.[0]?.message?.content || "Unexpected response";

    return result;
  } catch (err) {
    return err.message;
  }
};
export default api;
