export const updateDueDate = async (todoId: string, content: Date) => {
  console.log('value: ', {todoId, content})
  const response = await fetch(
    new Request(`/api/duedate/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify(content),
    }),
  )

  const data = await response.json()
  return data
}
