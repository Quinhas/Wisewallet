import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { GetStaticProps } from "next";
import { useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { AccountCard } from "@components/AccountCard";
import { api } from "@services/api";
import { getHours, isAfter, isBefore, parseISO } from "date-fns";
import { IUser } from "src/types/IUser";
import { ListItem } from "@components/ListItem";
import * as localForage from "localforage";

type HomeProps = {
  user: IUser;
  recent: any;
  coming: any;
};

export default function Home({ user, recent, coming }: HomeProps) {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    let balance = user.accounts.reduce((a, b) => a + b.balance, 0);
    setBalance(balance);
    localForage.setItem('wisewallet_language', user.language);
  }, []);

  const greeting = useMemo(() => {
    const hour = getHours(new Date());
    if (hour > 18) {
      return "Good evening";
    }

    if (hour > 11) {
      return "Good afternoon";
    }

    if (hour > 5) {
      return "Good morning";
    }

    if (hour >= 0) {
      return "Good evening";
    }

    return "Hello";
  }, []);

  return (
    <Flex
      py={"1rem"}
      direction="column"
      gridGap={"1rem"}
      minHeight={"calc(100vh - 8rem)"}
    >
      {/* Greeting & Balance */}
      <Flex direction="column" px={"1rem"}>
        <Text fontWeight="medium" fontSize={"1.5rem"}>
          {greeting}, {user.name.split(" ")[0]}!
        </Text>
        <Flex justify={"space-between"} fontSize={"1.5rem"}>
          <Text color={"gray.500"}>Balance:</Text>
          <Text color={"primary.600"} fontWeight="bold">
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
      >
        {user.accounts.map((account, index) => {
          return (
            <AccountCard
              key={index}
              type={account.type}
              value={account.balance}
              name={account.name || null}
            />
          );
        })}
      </Flex>

      {coming.length != 0 && (
        <Flex direction={"column"}>
          <Heading ps={"1rem"} fontSize={"1.6rem"} mb={"0.5rem"}>
            Coming
          </Heading>
          <Box opacity={'0.6'}>
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
              />
            );
          })}
          </Box>
        </Flex>
      )}

      <Flex direction={"column"}>
        <Heading ps={"1rem"} fontSize={"1.6rem"} mb={"0.5rem"}>
          Recent
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
      </Flex>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("users/0");
  const comingIncomes = [];
  const comingExpenses = [];
  const comingTransfers = [];
  const recentIncomes = [];
  const recentExpenses = [];
  const recentTransfers = [];
  data.incomes.splice(0, 5).forEach((income) => {
    if (isBefore(parseISO(income.date), new Date())) {
      recentIncomes.push({ ...income, listType: "Income" });
    }
    if (isAfter(parseISO(income.date), new Date())) {
      comingIncomes.push({ ...income, listType: "Income" });
    }
  });

  data.expenses.splice(0, 5).forEach((expense) => {
    if (isBefore(parseISO(expense.date), new Date())) {
      recentExpenses.push({ ...expense, listType: "Expense" });
    }
    if (isAfter(parseISO(expense.date), new Date())) {
      comingExpenses.push({ ...expense, listType: "Expense" });
    }
  });
  data.transfers.splice(0, 5).map((transfer) => {
    if (isBefore(parseISO(transfer.date), new Date())) {
      recentTransfers.push({ ...transfer, listType: "Transfer" });
    }
    if (isAfter(parseISO(transfer.date), new Date())) {
      comingTransfers.push({ ...transfer, listType: "Transfer" });
    }
  });

  const recent = [...recentIncomes, ...recentExpenses, ...recentTransfers]
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    })
    .splice(0, 5);

  const coming = [...comingIncomes, ...comingExpenses, ...comingTransfers]
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    })
    .splice(0, 5);

  return {
    props: {
      user: data,
      recent: recent,
      coming: coming,
    },
  };
};
