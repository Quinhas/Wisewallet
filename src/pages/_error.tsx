import {
  Box,
  Button,
  Flex, Heading, Icon, Text
} from "@chakra-ui/react";
import { NextPageContext } from "next";
import Link from "next/link";
import { FaRegFrown } from "react-icons/fa";

export default function CustomError({ statusCode }: { statusCode: number | undefined }) {
  return (
    <>
      <Icon as={FaRegFrown} color={'gray.400'} boxSize={'50rem'} position={'fixed'} top={'20vh'} right={'-15rem'} opacity={'0.2'} zIndex={'-1'} />
      <Flex grow={1} justify={'center'} px={'1rem'} direction={"column"} gap={'0.5rem'} position={'relative'}>
        <Heading fontSize={"7xl"} textColor={"primaryApp.300"}>
          Oops!
        </Heading>
        <Text fontSize={'xl'} maxWidth={'80%'} fontWeight="semibold">
          Algo deu errado.
        </Text>
        <Text maxWidth={'80%'}>
          Ocorreu um erro na aplicação e não conseguimos exibir essa página.
        </Text>
        <Box as={'hr'} maxWidth={'20%'} my={'0.5rem'} />
        <Text fontWeight="medium">Código do erro: {statusCode}</Text>
        <Link href="/" passHref>
          <Button as={'a'} variant={'outline'} colorScheme={'primaryApp'} mt={'2rem'} width={'40%'}>Ir para o Início</Button>
        </Link>
      </Flex>
    </>
  )
}

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return {
    statusCode
  }
}
