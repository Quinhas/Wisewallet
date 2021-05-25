import { Avatar } from "@chakra-ui/avatar";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { api } from "@services/api";
import { Locale } from "date-fns";
import { format, parseISO } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

import { GetStaticProps } from "next";
import { useEffect, useMemo, useState } from "react";
import { IUser } from "src/types/IUser";

type InfoProps = {
  title: string;
  value: string;
};

const Info = ({ title, value }: InfoProps) => {
  const { colorMode } = useColorMode();
  return (
    <Flex direction={"column"} px={"1rem"}>
      <Heading
        color={"primary.600"}
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

type ProfileProps = {
  user: IUser;
};

export default function Profile({ user }: ProfileProps) {
  const [locale, setLocale] = useState<Locale>(null);

  const getLocale = async () => {
    const locale: Locale = (await import(`date-fns/locale/${user.language}/index.js`)).default;
    setLocale(locale)
  }

  useEffect(() => {
    getLocale();
  }, [])

  const language = useMemo(() => {
    switch (user.language) {
      case "en-US":
        return "English";
      case "pt-BR":
        return "Português";
    }
  }, [user.language]);

  return (
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
          bg={"primary.600"}
          w={"9rem"}
          h={"9rem"}
          src={user.photoURL}
        />
        <Heading fontSize={"1.875rem"} fontWeight={"semibold"}>
          Hi, {user.name.split(" ")[0]}!
        </Heading>
      </Flex>
      <Info title={"Name"} value={user.name} />
      <Info title={"E-mail"} value={user.email} />
      <Info title={"Password"} value={`Last change on: ${format(parseISO(user.lastPasswordChange), 'PPpp', {locale: locale})}`} />
      <Info
        title={"Birthdate"}
        value={String(format(parseISO(user.birthdate), "P", {locale: locale}))}
      />
      <Info title={"Currency"} value={user.currency} />
      <Info title={"Language"} value={language} />
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("users/0");

  return {
    props: {
      user: data,
    },
  };
};
