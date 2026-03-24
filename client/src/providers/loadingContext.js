import { createContext, useContext } from "react";

export const LoadingContext = createContext(null);

export function useLoading() {
  return useContext(LoadingContext);
}
