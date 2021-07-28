import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { format, formatISO, getMonth, getYear, isAfter, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { AccountCard } from "@components/AccountCard";
import { CardPieChart } from "@components/CardPieChart";
import { Filter } from "@components/Filter";
import { api } from "@services/api";
import monthsList from "@utils/months";
import { ListItem } from "@components/ListItem";

type ExpenseProps = {
  date: string;
  title: string;
  account: string;
  category: string;
  value: number;
  type: string;
};

type IncomeProps = {
  date: string;
  title: string;
  account: string;
  value: number;
  type: string;
};

type TransferProps = {
  date: string;
  origin: string;
  destination: string;
  value: number;
};

type IUser = {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  currency: string;
  language: string;
  photoURL: string;
  accounts: {
    type: "Cash" | "Bank" | "Others";
    balance: number;
    name?: string;
  }[];
  expenses: ExpenseProps[];
  incomes: IncomeProps[];
  transfers: TransferProps[];
};

type IItems = {
  date?: string;
  title?: string;
  account?: string;
  category?: string;
  value?: number;
  type?: string;
  origin?: string;
  destination?: string;
  listType: "Income" | "Expense" | "Transfer";
};

type HistoryProps = {
  user: IUser;
  items: IItems[];
};

export default function History({ user, items }: HistoryProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    getMonth(new Date()) + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(getYear(new Date()));
  const [balance, setBalance] = useState<number>(0);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...user.incomes, ...user.expenses].forEach((item) => {
      const year = getYear(new Date(item.date));
      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = useMemo(() => {
    return monthsList.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const listItems = useMemo(() => {
    const incomesFiltered = user.incomes.filter((income) => {
      const date = new Date(income.date);
      const dateMonth = getMonth(date) + 1;
      const dateYear = getYear(date);
      return selectedMonth === dateMonth && selectedYear === dateYear;
    });
    const incomes: IItems[] = incomesFiltered.map((income) => {
      return { ...income, listType: "Income" };
    });

    const expensesFiltered = user.expenses.filter((expense) => {
      const date = new Date(expense.date);
      const dateMonth = getMonth(date) + 1;
      const dateYear = getYear(date);
      return selectedMonth === dateMonth && selectedYear === dateYear;
    });
    const expenses: IItems[] = expensesFiltered.map((expense) => {
      return { ...expense, listType: "Expense" };
    });

    const transfersFiltered = user.transfers.filter((transfer) => {
      const date = new Date(transfer.date);
      const dateMonth = getMonth(date) + 1;
      const dateYear = getYear(date);
      return selectedMonth === dateMonth && selectedYear === dateYear;
    });
    const transfers: IItems[] = transfersFiltered.map((transfer) => {
      return { ...transfer, listType: "Transfer" };
    });

    const items = [...incomes, ...expenses, ...transfers].sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
    return items;
  }, [selectedMonth, selectedYear]);

  const dates = useMemo(() => {
    let uniqueDates: string[] = [];
    let dates: { date: string; dateFormatted: string }[] = [];

    listItems.forEach((item) => {
      const date = format(new Date(item.date), "P");
      if (!uniqueDates.includes(date)) {
        uniqueDates.push(date);
        dates.push({
          date: date,
          dateFormatted: format(new Date(item.date), "PP"),
        });
      }
    });

    return dates.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    let balance = user.accounts.reduce((a, b) => a + b.balance, 0);
    setBalance(balance);
  }, []);

  return (
    <Flex
      py={"1rem"}
      direction="column"
      gridGap={"1rem"}
      minHeight={"calc(100vh - 8rem)"}
    >
      {/* Greeting & Balance */}
      <Flex direction="row" gridGap={"1rem"} justify={"flex-end"} px={"1rem"}>
        <Filter
          defaultValue={selectedMonth}
          options={months}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        />
        <Filter
          defaultValue={selectedYear}
          options={years}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        />
      </Flex>

      {dates.length === 0 && 
        <Flex grow={1} shrink={1} direction={'column'} align={'center'} justify={'center'} textColor={'gray.500'}>
          <Heading>Oops!</Heading>
          <Text>There are no records on this date.</Text>
        </Flex>
      }

      {dates.length !== 0 &&
        dates.map((date) => {
          return (
            <Flex direction={"column"} key={date.date}>
              <Text
                fontSize={"0.75rem"}
                textTransform={"uppercase"}
                fontFamily={"mono"}
                mb={"0.5rem"}
                mx={"1rem"}
                textColor={'gray.500'}
              >
                {date.dateFormatted}
              </Text>
              {listItems
                .filter((item) => {
                  return format(parseISO(item.date), "P") === date.date;
                })
                .map((activity, index) => {
                  return (
                    <ListItem
                      key={index}
                      type={activity.listType}
                      title={activity?.title}
                      account={activity?.account}
                      date={activity?.date}
                      value={activity.value}
                      category={activity?.category}
                      layout={"default"}
                      origin={activity?.origin}
                      destination={activity?.destination}
                      coming={isAfter(parseISO(activity.date), new Date())}
                    />
                  );
                })}
            </Flex>
          );
        })}
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("users/0");

  return {
    props: {
      user: data,
    },
  };
};
