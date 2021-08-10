import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AccountModal from "@components/AccountModal";
import React from "react";
import { FaCoins, FaUniversity, FaPiggyBank } from "react-icons/fa";

type AccountCardProps = {
  type: "Cash" | "Bank" | "Others";
  value: number;
  name?: string;
  iconBgColor?: string;
  iconColor?: string;
  bgColor?: string;
  id: string;
};

export function AccountCard({
  type,
  value,
  iconBgColor,
  iconColor,
  bgColor,
  name,
  id,
}: AccountCardProps) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        bgColor={bgColor || colorMode == "light" ? "white" : "black"}
        p={"1rem"}
        my={"1rem"}
        gridGap={"0.5rem"}
        direction={"column"}
        borderRadius={"md"}
        boxShadow={"md"}
        flex={"1 1 auto"}
        minW={["calc(100% / 2 - 2rem)", "calc(100% / 5 - 2rem)"]}
        cursor={"pointer"}
        _hover={{ transform: "scale(1.05)" }}
        transition={"0.2s ease-in-out"}
        onClick={onOpen}
      >
        {type === "Cash" && (
          <Flex
            align={"center"}
            justify={"center"}
            bgColor={iconBgColor || "primaryApp.600"}
            w={"2rem"}
            h={"2rem"}
            borderRadius={"md"}
            color={iconColor || "white"}
          >
            <Icon as={FaCoins} w={"1.3rem"} h={"1.3rem"} />
          </Flex>
        )}
        {type === "Bank" && (
          <Flex
            align={"center"}
            justify={"center"}
            bgColor={iconBgColor || "primaryApp.600"}
            w={"2rem"}
            h={"2rem"}
            borderRadius={"md"}
            color={iconColor || "white"}
          >
            <Icon as={FaUniversity} w={"1.3rem"} h={"1.3rem"} />
          </Flex>
        )}
        {type === "Others" && (
          <Flex
            align={"center"}
            justify={"center"}
            bgColor={iconBgColor || "primaryApp.600"}
            w={"2rem"}
            h={"2rem"}
            borderRadius={"md"}
            color={iconColor || "white"}
          >
            <Icon as={FaPiggyBank} w={"1.3rem"} h={"1.3rem"} />
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
            }).format(Number(value))}
          </Text>
        </Box>
      </Flex>
      <AccountModal
        type={type}
        id={id}
        name={name}
        value={value}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
