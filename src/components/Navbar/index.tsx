import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  LightMode,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Menu from "@components/Menu";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";
import { FaBars, FaMoon, FaSignOutAlt, FaSun } from "react-icons/fa";

export function Navbar() {
  const { isLogged, signOut } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await router.push("/");
      await signOut();
      toast({
        description: "User logged out successfully.",
        status: "success",
      });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
      });
    }
  };

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
    <>
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
          <IconButton
            aria-label="Menu"
            fontSize={"1.25rem"}
            icon={<FaBars />}
            onClick={onOpen}
            variant={"outline"}
            colorScheme="primaryApp"
            borderRadius={"md"}
          />
        </Flex>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={colorMode === "light" ? "white" : "black"}>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Menu />
          </DrawerBody>

          <DrawerFooter justifyContent={"space-between"}>
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant={"outline"}
              colorScheme="primaryApp"
              borderRadius={"md"}
            />
            <Button onClick={handleLogout} rightIcon={<FaSignOutAlt />}>
              Log out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
