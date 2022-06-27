import { Flex, useStyleConfig } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type MenuItemProps = {
  name: string;
  variant?: string;
  href: string;
};

export default function MenuItem({
  variant, name, href
}: MenuItemProps) {
  const styles = useStyleConfig("MenuItem", {
    variant
  });

  return (
    <Link href={href} passHref>
      <Flex as={'a'} __css={styles}>
        {name}
      </Flex>
    </Link>
  );
}
