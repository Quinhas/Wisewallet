import { Box, Button, Divider, Flex, Heading, Spinner, Text, useColorMode } from "@chakra-ui/react";
import { AccountCard } from "@components/AccountCard";
import { Navbar } from "@components/Navbar";
import { Tabs } from "@components/Tabs";
import { useAuth } from "@hooks/useAuth";
import { useHistory } from "@hooks/useHistory";
import { getHours } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import CountUp from "react-countup";

export default function Home() {
  const { user, isLogged } = useAuth();
  const { balance, accounts } = useHistory();
  const router = useRouter();
  const { colorMode } = useColorMode();

  const greeting = useMemo(() => {
    const hour = getHours(new Date());
    if (hour > 18) {
      return {
        "pt-BR": "Boa noite",
        "en-US": "Good evening",
      };
    }

    if (hour > 11) {
      return {
        "pt-BR": "Boa tarde",
        "en-US": "Good afternoon",
      };
    }

    if (hour > 5) {
      return {
        "pt-BR": "Bom dia",
        "en-US": "Good morning",
      };
    }

    if (hour >= 0) {
      return {
        "pt-BR": "Boa noite",
        "en-US": "Good evening",
      };
    }

    return {
      default: "Hello",
    };
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, [router, user]);

  return (
    <>
      <Navbar />
      {!user && (
        <Flex grow={1} align={"center"} justify={"center"}>
          <Flex
            direction={"column"}
            align="center"
            gridGap={"1.5rem"}
            bg={colorMode === "light" ? "white" : "black"}
            boxShadow={"md"}
            py={"2rem"}
            px={"4rem"}
            borderRadius={"md"}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Text color="gray.500">Carregando...</Text>
          </Flex>
        </Flex>
      )}
      {user && (
        <Flex py={"1rem"} direction="column" gridGap={"1rem"} grow={1}>
          {/* Greeting & Balance */}
          <Flex direction="column" px={"1rem"}>
            <Text fontWeight="medium" fontSize={"1.5rem"}>
              {greeting[user.language]}, {user.name.split(" ")[0]}!
            </Text>
            <Flex justify={"space-between"} fontSize={"1.5rem"}>
              <Text color={"gray.500"}>
                {user.language === "pt-BR" && "Saldo:"}
                {user.language === "en-US" && "Balance:"}
              </Text>
              <Text color={"primaryApp.600"} fontWeight="bold">
                <CountUp
                  preserveValue={true}
                  end={balance}
                  decimals={2}
                  decimal=","
                  prefix="R$ "
                  duration={0.5}
                />
              </Text>
            </Flex>
          </Flex>

          {/* Accounts & Cards */}
          <Flex
            direction={"row"}
            gridGap={"1rem"}
            mx={"1rem"}
            pb={"0.5rem"}
            overflowX={"auto"}
            justify={"space-between"}
            shrink={1}
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {accounts.map((account, index) => {
              return (
                <AccountCard
                  key={index}
                  type={account.type}
                  value={account.balance}
                  name={account.name}
                />
              );
            })}
          </Flex>

          {/* {coming.length != 0 && (
          <>
            <Flex direction={"column"} mx={"1rem"}>
              <Heading fontSize={"1.6rem"} mb={"0.5rem"}>
                {user.language === "pt-BR" && "Próximo"}
                {user.language === "en-US" && "Coming"}
              </Heading>
              <Box>
                {coming.map((activity, index) => {
                  return (
                    <ListItem
                      key={index}
                      type={activity.listType}
                      title={activity?.title}
                      account={activity?.account}
                      date={activity?.date}
                      value={activity.value}
                      category={activity?.category}
                      layout={"home"}
                      origin={activity?.origin}
                      destination={activity?.destination}
                      coming={isAfter(parseISO(activity.date), new Date())}
                    />
                  );
                })}
              </Box>
            </Flex>
            <Divider w={"calc(100% - 2rem)"} mx={"1rem"} mt={"0.6rem"} />
          </>
        )}

        <Flex direction={"column"} mx={"1rem"}>
          <Heading fontSize={"1.6rem"} mb={"0.5rem"}>
            {user.language === "pt-BR" && "Recente"}
            {user.language === "en-US" && "Recent"}
          </Heading>
          {recent.map((activity, index) => {
            return (
              <ListItem
                key={index}
                type={activity.listType}
                title={activity?.title}
                account={activity?.account}
                date={activity?.date}
                value={activity.value}
                category={activity?.category}
                layout={"home"}
                origin={activity?.origin}
                destination={activity?.destination}
              />
            );
          })}
        </Flex> */}
        </Flex>
      )}
      <Tabs />
    </>
  );
}
