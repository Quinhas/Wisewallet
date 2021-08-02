import { Flex } from "@chakra-ui/layout";
import { getMonth, getYear } from "date-fns";
import { useMemo, useState } from "react";
import { CardPieChart } from "@components/CardPieChart";
import { Filter } from "@components/Filter";
import monthsList from "@utils/months";
import { useHistory } from "@hooks/useHistory";
import { Navbar } from "@components/Navbar";
import { Tabs } from "@components/Tabs";

export default function Charts() {
  const { incomes, expenses } = useHistory();
  const [selectedMonth, setSelectedMonth] = useState<number>(
    getMonth(new Date()) + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(getYear(new Date()));

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...incomes, ...expenses].forEach((item) => {
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
  }, [expenses, incomes]);

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
    expenses.forEach((item) => {
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
  }, [expenses, selectedMonth, selectedYear]);

  const totalIncomes = useMemo(() => {
    let total: number = 0;
    incomes.forEach((item) => {
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
  }, [incomes, selectedMonth, selectedYear]);

  const relationExpensesIncomes = useMemo(() => {
    const data = [
      {
        name: "Incomes",
        value: totalIncomes,
        chartValue:
          totalExpenses === 0 && totalIncomes === 0 ? 50 : totalIncomes,
        color: "var(--chakra-colors-success-600)",
      },
      {
        name: "Expenses",
        value: totalExpenses,
        chartValue:
          totalExpenses === 0 && totalIncomes === 0 ? 50 : totalExpenses,
        color: "var(--chakra-colors-danger-600)",
      },
    ];
    return data;
  }, [totalIncomes, totalExpenses]);

  const relationExpenses = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
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
        chartValue:
          amountEventual === 0 && amountRecurrent === 0 ? 50 : amountRecurrent,
        color: "var(--chakra-colors-danger-700)",
      },
      {
        name: "Eventual",
        value: amountEventual,
        chartValue:
          amountEventual === 0 && amountRecurrent === 0 ? 50 : amountEventual,
        color: "var(--chakra-colors-danger-500)",
      },
    ];
  }, [expenses, selectedMonth, selectedYear]);

  const relationIncomes = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    incomes
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
        chartValue:
          amountRecurrent === 0 && amountEventual === 0 ? 50 : amountRecurrent,
        color: "var(--chakra-colors-success-700)",
      },
      {
        name: "Eventual",
        value: amountEventual,
        chartValue:
          amountRecurrent === 0 && amountEventual === 0 ? 50 : amountEventual,
        color: "var(--chakra-colors-success-500)",
      },
    ];
  }, [incomes, selectedMonth, selectedYear]);

  return (
    <>
      <Navbar />
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
      <Tabs />
    </>
  );
}
