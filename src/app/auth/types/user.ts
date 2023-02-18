export type CreateUserData = {
  name: string,
  email: string,
  password: string
}

export type LoginUserData = Omit<CreateUserData, "name">
