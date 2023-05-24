import React, { useEffect } from "react";

import { useUser } from "@/features/user/hooks/useUser";
import { User } from "@/types";
import storage from "@/utils/storage";

type AuthContextType = {
  user?: User;
  hasToken?: boolean;
  refreshUser: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  refreshUser: () => {
    console.log("refreshUser is not implemented");
  },
});

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const hasToken = !!storage.getToken();

  const {
    user,
    isError,
    refetch: refreshUser,
  } = useUser({ enabled: hasToken });

  useEffect(() => {
    if (isError) {
      storage.clearToken();
      window.location.assign(window.location.origin);
    }
  }, [isError]);

  return (
    <AuthContext.Provider value={{ user, hasToken, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(AuthContext);
