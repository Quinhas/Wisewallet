import { Avatar } from "@chakra-ui/avatar";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, Heading, Text } from "@chakra-ui/layout";

type InfoProps = {
  title: string;
  value: string;
};

const Info = ({ title, value }: InfoProps) => {
  const { colorMode } = useColorMode();
  return (
    <Flex direction={"column"} px={"1rem"}>
      <Heading
        color={"primary.600"}
        fontWeight={"semibold"}
        fontSize={"1.25rem"}
      >
        {title}
      </Heading>
      <Text
        fontSize={"1.25rem"}
        color={colorMode === "light" ? "gray.800" : "gray.100"}
      >
        {value}
      </Text>
    </Flex>
  );
};

export default function Profile() {
  return (
    <Flex
      py={"1rem"}
      direction="column"
      gridGap={"1rem"}
      minHeight={"calc(100vh - 8rem)"}
    >
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        gridGap={"0.5rem"}
        py={"1rem"}
      >
        <Avatar
          boxShadow={"lg"}
          bg={"primary.600"}
          w={"9rem"}
          h={"9rem"}
          src="https://bit.ly/broken-link"
        />
        <Heading fontSize={"1.875rem"} fontWeight={"semibold"}>
          Hi, Lucas!
        </Heading>
      </Flex>
      <Info title={"Name"} value={"Lucas Santana Nunes"} />
      <Info title={"E-mail"} value={"ln.santana08@gmail.com"} />
      <Info title={"Password"} value={"Last change on: April 24, 2021"} />
      <Info title={"Birthdate"} value={"02/08/2002"} />
      <Info title={"Currency"} value={"BRL"} />
      <Info title={"Language"} value={"English"} />
    </Flex>
  );
}
