import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import questions from "../data/questions.json";
import columns from "../data/columns.json";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [mistakes, setMistakes] = useLocalStorage("mistakes", []);
  const value = {
    questions,
    columns,
    mistakes,
    addMistake: (id) => {
      if (!mistakes.includes(id)) setMistakes([...mistakes, id]);
    },
    clearMistakes: () => setMistakes([])
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
