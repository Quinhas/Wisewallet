import { Center, Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import { Navbar } from "@components/Navbar";
import { Tabs } from "@components/Tabs";
import { NextPageContext } from "next";

function Error({ statusCode }: { statusCode: number | undefined }) {
  return (
    <>
      <Navbar />
      <Flex
        w={"full"}
        grow={1}
        shrink={1}
        basis={"100%"}
        align={"center"}
        justify={"center"}
        gridGap={"0.8rem"}
      >
        <Heading>{statusCode}</Heading>
        <Center height="50px">
          <Divider orientation="vertical" />
        </Center>
        <Text fontWeight={"medium"}>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </Text>
      </Flex>
      <Tabs />
    </>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default Error;
