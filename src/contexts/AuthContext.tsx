import { Text, Flex, Spinner, useColorMode } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { auth, database, firebase } from "@services/firebase";
import Router from "next/router";

type User = {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  lastPasswordChange?: string;
  birthdate: string;
  currency: string;
  language: "pt-BR" | "en-US";
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
    name: string,
    birthdate: string
  ) => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  isLogged: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        const { displayName, photoURL, uid, email } = user;
        const newUser = {
          id: uid,
          name: displayName || "Usuário",
          avatar: photoURL?.split("=")[0] || undefined,
          email: email,
        };

        await database.ref(`users/${newUser.id}`).update(newUser);
        const firebaseUser = (
          await database.ref(`users/${newUser.id}`).once("value")
        ).val();
        if (firebaseUser.name === "Usuário" || !firebaseUser.birthdate) {
          await Router.replace("/dataForm");
          console.warn("Nao tem dados");
        }
        const updatedUser = {
          id: firebaseUser.id,
          name: firebaseUser.name,
          avatar: firebaseUser.avatar,
          language: firebaseUser.language,
          email: firebaseUser.email,
          birthdate: firebaseUser.birthdate,
          currency: firebaseUser.currency,
        };
        setUser(updatedUser);
        setIsLogged(true);
        setLoading(false);
      } else {
        Router.replace("/login");
        setIsLogged(false);
        setUser(undefined);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function createUserWithEmailAndPassword(
    email: string,
    password: string,
    name: string,
    birthdate: string
  ) {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    if (result.user) {
      await result.user.updateProfile({
        displayName: name,
      });
      const { displayName, photoURL, uid } = result.user;

      const newUser: User = {
        id: uid,
        name: displayName || name,
        avatar: photoURL || undefined,
        language: "en-US",
        email: email,
        birthdate: birthdate,
        currency: "USD",
      };

      await database.ref(`/users/${newUser.id}`).update(newUser);

      setUser(newUser);
      setIsLogged(true);
    }
  }

  async function signInWithEmailAndPassword(email: string, password: string) {
    await auth.signInWithEmailAndPassword(email, password);
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  }

  async function signOut() {
    await auth.signOut();
    setIsLogged(false);
  }

  if (loading) {
    return (
      <Flex w={"100vw"} h={"100vh"} align={"center"} justify={"center"}>
        <Flex
          direction={"column"}
          align="center"
          gridGap={"1.5rem"}
          bg={colorMode === "light" ? "white" : "black"}
          boxShadow={"md"}
          py={"2rem"}
          px={"4rem"}
          borderRadius={"md"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text color="gray.500">Carregando...</Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        isLogged,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
