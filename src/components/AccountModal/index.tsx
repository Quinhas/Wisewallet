import {
  toast,
  ModalFooter,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useAuth } from "@hooks/useAuth";
import { database } from "@services/firebase";
import { id } from "date-fns/locale";
import { Form, FieldProps, Field, Formik } from "formik";
import React, { useRef } from "react";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import * as yup from "yup";

type AccountModalProps = {
  type?: "Cash" | "Bank" | "Others";
  value?: number;
  name?: string;
  id?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function AccountModal({
  type,
  name,
  value,
  id,
  isOpen,
  onClose,
}: AccountModalProps) {
  const { user } = useAuth();
  const toast = useToast();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const cancelRef = useRef(null);

  const ValidationSchema = yup.object().shape({
    type: yup.string().required("Required field."),
    name: yup.string(),
    balance: yup.number().required("Required field."),
  });

  const initialValues = {
    type: type ?? "Type",
    name: name ?? "",
    balance: value ?? 0,
  };

  const handleDelete = async () => {
    if (!user?.id) {
      console.error(`User ID not found.`);
      return;
    }
    const accountRef = database.ref(`users/${user.id}/accounts/${id}`);
    try {
      await accountRef.remove();
      toast({
        description: "Account deleted successfully.",
        status: "success",
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {id && "Edit"}
            {!id && "Create"} account
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                if (!user?.id) {
                  console.error(`User ID not found.`);
                  return;
                }
                if (!id) {
                  const accountsRef = database.ref(`users/${user.id}/accounts`);
                  try {
                    await accountsRef.push({
                      type: values.type,
                      balance: values.balance,
                      name: values.name ?? null,
                    });
                    toast({
                      description: "Account updated successfully.",
                      status: "success",
                      isClosable: true,
                    });
                    actions.resetForm();
                    onClose();
                  } catch (error) {
                    toast({
                      description: error.message,
                      status: "error",
                      isClosable: true,
                    });
                  }
                  return;
                }

                const accountRef = database.ref(
                  `users/${user.id}/accounts/${id}`
                );
                try {
                  console.log(values.balance);
                  await accountRef.update({
                    type: values.type,
                    balance: values.balance,
                    name: values.name.trim().length !== 0 ? values.name : null,
                  });
                  toast({
                    description: "Account updated successfully.",
                    status: "success",
                    isClosable: true,
                  });
                  actions.resetForm();
                  onClose();
                } catch (error) {
                  toast({
                    description: error.message,
                    status: "error",
                    isClosable: true,
                  });
                }
              }}
              validationSchema={ValidationSchema}
              validateOnMount={true}
            >
              {({
                values,
                dirty,
                isValid,
                isSubmitting,
                isInitialValid,
                touched,
              }) => (
                <Flex
                  as={Form}
                  gridRowGap={"1rem"}
                  direction={"column"}
                  w={"100%"}
                >
                  <Field name="type" value={type ?? "Type"}>
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          form.errors.type && form.touched.type ? true : false
                        }
                        isRequired
                      >
                        <FormLabel htmlFor="type">Type</FormLabel>
                        <Select {...field} id="type">
                          <option value="Type" hidden disabled>
                            Choose one
                          </option>
                          <option value="Cash">Cash</option>
                          <option value="Bank">Bank Account</option>
                          <option value="Others">Others</option>
                        </Select>
                        <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="name">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          form.errors.name && form.touched.name ? true : false
                        }
                      >
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Name"
                          type={"text"}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="balance">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          form.errors.balance && form.touched.balance
                            ? true
                            : false
                        }
                        isRequired
                      >
                        <FormLabel htmlFor="balance">Balance</FormLabel>
                        <Input
                          {...field}
                          id="balance"
                          placeholder="Balance"
                          autoComplete={"off"}
                          step={0.01}
                          type={"number"}
                        />
                        <FormErrorMessage>
                          {form.errors.balance}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex py={"1rem"} gridGap={"0.5rem"} px={0} grow={1}>
                    {id && (
                      <Flex>
                        <Button
                          colorScheme={"danger"}
                          variant={"outline"}
                          leftIcon={<FaTrashAlt />}
                          onClick={onOpenConfirm}
                        >
                          Delete
                        </Button>
                      </Flex>
                    )}
                    <Flex ms={"auto"}>
                      <Button onClick={onClose} variant="ghost">
                        {id && "Cancel"}
                        {!id && "Return"}
                      </Button>
                      <Button
                        colorScheme={"primaryApp"}
                        isLoading={isSubmitting}
                        isDisabled={!dirty || !isValid}
                        type="submit"
                        leftIcon={<FaSave />}
                      >
                        {id && "Save"}
                        {!id && "Create"}
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isOpenConfirm}
        leastDestructiveRef={cancelRef}
        onClose={onCloseConfirm}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="danger" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
