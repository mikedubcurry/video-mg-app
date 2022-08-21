import { AuthContext } from "../stores/authStore";

export const AuthProvider = ({ children, authStore }) => {
  const store = { authStore };
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
