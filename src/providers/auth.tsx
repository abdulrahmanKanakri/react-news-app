import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getUser } from "@/features/user/api/getUser";
import { User } from "@/types";
import storage from "@/utils/storage";

type AuthContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  hasToken?: boolean;
};

export const AuthContext = React.createContext<AuthContextType>({
  setUser: () => {
    console.log("setUser is not implemented");
  },
});

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();

  const hasToken = !!storage.getToken();

  const { data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    enabled: hasToken,
    onError: () => {
      storage.clearToken();
      window.location.assign(window.location.origin);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data.user);
    }
  }, [isSuccess, data]);

  return (
    <AuthContext.Provider value={{ user, hasToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(AuthContext);
