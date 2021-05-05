import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import { formatISO } from "date-fns";
import { GetStaticProps } from "next";
import { AccountCard } from "../components/AccountCard";
import { CardPieChart } from "../components/CardPieChart";
import { api } from "../services/api";

export default function Home(props) {
  console.log(props);
  const data = [
    {
      name: "Expenses",
      value: 6000,
      color: "var(--chakra-colors-danger-600)",
    },
    {
      name: "Incomes",
      value: 8000,
      color: "var(--chakra-colors-success-600)",
    },
  ];

  const incomes = [
    {
      name: "Eventual",
      value: 2000,
      color: "var(--chakra-colors-success-500)",
    },
    {
      name: "Recurrent",
      value: 6000,
      color: "var(--chakra-colors-success-700)",
    },
  ];

  const expenses = [
    {
      name: "Eventual",
      value: 1200,
      color: "var(--chakra-colors-danger-500)",
    },
    {
      name: "Recurrent",
      value: 4800,
      color: "var(--chakra-colors-danger-700)",
    },
  ];

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
          Good morning, {props.data.name.split(' ')[0]}!
        </Text>
        <Flex justify={"space-between"} fontSize={"1.5rem"}>
          <Text color={"gray.500"}>Balance:</Text>
          <Flex align={"center"} gridGap={"0.5rem"}>
            <Text color={"primary.600"} fontWeight="bold">
              R$ 128,12
            </Text>
          </Flex>
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
      >
        <AccountCard type={"Cash"} value={8} />
        <AccountCard type={"Bank"} name={"PicPay"} value={100} />
        <AccountCard type={"Others"} value={20.12} />
      </Flex>

      <Flex
        flex={"auto 1 auto"}
        direction={{ base: "column", lg: "row" }}
        gridGap={{ base: "1.5rem", lg: "0" }}
        justify={"space-between"}
      >
        <CardPieChart title={"Inc & Exp"} chartSide={"end"} data={data} />
        <CardPieChart title={"Incomes"} chartSide={"start"} data={incomes} />
        <CardPieChart title={"Expenses"} chartSide={"start"} data={expenses} />
      </Flex>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("users/0");

  return {
		props: {
			data
		}
	};
};
