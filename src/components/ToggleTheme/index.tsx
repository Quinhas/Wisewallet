import { Button } from "@chakra-ui/button"
import { useColorMode } from "@chakra-ui/color-mode"

export function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Button colorScheme={'complementary'} onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  )
}