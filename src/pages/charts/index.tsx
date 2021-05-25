import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import { formatISO, getMonth, getYear } from "date-fns";
import { GetStaticProps } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { AccountCard } from "@components/AccountCard";
import { CardPieChart } from "@components/CardPieChart";
import { Filter } from "@components/Filter";
import { api } from "@services/api";
import monthsList from "@utils/months";

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
};

type HomeProps = {
  user: IUser;
};

export default function Charts({ user }: HomeProps) {
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

  const totalExpenses = useMemo(() => {
    let total: number = 0;
    user.expenses.forEach((item) => {
      let month = getMonth(new Date(item.date)) + 1;
      let year = getYear(new Date(item.date));
      if (month === selectedMonth && year === selectedYear) {
        try {
          total += Number(item.value);
        } catch (error) {
          throw new Error("Invalid amount! Value must be a number");
        }
      }
    });
    return total;
  }, [selectedMonth, selectedYear]);

  const totalIncomes = useMemo(() => {
    let total: number = 0;
    user.incomes.forEach((item) => {
      let month = getMonth(new Date(item.date)) + 1;
      let year = getYear(new Date(item.date));
      if (month === selectedMonth && year === selectedYear) {
        try {
          total += Number(item.value);
        } catch (error) {
          throw new Error("Invalid amount! Value must be a number");
        }
      }
    });
    return total;
  }, [selectedMonth, selectedYear]);

  const relationExpensesIncomes = useMemo(() => {
    const data = [
      {
        name: "Incomes",
        value: totalIncomes,
        color: "var(--chakra-colors-success-600)",
      },
      {
        name: "Expenses",
        value: totalExpenses,
        color: "var(--chakra-colors-danger-600)",
      },
    ];
    return data;
  }, [totalIncomes, totalExpenses]);

  const relationExpenses = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    user.expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const month = getMonth(date) + 1;
        const year = getYear(date);

        return month === selectedMonth && year === selectedYear;
      })
      .forEach((expense) => {
        if (expense.type.toLowerCase() === "recurrent") {
          return (amountRecurrent += Number(expense.value));
        }
        if (expense.type.toLowerCase() === "eventual") {
          return (amountEventual += Number(expense.value));
        }
      });

    return [
      {
        name: "Recurrent",
        value: amountRecurrent,
        color: "var(--chakra-colors-danger-700)",
      },
      {
        name: "Eventual",
        value: amountEventual,
        color: "var(--chakra-colors-danger-500)",
      },
    ];
  }, [selectedMonth, selectedYear]);

  const relationIncomes = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    user.incomes
      .filter((income) => {
        const date = new Date(income.date);
        const month = getMonth(date) + 1;
        const year = getYear(date);

        return month === selectedMonth && year === selectedYear;
      })
      .forEach((income) => {
        if (income.type.toLowerCase() === "recurrent") {
          return (amountRecurrent += Number(income.value));
        }
        if (income.type.toLowerCase() === "eventual") {
          return (amountEventual += Number(income.value));
        }
      });

    return [
      {
        name: "Recurrent",
        value: amountRecurrent,
        color: "var(--chakra-colors-success-700)",
      },
      {
        name: "Eventual",
        value: amountEventual,
        color: "var(--chakra-colors-success-500)",
      },
    ];
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
      <Flex direction="row" gridGap={'1rem'} justify={'flex-end'} px={"1rem"}>
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

      <Flex
        flex={"auto 1 auto"}
        direction={{ base: "column", lg: "row" }}
        gridGap={{ base: "1.5rem", lg: "0" }}
        justify={"space-between"}
      >
        <CardPieChart
          title={"Inc & Exp"}
          chartSide={"end"}
          data={relationExpensesIncomes}
        />
        <CardPieChart
          title={"Incomes"}
          chartSide={"start"}
          data={relationIncomes}
        />
        <CardPieChart
          title={"Expenses"}
          chartSide={"start"}
          data={relationExpenses}
        />
      </Flex>
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
