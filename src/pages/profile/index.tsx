import {
  Avatar,
  Button,
  Flex, Heading, Text, useColorModeValue
} from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";

type InfoProps = {
  title: string;
  value: string;
};

const Info = ({ title, value }: InfoProps) => {

  return (
    <Flex direction={"column"} px={"1rem"}>
      <Heading
        color={"primaryApp.300"}
        fontWeight={"semibold"}
        fontSize={"1.25rem"}
      >
        {title}
      </Heading>
      <Text
        fontSize={"1.25rem"}
        color={useColorModeValue("gray.800", "gray.100")}
      >
        {value}
      </Text>
    </Flex>
  );
};

export default function Profile() {
  return (
    <>
      <Flex
        direction={'column'}
        py={"1rem"}
        gridGap={"1rem"}
        minHeight={"calc(100vh - 8rem)"}
      >
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          gridGap={"0.5rem"}
          mb={'0.5rem'}
        >
          <Avatar
            boxShadow={"lg"}
            bg={"primaryApp.300"}
            w={"9rem"}
            h={"9rem"}
            src={''}
          />
          <Heading fontSize={"1.875rem"} fontWeight={"semibold"}>Olá, Lucas!</Heading>
        </Flex>
        <Info title="Nome" value="Lucas Santana" />
        <Info title="E-mail" value="ln.santana08@gmail.com" />
        <Info title="Senha" value="Última alteração em: 09 de abril de 2022" />
        <Info title="Data de Nascimento" value="02/08/2022" />
        <Button
          mt={'auto'}
          mx={"1rem"}
          colorScheme={"primaryApp"}
          rightIcon={<FaSignOutAlt />}
          onClick={() => { console.log('handleLogout') }}
        >
          Sair
        </Button>
      </Flex>
    </>
  )
}
