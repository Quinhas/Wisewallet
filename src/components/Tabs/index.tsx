import {
  Flex, Icon, Text, useColorModeValue
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaHome, FaReceipt, FaUserCircle
} from "react-icons/fa";

export default function Tabs() {
  const router = useRouter();

  const tabs = [
    {
      icon: FaUserCircle,
      text: "Perfil",
      href: "/profile",
    },
    {
      icon: FaHome,
      text: "Início",
      href: "/",
    },
    {
      icon: FaReceipt,
      text: "Extrato",
      href: "/statement",
    },
    // {
    //   icon: FaChartPie,
    //   text: "Gráficos",
    //   href: "/charts",
    // },
  ];

  return (
    <Flex
      position={"sticky"}
      w={'full'}
      bottom={0}
      align={'center'}
      px="2rem"
      h="4rem"
      mt={'auto'}
      boxShadow={'0 -1px 2px 0 rgba(0, 0, 0, 0.05)'}
      backgroundColor={useColorModeValue('white', 'black')}
      justify={"space-between"}
    >
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href} passHref>
          <Flex
            as={'a'}
            direction="column"
            flexGrow={1}
            flexShrink={1}
            align="center"
            cursor="pointer"
            color={
              router.pathname === tab.href ? "primaryApp.300" : "gray.400"
            }
            transition={"0.2s ease-in"}
            _hover={{
              color: "primaryApp.400"
            }}
            _active={{
              color: "primaryApp.500"
            }}
          >
            <Icon as={tab.icon} w={"1.5rem"} h={"1.5rem"} lineHeight={'1rem'} transition={"0.2s ease-in"} />
            {router.pathname === tab.href && (
              <Text fontFamily={"heading"} fontSize={"1rem"} lineHeight={'1rem'} transition={"0.2s ease-in"}>
                {tab.text}
              </Text>
            )}
          </Flex>
        </Link>
      ))}
    </Flex>
  )
}
