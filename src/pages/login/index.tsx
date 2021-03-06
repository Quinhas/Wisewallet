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
import { LoginForm } from "@components/LoginForm";
import { useRouter } from "next/router";

export default function Login() {
  const { isLogged, signInWithGoogle } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  async function handleGoogleButton() {
    if (!isLogged) {
      await signInWithGoogle();
      router.push("/");
    }
  }

  if (isLogged) {
    router.push("/");
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
          <LightMode>
            <Button
              leftIcon={<FaGoogle />}
              colorScheme={"google"}
              onClick={handleGoogleButton}
              h={"2.875rem"}
              fontWeight={500}
            >
              Login with google
            </Button>
          </LightMode>
          <Flex
            fontSize={"0.875rem"}
            color={colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.500"}
            align={"center"}
            _before={{
              content: `''`,
              flex: 1,
              height: "1px",
              background: `${
                colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.500"
              }`,
              marginRight: "1rem",
            }}
            _after={{
              content: `''`,
              flex: 1,
              height: "1px",
              background: `${
                colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.500"
              }`,
              marginLeft: "1rem",
            }}
          >
            or
          </Flex>
          <LoginForm />
        </Flex>
      </Flex>
    </Flex>
  );
}
