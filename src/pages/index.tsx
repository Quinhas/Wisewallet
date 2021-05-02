import { Heading } from "@chakra-ui/layout";
import { ToggleTheme } from "../components/ToggleTheme";

export default function Home() {
  return (
    <>
      <Heading color={'primary.500'}>Olá Mundo!</Heading>
      <ToggleTheme/>
    </>
  )
}
