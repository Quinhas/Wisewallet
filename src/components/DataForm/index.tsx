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
import { database } from "@services/firebase";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormEvent } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "src/hooks/useAuth";

type FormValues = {
  name: string;
  birthdate: string;
};

type DataFormProps = {
  initialName?: string;
  initialBirthdate?: string;
};

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const [loading, setLoading] = useState(false);
  const { user, signOut } = useAuth();
  const { touched, errors, isValid, handleBlur, handleChange } = props;
  const { colorMode } = useColorMode();
  const toast = useToast();
  const router = useRouter();

  async function handleLoginButton(ev: FormEvent) {
    ev.preventDefault();
    setLoading(true);
    try {
      await database.ref(`users/${user?.id}`).update({
        name: props.values.name,
        birthdate: props.values.birthdate,
      });
      toast({
        description: "Data updated successfully.",
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

  async function handleLogoutButton(ev: FormEvent) {
    ev.preventDefault();
    setLoading(true);
    try {
      await signOut();
      toast({
        description: "User logged out successfully.",
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
      <FormControl isInvalid={errors.name && touched.name ? true : false}>
        <Input
          as={Field}
          id="name"
          type="text"
          name="name"
          placeholder="Nome"
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
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={errors.birthdate && touched.birthdate ? true : false}
      >
        <Input
          as={Field}
          id="birthdate"
          type="date"
          name="birthdate"
          placeholder="Data de Nascimento"
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
        <FormErrorMessage>{errors.birthdate}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        w={"100%"}
        mt={"1rem"}
        rightIcon={<FaSignInAlt />}
        isLoading={loading}
        onClick={handleLoginButton}
        disabled={(!touched.name && !touched.birthdate) || !isValid || loading}
      >
        Continue
      </Button>
      <Text
        fontSize={"0.875rem"}
        color={colorMode === "light" ? "blackAlpha.600" : "whiteAlpha.600"}
      >
        Aren&apos;t you {user?.email}?{" "}
        <Button
          variant={"link"}
          fontSize={"0.875rem"}
          color={colorMode === "light" ? "blackAlpha.600" : "whiteAlpha.600"}
          onClick={handleLogoutButton}
        >
          Click here
        </Button>
      </Text>
    </Flex>
  );
};

export const DataForm = withFormik<DataFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props: DataFormProps) => {
    return {
      name: props.initialName || "",
      birthdate: props.initialBirthdate || "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = "This field cannot be empty.";
    }
    if (!values.birthdate) {
      errors.birthdate = "This field cannot be empty.";
    }
    return errors;
  },

  handleSubmit: (values: FormValues) => {
    // do submitting things
  },
})(InnerForm);
