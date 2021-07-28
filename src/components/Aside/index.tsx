import {
  Flex,
  Heading,
  Text,
  Image,
  useColorMode,
  useBreakpointValue,
  Button,
  IconButton,
  LightMode,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FaChalkboardTeacher,
  FaMoon,
  FaSignOutAlt,
  FaSun,
} from "react-icons/fa";
import { useAuth } from "src/hooks/useAuth";

type AsideProps = {
  heading?: string;
  text?: string;
  image?: string;
};

export function Aside({
  heading = "Have a smart financial control",
  text = "Track your spending and manage your money in a wise, fast and easy way!",
}: AsideProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { user, signOut } = useAuth();
  const toast = useToast();
  const router = useRouter();

  async function handleSignOutButton() {
    try {
      router.push("/login");
      await signOut();
      toast({
        description: "User logged out successfully.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: "Unable to complete the operation. Try again.",
        status: "error",
        isClosable: true,
      });
    }
  }

  return (
    <Flex
      flex={7}
      direction={"column"}
      justify={"space-between"}
      bg={"primaryApp.500"}
      gridGap={{ base: "1rem", md: "2rem" }}
      p={"3rem"}
      maxH={"100vh"}
    >
      <Flex gridGap={"0.5rem"}>
        {user && (
          <LightMode>
            <Button
              leftIcon={<FaSignOutAlt />}
              bg={colorMode !== "light" ? "whiteAlpha.800" : "blackAlpha.800"}
              colorScheme={colorMode !== "light" ? "white" : "blackAlpha"}
              color={"secondaryApp.500"}
              onClick={handleSignOutButton}
              fontWeight={500}
              variant={"solid"}
            >
              Sair
            </Button>
            <Button
              leftIcon={<FaChalkboardTeacher />}
              colorScheme={"secondaryApp"}
              onClick={() => router.push("/")}
              fontWeight={500}
            >
              Minhas Salas
            </Button>
          </LightMode>
        )}
        <IconButton
          aria-label="Toggle Theme"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          colorScheme={colorMode !== "light" ? "white" : "blackAlpha"}
          bg={colorMode !== "light" ? "whiteAlpha.800" : "blackAlpha.800"}
          color={colorMode !== "light" ? "blackAlpha.800" : "whiteAlpha.800"}
          variant={"solid"}
          borderRadius={"md"}
        />
      </Flex>
      <Flex flexDirection={"column"} justify={"center"} gridGap={"1rem"}>
        {/* {!isMobile && (
          <Image
            src={image}
            maxW={"14rem"}
            alt="Ilustração simbolizando perguntas e respostas"
          />
        )} */}
        <Heading
          fontWeight="700"
          fontSize={"2.5rem"}
          lineHeight={"2.625rem"}
          color={colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"}
        >
          {heading}
        </Heading>
        <Text
          fontSize={"1.5rem"}
          lineHeight={"2rem"}
          color={colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"}
        >
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}
