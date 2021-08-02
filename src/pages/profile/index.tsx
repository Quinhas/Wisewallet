import { Avatar } from "@chakra-ui/avatar";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Navbar } from "@components/Navbar";
import { Tabs } from "@components/Tabs";
import { useAuth } from "@hooks/useAuth";
import { Locale } from "date-fns";
import { format, parseISO } from "date-fns";

import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

type InfoProps = {
  title: string;
  value: string;
};

const Info = ({ title, value }: InfoProps) => {
  const { colorMode } = useColorMode();

  return (
    <Flex direction={"column"} px={"1rem"}>
      <Heading
        color={"primaryApp.600"}
        fontWeight={"semibold"}
        fontSize={"1.25rem"}
      >
        {title}
      </Heading>
      <Text
        fontSize={"1.25rem"}
        color={colorMode === "light" ? "gray.800" : "gray.100"}
      >
        {value}
      </Text>
    </Flex>
  );
};

export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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

  const language = useMemo(() => {
    switch (user?.language) {
      case "en-US":
        return "English";
      case "pt-BR":
        return "Português";
      default:
        return "English";
    }
  }, [user?.language]);

  if (!user) {
    router.push("/login");
    return;
  }

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await router.push("/");
      await signOut();
      toast({
        description: "User logged out successfully.",
        status: "success",
      });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        py={"1rem"}
        direction="column"
        gridGap={"1rem"}
        minHeight={"calc(100vh - 8rem)"}
      >
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          gridGap={"0.5rem"}
          py={"1rem"}
        >
          <Avatar
            boxShadow={"lg"}
            bg={"primaryApp.600"}
            w={"9rem"}
            h={"9rem"}
            src={user.avatar}
          />
          <Heading fontSize={"1.875rem"} fontWeight={"semibold"}>
            Hi, {user.name.split(" ")[0]}!
          </Heading>
        </Flex>
        <Info title={"Name"} value={user.name} />
        <Info title={"E-mail"} value={user.email} />
        <Info
          title={"Password"}
          value={
            user.lastPasswordChange
              ? `Last change on: ${format(
                  parseISO(user.lastPasswordChange),
                  "PPpp",
                  { locale: locale }
                )}`
              : `-`
          }
        />

        <Info
          title={"Birthdate"}
          value={String(
            format(parseISO(user.birthdate), "P", { locale: locale })
          )}
        />
        <Info title={"Currency"} value={user.currency} />
        <Info title={"Language"} value={language} />
        <Button
          mx={"1rem"}
          colorScheme={"primaryApp"}
          rightIcon={<FaSignOutAlt />}
          onClick={handleLogout}
          isLoading={isLoading}
        >
          Log Out
        </Button>
      </Flex>
      <Tabs />
    </>
  );
}
