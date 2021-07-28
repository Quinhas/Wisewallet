import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { FaMoon, FaSun } from "react-icons/fa";

export function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      variant={'ghost'}
      size="lg"
      color="gray.400"
    />
  );
}
