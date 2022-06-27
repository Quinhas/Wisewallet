import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay, Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, Select, useDisclosure
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import * as yup from "yup";

type AccountModalProps = {
  type?: "Cash" | "Bank" | "Others";
  value?: number;
  name?: string;
  id?: string | number;
  isOpen: boolean;
  onClose: () => void;
};

type FormFields = {
  type: string;
  name: string;
  balance: number;
}

export default function AccountModal({
  type,
  name,
  value,
  id,
  isOpen,
  onClose,
}: AccountModalProps) {
  // const toast = useToast();
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

  const {
    register, handleSubmit, formState: {
      errors, isSubmitting, isValid
    }
  } = useForm<FormFields>({
    resolver: yupResolver(ValidationSchema),
    mode: 'onChange',
    defaultValues: {
      type: type ?? "Type",
      name: name ?? "",
      balance: value ?? 0,
    }
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {id && "Editar"}
            {!id && "Criar"} conta
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              as={'form'}
              gridRowGap={"1rem"}
              direction={"column"}
              w={"100%"}
              onSubmit={handleSubmit(() => { console.log('handleSubmit') })}
            >
              <FormControl isInvalid={errors.type ? true : false} isRequired>
                <FormLabel htmlFor="type">Tipo</FormLabel>
                <Select {...register('type')}>
                  <option value="Type" hidden disabled>
                    Selecionar
                  </option>
                  <option value="Cash">Dinheiro</option>
                  <option value="Bank">Conta Bancária</option>
                  <option value="Others">Outros</option>
                </Select>
                <FormErrorMessage>{errors.type}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.name ? true : false}>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input placeholder="Nome" type={"text"} {...register('name')} />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.balance ? true : false} isRequired>
                <FormLabel htmlFor="balance">Saldo</FormLabel>
                <Input
                  placeholder="Saldo"
                  autoComplete={"off"}
                  step={0.01}
                  type={"number"}
                  {...register('balance')}
                />
                <FormErrorMessage>
                  {errors.balance}
                </FormErrorMessage>
              </FormControl>
              <Flex py={"1rem"} gridGap={"0.5rem"} px={0} grow={1}>
                {id && (
                  <Flex>
                    <Button
                      colorScheme={"danger"}
                      variant={"outline"}
                      leftIcon={<FaTrashAlt />}
                      onClick={onOpenConfirm}
                    >
                      Deletar
                    </Button>
                  </Flex>
                )}
                <Flex ms={"auto"}>
                  <Button onClick={onClose} variant="ghost">
                    {id && "Cancelar"}
                    {!id && "Voltar"}
                  </Button>
                  <Button
                    colorScheme={"primaryApp"}
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                    type="submit"
                    leftIcon={<FaSave />}
                  >
                    {id && "Salvar"}
                    {!id && "Criar"}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
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
              Deletar Conta
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza? Você não pode desfazer esta ação depois.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="danger" onClick={() => { console.log('handleDelete') }} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
