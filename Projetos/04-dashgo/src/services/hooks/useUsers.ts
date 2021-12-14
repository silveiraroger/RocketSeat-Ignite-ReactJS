import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  users: User[],
  totalCount: number
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page: page
    }
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map(item => {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      createdAt: new Date(item.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  });

  return { 
    users,
    totalCount
  };
}

export function useUsers (page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 5 //Mantem os dados válidos durante 5 minutos em cache
  });
}