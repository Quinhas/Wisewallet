import { Flex, Text, useStyleConfig } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type MenuItemProps = {
  name: string;
  onClick: () => void;
  variant?: string;
};

export default function MenuItem({ variant, name, onClick }: MenuItemProps) {
  const styles = useStyleConfig("MenuItem", { variant });
  const router = useRouter();

  return (
    <Flex as={"li"} __css={styles} onClick={onClick}>
      <Text>{name}</Text>
    </Flex>
  );
}
