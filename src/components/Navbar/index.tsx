import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, Heading } from "@chakra-ui/layout";
import { ToggleTheme } from "../ToggleTheme";

export function Navbar() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Flex
        position={"sticky"}
        zIndex={1}
        w={"full"}
        top={0}
        align={"center"}
        px={"1rem"}
        h={"4rem"}
        backgroundColor={colorMode === "light" ? "white" : "black"}
        shadow={"md"}
        justify={"space-between"}
      >
        <Heading color={"primary.600"}>Wisewallet</Heading>
        <ToggleTheme />
      </Flex>
    </>
  );
}
