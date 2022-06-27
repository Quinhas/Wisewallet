import {
  createContext, ReactNode, useCallback, useEffect, useMemo, useState
} from "react";

interface LoginParams {
  email: string;
  password: string;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  birthdate: string;
}

interface AuthContextProps {
  id: string | undefined;
  user: UserProps | undefined;
  isLogged: boolean;
  signIn: ({ email, password }: LoginParams) => boolean;
  signOut: () => boolean;
  signUp: () => boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({
} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [id, setId] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserProps | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    console.log("oi");
  }, [])

  useEffect(() => {
    setIsLoading(true);
    setIsLogged(true);
    setIsLoading(false);
  }, [isLogged])

  const signIn = useCallback(({ email, password }: LoginParams) => {
    return true;
  }, []);

  const signOut = useCallback(() => {
    return true;
  }, []);

  const signUp = useCallback(() => {
    return true;
  }, [])

  const value = useMemo(() => ({
    id, user, isLogged, signIn, signOut, signUp
  }), [id, user, isLogged, signIn, signOut, signUp])

  // if (!isLoading) {
  //   return (
  //     <>
  //       <h1>Loading...</h1>
  //     </>
  //   )
  // }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
