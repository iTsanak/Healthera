import { createContext, useContext, useMemo, useState } from "react";

type SessionContextType = {
  isLoggedIn: boolean;
  signIn: (user: any) => void;
  singOut: () => void;
  singUp: (user: any) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export function SessionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = () => setIsLoggedIn(true);
  const singOut = () => setIsLoggedIn(false);
  const singUp = (user: any) => {
    console.log("Account created", user);
  };

  const contextMemo = useMemo(
    () => ({ isLoggedIn, signIn, singOut, singUp }),
    [isLoggedIn]
  );

  return (
    <SessionContext.Provider value={contextMemo}>
      {children}
    </SessionContext.Provider>
  );
}
