import api from "../../api.js";

export async function processText(text, action) {
  try {
    const response = await api(text, action);
    return response;
  } catch (error) {
    console.log("ai servicces:" + error);
  }
}
