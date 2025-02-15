import React, { createContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname:string;
  dateofbirth:string;
  tel: string;
  gender:string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
