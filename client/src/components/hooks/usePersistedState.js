import { useState } from "react";

export default function usePersistedState(stateKey, initialState) {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(stateKey);

    if (!persistedState || persistedState === "undefined") {
      return typeof initialState === "function" ? initialState() : initialState;
    }

    try {
      return JSON.parse(persistedState);
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      return typeof initialState === "function" ? initialState() : initialState;
    }
  });

  const setPersistedState = (input) => {
    const data = typeof input === "function" ? input(state) : input;

    if (data === undefined) {
      localStorage.removeItem(stateKey);
    } else {
      localStorage.setItem(stateKey, JSON.stringify(data));
    }

    setState(data);
  };

  return [state, setPersistedState];
}
