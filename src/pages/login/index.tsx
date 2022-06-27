import {
  Box,
  Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, LightMode, Text, useColorModeValue, useToast
} from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import ToggleThemeButton from "components/ToggleThemeButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  FaFacebookF,
  FaGoogle, FaSignInAlt, FaTwitter
} from "react-icons/fa";
import {
  invalidEmailMessage, passwordMinMessage, requiredFieldMessage
} from "utils/formValidationMessages";
import { errorToast } from "utils/toastConfig";
import * as yup from 'yup';

type FormFields = {
  email: string;
  password: string;
}

export default function SignIn() {

  const schema = yup.object().shape({
    email: yup.string().required(requiredFieldMessage).email(invalidEmailMessage),
    password: yup.string().required(requiredFieldMessage).min(6, passwordMinMessage)
  })

  const {
    register, handleSubmit, formState: {
      errors, isSubmitting, isValid
    }
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const router = useRouter();
  const toast = useToast();

  async function handleLogin(data: FormFields) {
    try {
      console.log(data);
      await router.push('/');
    } catch (error) {
      toast({
        ...errorToast,
        description: error instanceof Error ? error.message : 'Unable to login. Try again.',
      })
    }
  }

  return (
    <>
      <Box
        position={'absolute'}
        top={'1rem'}
        right={'1rem'}
      >
        <ToggleThemeButton />
      </Box>
      <Flex px={'1rem'} py={'2rem'} direction={"column"} minH={'100vh'}>
        <Heading color={'primaryApp.300'} fontSize={'2.5rem'}>Entrar</Heading>
        <Flex direction={"column"} gap={'1rem'} py={'5.625rem'} justify={'center'} grow={1} as="form" onSubmit={handleSubmit(handleLogin)}>
          <FormControl as={Flex} isInvalid={errors.email ? true : false} direction={'column'}>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input type="mail" placeholder="e.g. wise@wallet.com" {...register('email')} />
            <FormErrorMessage>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl as={Flex} isInvalid={errors.password ? true : false} direction={'column'}>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input type="password" placeholder="min 6 caracteres" {...register('password')} />
            <FormErrorMessage>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>
          <Text align={'end'}>
            <Link href="/">Esqueceu a senha?</Link>
          </Text>
          <Box pt={'3rem'}>
            <Button colorScheme={'primaryApp'} w={'100%'} rightIcon={<FaSignInAlt />} type="submit" isLoading={isSubmitting} isDisabled={!isValid}>Entrar</Button>
            <Text align={'center'} pt={'0.5rem'}>
              Ainda não possui uma conta? <Link href={'/signup'}>Cadastre-se</Link>
            </Text>
          </Box>
        </Flex>
        <Flex direction={'column'} gap={'1rem'}>
          <Flex
            fontSize={"0.875rem"}
            color={useColorModeValue("blackAlpha.600", "whiteAlpha.500")}
            align={"center"}
            _before={{
              content: `''`,
              flex: 1,
              height: "1px",
              background: `${useColorModeValue("blackAlpha.400", "whiteAlpha.500")
                }`,
              marginRight: "1rem",
            }}
            _after={{
              content: `''`,
              flex: 1,
              height: "1px",
              background: `${useColorModeValue("blackAlpha.400", "whiteAlpha.500")
                }`,
              marginLeft: "1rem",
            }}
          >
            ou continue com:
          </Flex>
          <Flex align={'center'} justify={'center'} gap={'1rem'}>
            <LightMode>
              <IconButton aria-label="Sign In with Facebook" icon={<FaFacebookF />} colorScheme={'facebook'} />
              <IconButton aria-label="Sign In with Google" icon={<FaGoogle />} colorScheme={'google'} />
              <IconButton aria-label="Sign In with Twitter" icon={<FaTwitter />} colorScheme={'twitter'} />
            </LightMode>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
