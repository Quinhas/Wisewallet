import {
  Flex, useDisclosure, useStyleConfig
} from "@chakra-ui/react";
import AccountModal from "components/AccountModal";
import MenuItem from "components/MenuItem";
import { useRouter } from "next/router";

const pages = [
  {
    name: "Início", href: "/",
  },
  {
    name: 'Teste', href: '/teste'
  }
];

export default function Menu() {
  const router = useRouter();
  const {
    isOpen: accountIsOpen,
    onOpen: accountOnOpen,
    onClose: accountOnClose,
  } = useDisclosure();

  const stylesMenuItem = useStyleConfig("MenuItem");


  return (
    <>
      <Flex
        as={'nav'}
        w={'100%'}
        direction={"column"}
        gridGap={"0.5rem"}
      >
        {pages.map((page) => (
          <MenuItem
            key={page.href}
            href={page.href}
            name={page.name}
            variant={router.pathname === page.href ? "active" : ""}
          />
        ))}
        <Flex as={'button'} aria-label="Criar nova conta" __css={stylesMenuItem} onClick={accountOnOpen}>
          Nova Conta
        </Flex>
      </Flex>
      <AccountModal isOpen={accountIsOpen} onClose={accountOnClose} />
    </>
  )
}
