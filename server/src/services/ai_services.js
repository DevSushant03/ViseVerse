import api from "../../api.js";

export async function processText(text, action) {
  return api(text, action);
}
