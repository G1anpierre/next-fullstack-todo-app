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
