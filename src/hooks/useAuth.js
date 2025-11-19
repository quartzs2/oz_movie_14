import { AuthContext } from "@contexts";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 내에서만 사용할 수 있습니다.");
  }

  return context;
}
