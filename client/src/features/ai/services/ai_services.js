import api from "@/lib/API/api";

export const sendAiRequest = async ({ text, action, signal }) => {
  const res = await api.post(
    "/aiResponse",
    { text, action },
    { signal }
  );

  
  return res.data;
};