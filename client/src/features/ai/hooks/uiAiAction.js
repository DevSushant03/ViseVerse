// useAiActions.js

import { useState, useRef } from "react";
import { sendAiRequest } from "../services/ai_services";

export const useAiActions = () => {
  const [result, setResult] = useState("");
  const controllerRef = useRef(null);

  const cancelRequest = () => {
    controllerRef.current?.abort();
  };

  const sendToAi = async (text, action) => {
    controllerRef.current = new AbortController();

    try {
      const data = await sendAiRequest({
        text,
        action,
        signal: controllerRef.current.signal,
      });

      setResult(data.data);
      return { data: data.data, user: data.user };
    } catch (err) {
      if (err.name === "AbortError") {
        setResult("Request cancelled");
      } else {
        setResult("Error processing request");
      }
    }
  };

  return {
    result,
    setResult,
    sendToAi,
    cancelRequest,
  };
};
