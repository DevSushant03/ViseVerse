import api from "../../api.js";

export async function processText(text, action ,signal) {
  try {
    const response = await api(text, action,signal);
    return response;
  } catch (error) {
    console.log("ai servicces:" + error);
  }
}
