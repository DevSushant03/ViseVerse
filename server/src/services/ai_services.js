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
