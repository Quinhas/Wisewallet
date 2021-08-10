import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  OtherProps,
  useColorMode,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormEvent } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "src/hooks/useAuth";

type FormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  initialEmail?: string;
  initialPassword?: string;
};

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const [loading, setLoading] = useState(false);
  const { signInWithEmailAndPassword } = useAuth();
  const { touched, errors, isValid, handleBlur, handleChange } = props;
  const { colorMode } = useColorMode();
  const toast = useToast();
  const router = useRouter();

  async function handleLoginButton(ev: FormEvent) {
    ev.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        props.values.email,
        props.values.password
      );
      toast({
        description: "User logged in successfully.",
        status: "success",
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 9000,
      });
    }
    setLoading(false);
  }

  return (
    <Flex as={Form} gridGap={"1rem"} direction={"column"}>
      <FormControl isInvalid={errors.email && touched.email ? true : false}>
        <Input
          as={Field}
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="E-mail"
          bg={colorMode === "light" ? "white" : "black"}
          color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"}
          h={"2.875rem"}
          borderRadius={"0.5rem"}
          p={"0 1rem"}
          border={"1px solid"}
          w={"100%"}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={errors.password && touched.password ? true : false}
      >
        <Input
          as={Field}
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          bg={colorMode === "light" ? "white" : "black"}
          color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"}
          h={"2.875rem"}
          borderRadius={"0.5rem"}
          p={"0 1rem"}
          border={"1px solid"}
          w={"100%"}
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        w={"100%"}
        mt={"1rem"}
        rightIcon={<FaSignInAlt />}
        isLoading={loading}
        onClick={handleLoginButton}
        disabled={!touched.email || !isValid || loading}
      >
        Login
      </Button>
      <Text
        fontSize={"0.875rem"}
        color={colorMode === "light" ? "blackAlpha.600" : "whiteAlpha.600"}
      >
        Not registered yet?{" "}
        <Link as={link} href="/signup" color={"secondaryApp.500"}>
          Click here
        </Link>
      </Text>
    </Flex>
  );
};

export const LoginForm = withFormik<LoginFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props: LoginFormProps) => {
    return {
      email: "",
      password: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "This field cannot be empty.";
    }
    if (!values.password) {
      errors.password = "This field cannot be empty.";
    }
    if (values.password.length < 6) {
      errors.password = "The password must be longer than 6 characters.";
    }
    return errors;
  },

  handleSubmit: (values: FormValues) => {
    // do submitting things
  },
})(InnerForm);
