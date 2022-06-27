import {
  Flex, Grid, Heading, Text, useStyleConfig
} from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";

type StatementListItemProps = {
  variant: "income" | "expense" | "transfer";
  value: number;
  title?: string;
  account?: string;
  category?: string;
  origin?: string;
  destination?: string;
} & Partial<StyleFunctionProps>

export default function StatementListItem({
  title, account, origin, destination, value, category, variant, ...rest
}: StatementListItemProps) {

  const variants = {
    variant,
    rest
  };

  const styles = useStyleConfig("StatementListItem", variants);

  if (["income", "expense"].includes(variant)) {
    return (
      <Grid __css={styles}>
        <Flex direction={'column'} me={'1rem'} overflow={'hidden'}>
          <Heading>{title || '-'}</Heading>
          {variant === 'expense' && (
            <Text fontFamily={'mono'} color={"gray.500"} fontSize={'0.75rem'} textTransform={'uppercase'}>
              {category || '-'}
            </Text>
          )}
        </Flex>
        <Flex direction={'column'} textAlign={"end"}>
          <Text className="value">
            {variant === 'expense' ? '- ' : '+ '}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(value)}
          </Text>
          <Text
            fontFamily={"mono"}
            color={"gray.500"}
            fontSize={"0.75rem"}
            textTransform={"uppercase"}
          >
            {account || '-'}
          </Text>
        </Flex>
      </Grid>
    )
  }

  return (
    <Grid __css={styles}>
      <Flex className="info">
        <Flex>
          <Text>Origem:</Text>
          <Text>Destino:</Text>
        </Flex>
        <Flex>
          <Heading>{origin || '-'}</Heading>
          <Heading>{destination || '-'}</Heading>
        </Flex>
      </Flex>
      <Text className="value">
        {variant === 'expense' && '- '}
        {variant === 'income' && '+ '}
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)}
      </Text>
    </Grid>
  )
}
