import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type CardPieChartProps = {
  title: string;
  chartSide: 'start' | 'end';
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

export function CardPieChart({ title, chartSide, data }: CardPieChartProps) {
  const [totalValue, setTotalValue] = useState(0);
  const { colorMode } = useColorMode();

  useEffect(() => {
    let total = 0;
    data.map((legend) => total += legend.value);
    setTotalValue(total);
  }, [data])
  

  return (
    <Flex grow={1} shrink={1} mx={'1rem'} boxShadow={'md'} borderRadius={'md'} p={'1rem'} direction={chartSide === 'start' ? 'row-reverse' : 'row'} backgroundColor={colorMode === 'light' ? 'white' : 'black'}>
      <Flex direction={'column'} width={'50%'} py={'1rem'} justify={'space-between'}>
        <Heading fontSize={'1.875rem'} fontWeight={'semibold'} textAlign={chartSide === 'start' ? 'end' : 'start'}>{title}</Heading>
        <Flex direction={'column'} gridGap={'1rem'}>
          {data.map((legend) => (
            <Flex key={legend.name} gridGap={'1rem'} align={'center'} direction={chartSide === 'start' ? 'row-reverse' : 'row'}>
              <Flex borderRadius={'md'} bgColor={legend.color} justify="center" align="center" w={'2.675rem'} h={'2.675rem'}>
                <Text color={'white'} fontWeight={'semibold'}>
                  {Number(((legend.value / totalValue) * 100).toFixed(0)) || 0}%
                </Text>
              </Flex>
              <Flex direction={'column'}>
                <Text fontFamily={'heading'} textAlign={chartSide === 'start' ? 'end' : 'start'}>
                  {legend.name}
                </Text>
                <Text textAlign={chartSide === 'start' ? 'end' : 'start'}>
                  {new Intl.NumberFormat('pt-BR', {style: 'currency', 'currency': 'BRL'}).format(legend.value)}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex height={"12rem"} width={'50%'}>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={data}
              labelLine={false}
              dataKey={"value"}
              innerRadius={55}
              outerRadius={70}
            >
              {data.map((legend) => (
                <Cell key={legend.name} fill={legend.color} stroke={colorMode === 'light' ? 'white' : 'black'}/>
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Flex>
    </Flex>
  );
}
