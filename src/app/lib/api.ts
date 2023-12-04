export const updateDueDate = async (todoId: string, content: Date) => {
  const response = await fetch(
    new Request(`/api/duedate/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(content),
    }),
  )

  const data = await response.json()
  return data
}

export const signUpUser = async (form: any) => {
  const response = await fetch(
    new Request(`/api/user`, {
      method: 'POST',
      body: JSON.stringify({
        email: form.email,
        name: form.name,
        password: form.password,
      }),
    }),
  )

  const data = await response.json()
  return data
}
