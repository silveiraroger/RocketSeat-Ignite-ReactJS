import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type UserCreateFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const userCreateFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('Email é obrigatório').email('Informe um e-mail válido'),
  password: yup.string().required('Senha é obrigatória').min(6, 'No mimnimo 6 caracteres'),
  passwordConfirmation: yup.string().oneOf([null, yup.ref('password')], 'As senha precisam ser iguais')
})

export default function UserCreate() {
  const router = useRouter();

  const createUser = useMutation(async (user: UserCreateFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userCreateFormSchema)
  });
  const { errors, isSubmitting } = formState;

  const handleCreateUser: SubmitHandler<UserCreateFormData> = async (values, event) => {
    await createUser.mutateAsync(values);

    router.push('/users');
  }

  return (
    <Box>
      <Header />

      <Flex width="100%" marginY="6" maxWidth={1480} marginX="auto" paddingX="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          background="gray.800"
          padding={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider marginY="6" borderColor="gary.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input name="name" label="Nome completo" {...register("name")} error={errors.name} />
              <Input name="email" type="email" label="E-mail" {...register("email")} error={errors.email} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input name="password" type="password" label="Senha" {...register("password")} error={errors.password} />
              <Input name="passwordConfirmation" type="password" {...register("passwordConfirmation")} label="Confirmação da senha" error={errors.passwordConfirmation} />
            </SimpleGrid>
          </VStack>

          <Flex marginTop="8" justifyContent="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}