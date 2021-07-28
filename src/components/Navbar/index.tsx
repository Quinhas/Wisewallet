import {
  Button,
  Flex,
  Heading,
  IconButton,
  LightMode,
  useColorMode,
} from "@chakra-ui/react";
import { useAuth } from "@hooks/useAuth";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function Navbar() {
  const { isLogged } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  if (!isLogged) {
    return (
      <Flex
        backgroundColor={colorMode === "light" ? "white" : "black"}
        justify={"center"}
        align={"center"}
        px={"1rem"}
        h={"4rem"}
        boxShadow={"sm"}
      >
        <Flex grow={1}>
          <Heading color={"primaryApp.600"} fontSize={"1.875rem"}>
            Wisewallet
          </Heading>
        </Flex>
        <Flex>
          <Button colorScheme={"primaryApp"} size={"sm"}>
            Login
          </Button>
        </Flex>
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant={"outline"}
          colorScheme="primaryApp"
          borderRadius={"md"}
        />
      </Flex>
    );
  }

  return (
    <Flex
      backgroundColor={colorMode === "light" ? "white" : "black"}
      justify={"center"}
      align={"center"}
      px={"1rem"}
      h={"4rem"}
      boxShadow={"sm"}
    >
      <Flex grow={1}>
        <Heading color={"primaryApp.600"} fontSize={"1.875rem"}>
          Wisewallet
        </Heading>
      </Flex>
      <Flex>
        <LightMode>
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant={"outline"}
            colorScheme="primaryApp"
            borderRadius={"md"}
          />
        </LightMode>
      </Flex>
    </Flex>
  );
}
