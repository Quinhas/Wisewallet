import { Flex, Text } from '@chakra-ui/react'
import AccountCard from 'components/AccountCard'
import getGreeting from 'utils/getGreeting'

export default function Home() {

  return (
    <>
      <Flex py={'1rem'} as={'header'} direction={'column'}>
        <Flex px={'1rem'} justify={'space-between'} align={'center'}>
          <Text fontWeight={'medium'} fontSize={'1.5rem'}>{getGreeting()}, Lucas!</Text>
        </Flex>
        <Flex px={'1rem'} justify={'space-between'} align={'center'} fontSize={'1.5rem'}>
          <Text color={'gray.500'}>Saldo:</Text>
          <Text color={"primaryApp.300"} fontWeight="bold">
            R$ 128,12
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        py={'1rem'}
        overflowX={"auto"}
        justify={"space-between"}
        shrink={1}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <AccountCard id={'1'} type="Cash" value={8} />
        <AccountCard id={'2'} type="Others" value={20.12} name="PicPay" />
        <AccountCard id={'3'} type="Others" value={20.12} />
        <AccountCard id={'4'} type="Others" value={20.12} />
      </Flex>
    </>
  )
}
