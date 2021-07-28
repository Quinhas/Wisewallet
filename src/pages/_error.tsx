import { Center, Divider, Flex, Heading, Text } from "@chakra-ui/layout";

function Error({ statusCode }) {
  return (
    <Flex
      w={"full"}
      h={"calc(100vh - 8rem)"}
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
      <Text fontWeight={'medium'}>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </Text>
    </Flex>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  console.log(res);
  console.log(err);
  return { statusCode };
};

export default Error;
