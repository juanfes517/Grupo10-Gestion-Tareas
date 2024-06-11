import { Task } from "@/types/types";
import { gql, useMutation, useQuery } from "@apollo/client";

// Query para obtener todas las tareas de un usuario
const GET_ALL_BY_USERID = gql`
  query Tasks($userId: String!) {
    tasks(userId: $userId) {
      id
      name
      state
      description
      expires
      isPersonal
      project {
        color
      }
    }
  }
`
//Uso: 
//const { data, loading, error } = useGetAllByUserId('id')
// Fucnion que obtiene todas las tareas de un usuario
export const useGetAllByUserId = (userId: any) => {
  const { data, loading, error, refetch  } = useQuery<{
    tasks: Task[]
  }>(GET_ALL_BY_USERID, {
    variables: {
      userId
    }
  })
  return { data, loading, error, refetch }
}

// Query para obtener todas las tareas de un proyecto
const GET_ALL_BY_PROJECTID = gql`
  query Task_of_project($projectId: String!) {
    task_of_project(projectId: $projectId) {
      id
      name
      state
      description
      expires
      responsible {
        email
        image
      }
    }
  }
`
//Uso: 
//const { data, loading, error } = useGetAllByProjectId('id')
// Funcion que obtiene todas las tareas de un proyecto
export const useGetAllByProjectId = (projectId: any) => {
  const { data, loading, error, refetch } = useQuery<{
    task_of_project: Task[]
  }>(GET_ALL_BY_PROJECTID, {
    variables: {
      projectId
    }
  })
  return { data, loading, error, refetch }
}

// Query para obtener todas las tareas personales de un usuario
const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $description: String!, $email: String!, $projectId: String!, $expires: DateTime!, $isPersonal: Boolean!) {
    createTask(name: $name, description: $description, email: $email, projectId: $projectId, expires: $expires, isPersonal: $isPersonal) {
      id
    }
  }
`
//const { createTask, data, loading, error } = useCreateTask()
// createTask({
//   variables: {
//     "name": data.name,
//     "description": data.description,
//     "email": resp,
//     "expires": new Date(data.expires).toISOString(),
//     "isPersonal": isPersonal,
//     "projectId": projectId
//   }
// })
// Funcion que crea una tarea
export const useCreateTask = () => {
  const [createTask, { data, loading, error }] = useMutation<{
      createTask: Task
  }>(CREATE_TASK)
  return { createTask, data, loading, error };
}

// Query para obtener todas las tareas personales de un usuario
const DELETE_TASK = gql`
  mutation DeleteTask($taskId: String!) {
    deleteTask(taskId: $taskId) {
      id
    }
  }
`
// const { deleteTask, data, loading, error } = useDeleteTask()
// deleteTask({
//   variables: {
//     taskId: taskId
//   }
// })
// Funcion que elimina una tarea
export const useDeleteTask = () => {
  const [deleteTask, { data, loading, error }] = useMutation<{
    deleteTask: Task
  }>(DELETE_TASK)
  return { deleteTask, data, loading, error };
}

// Query para obtener todas las tareas personales de un usuario
const UPDATE_STATE = gql`
  mutation Mutation($taskId: String!, $state: String!) {
    updateState(taskId: $taskId, state: $state) {
      id
      state
    }
  }
`
//const { updateState, data, loading, error } = useUpdateState()
// updateState({
//   variables: {
//     taskId: taskId,
//     state: event.target.value
//   }
// })
export const useUpdateState = () => {
  const [updateState, { data, loading, error }] = useMutation<{
    updateState: Task
  }>(UPDATE_STATE)
  return { updateState, data, loading, error }
}