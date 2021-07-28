import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "@hooks/useAuth";
import {
  Flex,
  Button,
  useColorMode,
  LightMode,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { DataForm } from "@components/DataForm";

export default function DataFormPage() {
  const { isLogged, signInWithGoogle, user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  async function handleGoogleButton() {
    if (!isLogged) {
      await signInWithGoogle();
      router.push("/");
    }
  }

  return (
    <Flex grow={1} direction={"column"} p={"2rem"}>
      <Flex justify={"flex-end"}>
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant={"outline"}
          colorScheme="primaryApp"
          borderRadius={"md"}
        />
      </Flex>
      <Flex grow={1} align={"center"} justify={"center"}>
        <Flex
          direction={"column"}
          w={"sm"}
          textAlign={"center"}
          gridGap={"2rem"}
          maxW={"22rem"}
        >
          <Flex alignSelf={"center"}>
            <Heading color={"primaryApp.600"}>Wisewallet</Heading>
          </Flex>
          <DataForm
            initialName={user?.name === "Usuário" ? "" : user?.name}
            initialBirthdate={user?.birthdate}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
