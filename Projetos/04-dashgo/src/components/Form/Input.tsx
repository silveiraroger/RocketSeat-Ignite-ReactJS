import { FormLabel, FormControl, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";


interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor="email">{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="pink.500"
        backgroundColor="gray.900"
        variant="filled"
        _hover={{
          backgroundColor: 'gray.900'
        }}
        size="lg"
        {...rest}
      />
    </FormControl>
  )
}