import { Project } from "@/types/types"
import { gql, useMutation, useQuery } from "@apollo/client"

// Query para obtener todos los proyectos de un usuario
const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String!, $expires: DateTime!, $color: String!, $userId: String!) {
    createProject(name: $name, description: $description, expires: $expires, color: $color, userId: $userId) {
      id
    }
  }
`
//const { createProject, data, loading, error } = useCreateProject()
// createProject({
//   variables: {
//     "name": data.name,
//     "description": data.description,
//     "expires": new Date(data.expires).toISOString(),
//     "color": color,
//     "userId": session?.user.id,
//   }
// })
// onSubmitForm() // Para refrescar la lista de proyectos
export const useCreateProject = () => {
  const [createProject, { data, loading, error }] = useMutation<{
    createProject: Project
  }>(CREATE_PROJECT)
  return { createProject, data, loading, error };
}

// Query para obtener todos los proyectos de un usuario
const UPDATE_STATE_PROJECT = gql`
  mutation UpdateStateProject($projectId: String!, $state: String!) {
    updateStateProject(projectId: $projectId, state: $state) {
      id
    }
  }

`
//const { updateStateProject, data, loading, error } = useUpdateStateProject()
// updateStateProject({
//   variables: {
//     projectId: projectId,
//     state: event.target.value
//   }
// })
// onSubmitForm() // Para refrescar la lista de proyectos
export const useUpdateStateProject = () => {
  const [updateStateProject, { data, loading, error }] = useMutation<{
    updateStateProject: Project
  }>(UPDATE_STATE_PROJECT)
  return { updateStateProject, data, loading, error }
}
