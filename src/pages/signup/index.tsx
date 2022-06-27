import {
  Box,
  Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, Text, useColorModeValue, useToast
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
  invalidDateMessage, invalidEmailMessage, passwordMinMessage, passwordsMatchMessage, requiredFieldMessage, termsAndConditionsMessage
} from "utils/formValidationMessages";
import { errorToast } from "utils/toastConfig";
import * as yup from 'yup';

type FormFields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: Date;
  termsAndConditions: boolean;
}

export default function SignUp() {

  const schema = yup.object().shape({
    name: yup.string().required(requiredFieldMessage),
    email: yup.string().required(requiredFieldMessage).email(invalidEmailMessage),
    password: yup.string().required(requiredFieldMessage).min(6, passwordMinMessage),
    confirmPassword: yup.string().required(requiredFieldMessage).oneOf([yup.ref('password'), null], passwordsMatchMessage),
    birthdate: yup.date().required(requiredFieldMessage).max(new Date(), invalidDateMessage).typeError(invalidDateMessage),
    termsAndConditions: yup.bool().required(requiredFieldMessage).isTrue(termsAndConditionsMessage)
  })

  const {
    register, handleSubmit, formState: {
      errors, isSubmitting, isValid
    }
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAndConditions: false
    }
  });
  const router = useRouter();
  const toast = useToast();

  async function handleSignUp(data: FormFields) {
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
        <Heading color={'primaryApp.300'} fontSize={'2.5rem'}>Cadastrar-se</Heading>
        <Flex direction={"column"} gap={'1rem'} py={'3rem'} justify={'center'} grow={1} as="form" onSubmit={handleSubmit(handleSignUp)}>
          <FormControl as={Flex} isInvalid={errors.name ? true : false} direction={'column'}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input type="mail" placeholder="e.g. John Doe" {...register('name')} />
            <FormErrorMessage>
              {errors.name?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl as={Flex} isInvalid={errors.email ? true : false} direction={'column'}>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input type="mail" placeholder="e.g. john.doe@email.com" {...register('email')} />
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
          <FormControl as={Flex} isInvalid={errors.confirmPassword ? true : false} direction={'column'}>
            <FormLabel htmlFor="confirmPassword">Confirmar Senha</FormLabel>
            <Input type="password" placeholder="" {...register('confirmPassword')} />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl as={Flex} isInvalid={errors.birthdate ? true : false} direction={'column'}>
            <FormLabel htmlFor="birthdate">Data de Nascimento</FormLabel>
            <Input type="date" placeholder="" {...register('birthdate')} />
            <FormErrorMessage>
              {errors.birthdate?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl as={Flex} isInvalid={errors.termsAndConditions ? true : false} direction={'column'} mt={'1rem'}>
            <Checkbox {...register('termsAndConditions')} colorScheme={'primaryApp'}>
              Eu concordo com os <Link href="/termsAndConditions">termos e condições.</Link>
            </Checkbox>
            <FormErrorMessage>
              {errors.termsAndConditions?.message}
            </FormErrorMessage>
          </FormControl>
          <Box pt={'3rem'}>
            <Button colorScheme={'primaryApp'} w={'100%'} rightIcon={<FaSignInAlt />} type="submit" isLoading={isSubmitting} isDisabled={!isValid}>Cadastrar</Button>
            <Text align={'center'} pt={'0.5rem'}>
              Já possui uma conta? <Link href={'/login'}>Faça login</Link>
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
            <IconButton isDisabled aria-label="Sign In with Facebook" icon={<FaFacebookF />} colorScheme={'facebook'} />
            <IconButton isDisabled aria-label="Sign In with Google" icon={<FaGoogle />} colorScheme={'google'} />
            <IconButton isDisabled aria-label="Sign In with Twitter" icon={<FaTwitter />} colorScheme={'twitter'} />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
