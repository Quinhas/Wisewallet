import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Home() {
  const [showValues, setShowValues] = useState(false);
  
  return (
    <Flex py={"1rem"} direction="column" gridGap={'1.5rem'}>
      <Flex direction="column" gridGap={'0.5rem'} px={'1rem'}>
        <Text fontWeight="medium" fontSize={'1.5rem'} >Good morning, Lucas!</Text>
        <Flex justify={'space-between'} fontSize={'1.5rem'}>
          <Text color={'gray.500'}>Balance:</Text>
          <Flex align={'center'} gridGap={'0.5rem'}>
            <Text color={'primary.600'} fontWeight="bold">R$ {showValues ? '128,12' : '----'}</Text>
            <Icon as={showValues ? FaEyeSlash : FaEye} color={'gray.500'} _hover={{color: 'gray.600'}} _active={{color: 'primary.600'}} onClick={() => setShowValues(!showValues)}/>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
