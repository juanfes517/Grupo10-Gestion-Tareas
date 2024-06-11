export interface User {
  id: string
  email: string
  image: string
  name: string
  role: string
  createdAt: Date
}

export interface Task {
  id: string
  name: string
  state: string
  description: string
  expires: Date
  isPersonal: boolean
  project: Project
  projectId: string
  responsible: User
  userId: string
}

export interface Project {
  id: string
  name: string
  state: string
  description: string
  expires: Date
  color: string
}

export interface UserProject {
  id: string
  userId: string
  projectId: string
  project: Project
  user: User
}