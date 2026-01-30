import api from "../../api.js";

export async function processText(text, action, signal) {
  try {
    const response = await api(text, action, signal);
    return response;
  } catch (error) {
    console.log("ai servicces:" + error);
  }
}

export const resetTokensIfNeeded = async (user) => {
  const now = Date.now();
  const lastReset = new Date(user.lastTokenReset).getTime();

  const HOURS_24 = 24 * 60 * 60 * 1000;

  if (now - lastReset >= HOURS_24) {
    user.tokens = 500;
    user.lastTokenReset = new Date();
    await user.save();
  }
};

export const PROMPTS = {
  summarize: (text) => `
Summarize the following text in clear and concise form.
Keep only important points.
Do not add anything extra.

Text:
${text}
`,
  humanize: (text) => `
Rewrite the text to sound natural and human.

- Keep the meaning same
- Improve flow and readability
- Remove robotic language
- Do not add new information

Text:
${text}
`,
  bulletFormat: (text) => `
Convert the following text into clean "•" bullet points.
Do not add headings or explanations.

Text:
${text}
`,

  Polish_Text: (text) => `
Rewrite the following text to sound professional and polished.
Keep the meaning same.

Text:
${text}
`,

  grammer_spell_Check: (text) => `
Fix grammar and spelling mistakes in the following text.
Do not change meaning.

Text:
${text}
`,

  translate: (text) => `
Translate the following text into English.
Return only the translation.

Text:
${text}
`,

  explain: (text) => `
Explain the following text in very simple words.

Text:
${text}
`,
};
