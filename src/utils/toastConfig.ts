import { UseToastOptions } from "@chakra-ui/react";

export const errorToast: UseToastOptions = {
  isClosable: true,
  position: 'top-right',
  status: 'error',
  variant: 'solid',
  title: 'Oops!'
}
