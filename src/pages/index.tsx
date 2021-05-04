import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { AccountCard } from "../components/AccountCard";
import { CardPieChart } from "../components/CardPieChart";

export default function Home() {
  const [showValues, setShowValues] = useState(false);

  useEffect(() =>{
    let showValues = localStorage.getItem('showValues');
    console.log(showValues);
    setShowValues(!showValues ? true :showValues === 'true' ? true : false)
  }, [])

  const handleToggleShowValue = async () => {
    setShowValues(!showValues);
    localStorage.setItem('showValues', String(!showValues));
  }

  const data = [
    {
      name: 'Expenses',
      value: 6000,
      color: 'var(--chakra-colors-danger-600)',
    },
    {
      name: 'Incomes',
      value: 8000,
      color: 'var(--chakra-colors-success-600)',
    },
  ]

  const incomes = [
    {
      name: 'Eventual',
      value: 2000,
      color: 'var(--chakra-colors-success-500)',
    },
    {
      name: 'Recurrent',
      value: 6000,
      color: 'var(--chakra-colors-success-700)',
    },
  ]

  const expenses = [
    {
      name: 'Eventual',
      value: 1200,
      color: 'var(--chakra-colors-danger-500)',
    },
    {
      name: 'Recurrent',
      value: 4800,
      color: 'var(--chakra-colors-danger-700)',
    },
  ]
  
  return (
    <Flex py={"1rem"} direction="column" gridGap={'1.5rem'} minHeight={'calc(100vh - 8rem)'}>
      {/* Greeting & Balance */}
      <Flex direction="column" px={'1rem'}>
        <Text fontWeight="medium" fontSize={'1.5rem'} >Good morning, Lucas!</Text>
        <Flex justify={'space-between'} fontSize={'1.5rem'}>
          <Text color={'gray.500'}>Balance:</Text>
          <Flex align={'center'} gridGap={'0.5rem'}>
            <Text color={'primary.600'} fontWeight="bold">R$ {showValues ? '128,12' : '----'}</Text>
            <Icon as={showValues ? FaEyeSlash : FaEye} color={'gray.500'} _hover={{color: 'gray.600'}} _active={{color: 'primary.600'}} onClick={() => handleToggleShowValue()}/>
          </Flex>
        </Flex>
      </Flex>

      {/* Accounts & Cards */}
      <Flex direction={'row'} gridGap={'1rem'} mx={'1rem'} pb={'0.5rem'} overflowX={'auto'} justify={'space-between'}>
        <AccountCard type={'Cash'} value={8}/>
        <AccountCard type={'Bank'} name={'PicPay'} value={100}/>
        <AccountCard type={'Others'} value={20.12}/>
      </Flex>

      <Flex flex={'auto 1 auto'} direction={{base: 'column', lg: 'row'}} gridGap={{base: '1.5rem', lg: '0'}} justify={'space-between'}>
        <CardPieChart title={'Inc & Exp'} chartSide={'end'} data={data}/>
        <CardPieChart title={'Incomes'} chartSide={'start'} data={incomes}/>
        <CardPieChart title={'Expenses'} chartSide={'start'} data={expenses}/>
      </Flex>

    </Flex>
  );
}
