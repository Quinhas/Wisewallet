import {
  Button,
  Flex,
  IconButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import AccountModal from "@components/AccountModal";
import MenuItem from "@components/MenuItem";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";

export default function Menu() {
  const {
    isOpen: accountIsOpen,
    onOpen: accountOnOpen,
    onClose: accountOnClose,
  } = useDisclosure();
  const router = useRouter();
  const pages = [{ name: "Início", href: "/" }];

  return (
    <>
      <Flex grow={1}>
        <Flex
          as={"ul"}
          direction={"column"}
          w={"100%"}
          grow={1}
          gridGap={"0.5rem"}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.href}
              name={page.name}
              onClick={() => router.push(page.href)}
              variant={router.pathname === page.href ? "active" : ""}
            />
          ))}
          <MenuItem name={"New Account"} onClick={accountOnOpen} />
        </Flex>
      </Flex>
      <AccountModal isOpen={accountIsOpen} onClose={accountOnClose} />
    </>
  );
}
