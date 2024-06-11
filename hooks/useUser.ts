import { User } from '../types/types'
import { gql, useMutation, useQuery } from "@apollo/client";

// Query para obtener todos los usuarios
const GET_ALL_USERS = gql`
  query Users {
    users {
      name
      image
      id
      email
      createdAt
      role
    }
  }
`
// Use:
// const { data, loading, error } = useGetAllUsers();
export const useGetAllUsers = () => {
  const { data, loading, error } = useQuery<{
    users: User[];
  }>(GET_ALL_USERS);
  return { data, loading, error };
}

// Query para obtener un usuario por id
const UPDATE_ROLE = gql`
  mutation UpdateRole($userId: String!, $role: String!) {
    updateRole(userId: $userId, role: $role) {
      id
      role
    }
  }
`
//const { updateRole, data, loading, error } = useUpdateRole()
// updateRole({
//   variables: {
//     userId: userId,
//     role: role
//   }
// })
// Funcion que actualiza el rol de un usuario
export const useUpdateRole = () => {
  const [updateRole, { data, loading, error }] = useMutation<{
    updateRole: User
  }>(UPDATE_ROLE)
  return { updateRole, data, loading, error }
}