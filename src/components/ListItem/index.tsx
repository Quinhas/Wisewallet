import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { format, parseISO } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import * as localForage from "localforage";
import { useAuth } from "@hooks/useAuth";

type ListItemProps = {
  type: "Income" | "Expense" | "Transfer";
  title?: string;
  category?: string;
  account?: string;
  value?: number;
  origin?: string;
  destination?: string;
  date: Date;
  layout: string;
  coming?: boolean;
};

const color = {
  Expense: "danger.600",
  Income: "success.600",
  Transfer: "primaryApp.600",
};

export function ListItem({
  type,
  title,
  value,
  category,
  account,
  origin,
  destination,
  date,
  layout,
  coming,
}: ListItemProps) {
  const { colorMode } = useColorMode();
  const { user } = useAuth();
  const [locale, setLocale] = useState<Locale>();

  useMemo(async () => {
    if (!user?.language) {
      const locale: Locale = (await import(`date-fns/locale/en-US/index.js`))
        .default;
      setLocale(locale);
      return;
    }
    const locale: Locale = (
      await import(`date-fns/locale/${user.language}/index.js`)
    ).default;
    setLocale(locale);
  }, [user?.language]);

  return (
    <>
      <Flex
        w={"100%"}
        h={"4rem"}
        backgroundColor={colorMode === "light" ? "white" : "black"}
        borderLeftWidth={"0.5rem"}
        borderLeftColor={color[type]}
        borderBottomWidth={"0.5px"}
        borderBottomColor={colorMode === "light" ? "gray.200" : "gray.900"}
        opacity={coming ? "0.6" : "1"}
      >
        <Flex
          grow={1}
          shrink={1}
          direction={"row"}
          justify={"space-between"}
          px={"1rem"}
          align={"center"}
        >
          {type === "Expense" && (
            <>
              <Flex direction={"column"}>
                <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
                  {title}
                </Text>
                <Text
                  fontFamily={"mono"}
                  color={"gray.500"}
                  fontSize={"0.8rem"}
                  textTransform={"uppercase"}
                >
                  {category}{" "}
                  {layout === "home" &&
                    `- ${format(date, "Pp", { locale: locale })}`}
                </Text>
              </Flex>
              <Flex direction={"column"} textAlign={"end"}>
                <Text
                  fontSize={"1.2rem"}
                  fontWeight={"semibold"}
                  color={"danger.600"}
                >
                  -&nbsp;
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value ?? 0)}
                </Text>
                <Text
                  fontFamily={"mono"}
                  color={"gray.500"}
                  fontSize={"0.8rem"}
                  textTransform={"uppercase"}
                >
                  {account}
                </Text>
              </Flex>
            </>
          )}

          {type === "Income" && (
            <>
              <Flex direction={"column"}>
                <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
                  {title}
                </Text>
                {layout === "home" && (
                  <Text
                    fontFamily={"mono"}
                    color={"gray.500"}
                    fontSize={"0.8rem"}
                    textTransform={"uppercase"}
                  >
                    {format(date, "Pp", { locale: locale })}
                  </Text>
                )}
              </Flex>
              <Flex direction={"column"} textAlign={"end"}>
                <Text
                  fontSize={"1.2rem"}
                  fontWeight={"semibold"}
                  color={"success.600"}
                >
                  +&nbsp;
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value ?? 0)}
                </Text>
                <Text
                  fontFamily={"mono"}
                  color={"gray.500"}
                  fontSize={"0.8rem"}
                  textTransform={"uppercase"}
                >
                  {account}
                </Text>
              </Flex>
            </>
          )}

          {type === "Transfer" && (
            <>
              <Flex direction={"row"} align={"center"}>
                <Flex
                  direction={"column"}
                  pe={"1rem"}
                  fontFamily={"mono"}
                  color={"gray.500"}
                  textTransform={"uppercase"}
                  fontSize={"0.875rem"}
                  justify={"space-between"}
                  h={"100%"}
                >
                  <Text>From:</Text>
                  <Text>To:</Text>
                </Flex>
                <Flex
                  direction={"column"}
                  justify={"space-between"}
                  fontSize={"1.2rem"}
                >
                  <Text>{origin}</Text>
                  <Text>{destination}</Text>
                </Flex>
              </Flex>
              <Flex direction={"column"} textAlign={"end"}>
                <Text
                  fontSize={"1.2rem"}
                  fontWeight={"semibold"}
                  color={"primary.600"}
                >
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value ?? 0)}
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}
