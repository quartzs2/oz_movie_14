import { createContext } from "react";

export const AuthContext = createContext({
  isLoading: true,
  signOut: async () => {},
  user: null,
});
