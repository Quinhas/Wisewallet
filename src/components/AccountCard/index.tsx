import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CountUp from "react-countup";
import { FaCoins, FaUniversity, FaPiggyBank } from "react-icons/fa";

type AccountCardProps = {
  type: "Cash" | "Bank" | "Others";
  value: number;
  iconBgColor?: string;
  iconColor?: string;
  bgColor?: string;
  name?: string;
};

export function AccountCard({
  type,
  value,
  iconBgColor,
  iconColor,
  bgColor,
  name,
}: AccountCardProps) {
  const { colorMode } = useColorMode();
  return (
    <Flex
      bgColor={bgColor || colorMode == "light" ? "white" : "black"}
      p={"1rem"}
      gridGap={"0.5rem"}
      direction={"column"}
      borderRadius={"md"}
      boxShadow={"md"}
      flex={"1 1 auto"}
    >
      {type === "Cash" && (
        <Flex
          align={"center"}
          justify={"center"}
          bgColor={iconBgColor || "primary.600"}
          w={"2rem"}
          h={"2rem"}
          borderRadius={"md"}
          color={iconColor || "white"}
        >
          <Icon as={FaCoins} />
        </Flex>
      )}
      {type === "Bank" && (
        <Flex
          align={"center"}
          justify={"center"}
          bgColor={iconBgColor || "primary.600"}
          w={"2rem"}
          h={"2rem"}
          borderRadius={"md"}
          color={iconColor || "white"}
        >
          <Icon as={FaUniversity} />
        </Flex>
      )}
      {type === "Others" && (
        <Flex
          align={"center"}
          justify={"center"}
          bgColor={iconBgColor || "primary.600"}
          w={"2rem"}
          h={"2rem"}
          borderRadius={"md"}
          color={iconColor || "white"}
        >
          <Icon as={FaPiggyBank} />
        </Flex>
      )}
      <Box>
        <Text
          fontFamily={"mono"}
          fontSize={"1rem"}
          color={"gray.400"}
          textTransform={"uppercase"}
        >
          {name || type}
        </Text>
        <Text fontSize={"1.5rem"} fontWeight={"bold"}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value)}
        </Text>
      </Box>
    </Flex>
  );
}
