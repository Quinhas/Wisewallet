import {
  IconButton, useColorMode, useColorModeValue
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ToggleThemeButton() {
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Trocar tema"
      icon={useColorModeValue(<FaMoon />, <FaSun />)}
      onClick={toggleColorMode}
      variant={"outline"}
      colorScheme="primaryApp"
      borderRadius={"md"}
    />
  )
}
