import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import { FaUserCircle, FaHome, FaChartPie, FaReceipt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

export function Tabs() {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const tabs = [
    {
      icon: FaUserCircle,
      text: "Profile",
      href: "/profile",
    },
    {
      icon: FaHome,
      text: "Home",
      href: "/",
    },
    {
      icon: FaReceipt,
      text: "History",
      href: "/history",
    },
    {
      icon: FaChartPie,
      text: "Charts",
      href: "/charts",
    },
  ];

  return (
    <>
      <Flex
        position={"sticky"}
        w={"full"}
        bottom={0}
        align={"center"}
        px={"2rem"}
        h={"4rem"}
        backgroundColor={colorMode === "light" ? "white" : "black"}
        boxShadow={"0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)"}
        justify={"space-between"}
      >
        {tabs.map((tab) => {
          return (
            <Link href={tab.href} key={tab.href}>
              <Flex
                direction="column"
                flexGrow={1}
                flexShrink={1}
                align="center"
                cursor="pointer"
                color={
                  router.pathname === tab.href ? "primary.600" : "gray.400"
                }
                transition={"0.2s ease"}
                _hover={{ color: "primary.500" }}
                _active={{ color: "primary.700" }}
              >
                <Icon as={tab.icon} w={"1.5rem"} h={"1.5rem"} />
                {router.pathname === tab.href && (
                  <Text fontFamily={"heading"} fontSize={"1rem"}>
                    {tab.text}
                  </Text>
                )}
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </>
  );
}
