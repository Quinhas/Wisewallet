import {
  Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, useColorModeValue, useDisclosure, useToast
} from "@chakra-ui/react";
import Menu from "components/Menu";
import ToggleThemeButton from "components/ToggleThemeButton";
import { useRouter } from "next/router";
import { FaBars, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const {
    isOpen, onOpen, onClose
  } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await signOut();
      await router.push("/login");
      toast({
        description: "User logged out successfully.",
        status: "success",
      });
    } catch (error) { }
  };

  return (
    <>
      <Flex
        h={'4rem'}
        backgroundColor={'primaryApp.300'}
        justify={'center'}
        align={'center'}
        boxShadow={"sm"}
        px={"1rem"}
      >
        <Flex grow={1}>
          <Heading color={useColorModeValue('gray.50', 'gray.900')} fontSize={"2rem"}>
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
            borderRadius={"md"}
            color={useColorModeValue('gray.50', 'gray.900')}
            borderColor={useColorModeValue('gray.50', 'gray.900')}
            colorScheme={useColorModeValue('whiteAlpha', 'blackAlpha')}
          />
        </Flex>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("white", "black")}>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Menu />
          </DrawerBody>

          <DrawerFooter justifyContent={"space-between"}>
            <ToggleThemeButton />
            <Button onClick={handleLogout} rightIcon={<FaSignOutAlt />}>
              Sair
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
