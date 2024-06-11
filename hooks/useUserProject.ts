import { UserProject } from "@/types/types";
import { gql, useMutation, useQuery } from "@apollo/client";

// Query para obtener todos los proyectos de un usuario
const GET_ALL_BY_USERID = gql`
  query All_projects_of_a_user($userId: String!) {
    all_projects_of_a_user(userId: $userId) {
      project {
        id
        name
        state
        description
        expires
        color
      }
    }
  }
`

//uso:
//const { data, loading, error } = useGetAllByUserId('id')
// Funcion que obtiene todos los proyectos de un usuario
export const useGetAllByUserId = (userId: any) => {
  const { data, loading, error, refetch } = useQuery<{
    all_projects_of_a_user: UserProject[]
  }>(GET_ALL_BY_USERID, {
    variables: {
      userId
    }
  })
  return { data, loading, error, refetch }
}

// Query para obtener todos los usuarios de un proyecto
const GET_ALL_BY_PROJECTID = gql`
  query All_users_of_a_project($projectId: String!) {
    all_users_of_a_project(projectId: $projectId) {
      id
      user {
        id
        email
        image
      }
    }
  }
`

//uso:
//const { data, loading, error } = useGetAllByProjectId('id')
// Funcion que obtiene todos los usuarios de un proyecto
export const useGetAllByProjectId = (projectId: any) => {
  const { data, loading, error, refetch } = useQuery<{
    all_users_of_a_project: UserProject[]
  }>(GET_ALL_BY_PROJECTID, {
    variables: {
      projectId
    }
  })
  return { data, loading, error, refetch }
}

// Query para asignar un usuario a un proyecto
const ASSIGN_USER = gql`
  mutation AssignUsers($projectId: String!, $email: String!) {
    assignUsers(projectId: $projectId, email: $email) {
      id
    }
  }
`
// const { assignUsers, data, loading, error } = useAssignUsers()
// assignUsers({
//   variables: {
//     projectId: projectId,
//     email: email
//   }
// })
// Funcion que asigna un usuario a un proyecto
export const useAssignUsers = () => {
  const [assignUsers, { data, loading, error }] = useMutation<{
    assignUsers: UserProject
  }>(ASSIGN_USER)
  return { assignUsers, data, loading, error };
}


// Query para eliminar un usuario de un proyecto
const DELETE_USER_PROJECT = gql`
  mutation DeleteUserProject($userProjectId: String!) {
    deleteUserProject(userProjectId: $userProjectId) {
      id
    }
  }
`
// const { deleteUserProject, data, loading, error} = useDeleteUserProject()
// deleteUserProject({
//   variables: {
//     projectId: projectId,
//     userId: userId 
//   }
// })
// Funcion que elimina un usuario de un proyecto
export const useDeleteUserProject = () => {
  const [deleteUserProject, { data, loading, error }] = useMutation<{
    deleteUserProject: UserProject
  }>(DELETE_USER_PROJECT)
  return { deleteUserProject, data, loading, error };
}