import { Flex, Button, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email é obrigatório').email('Informe um e-mail válido'),
  password: yup.string().required('Senha é obrigatória')
})

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(event);
    console.log(values);
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        background="gray.800"
        padding="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register("email")} 
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register("password")} 
          />
        </Stack>

        <Button
          type="submit"
          marginTop="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex >
  )
}
