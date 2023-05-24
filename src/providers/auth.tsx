import React, { useEffect, useState } from "react";

import { useUser } from "@/features/user/hooks/useUser";
import { User } from "@/types";
import storage from "@/utils/storage";

type AuthContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  hasToken?: boolean;
  // refreshUser: () => Promise<void>
  refreshUser: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  setUser: () => {
    console.log("setUser is not implemented");
  },
  refreshUser: () => {
    // return Promise.reject("refreshUser is not implemented")
    console.log("refreshUser is not implemented");
  },
});

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();

  const hasToken = !!storage.getToken();

  const {
    user: userInfo,
    isSuccess,
    isError,
    refetch: refreshUser,
  } = useUser();

  useEffect(() => {
    if (isSuccess) {
      setUser(userInfo);
    }
  }, [isSuccess, userInfo]);

  useEffect(() => {
    if (isError) {
      storage.clearToken();
      window.location.assign(window.location.origin);
    }
  }, [isError]);

  return (
    <AuthContext.Provider value={{ user, hasToken, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(AuthContext);
