"use client";
import { defaultState } from "@/defaultStates/defaultState";
import { globalReducer } from "@/reducers/globalReducer";
import { useReducer, createContext } from "react";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(globalReducer, defaultState);
  return (
    <GlobalContext.Provider value={{ globalState, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
