import { User } from "@/types/user";
import { createContext, useState } from "react";

interface UserContextData {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext({} as UserContextData);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setMyUser] = useState<User>({} as User);

  const setUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setMyUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
