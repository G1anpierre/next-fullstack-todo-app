'use client'
import {useState, forwardRef} from 'react'
import {format} from 'date-fns'
import DatePicker from 'react-datepicker'
import {updateDueDate} from '../lib/api'
import {toast} from 'sonner'

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(({value, onClick}: any, ref: any) => {
  return (
    <button
      className="border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
      onClick={onClick}
      ref={ref}
      type="button"
    >
      {value
        ? `Due Date: ${format(new Date(value), 'MM/dd/yyyy')}`
        : 'No Due Date'}
    </button>
  )
})

export const DueDateSelector = ({
  todoId,
  dueDate,
}: {
  todoId: string
  dueDate?: Date | null
}) => {
  const [startDate, setStartDate] = useState<Date | null | undefined>(dueDate)

  const handleChange = async (date: Date) => {
    const updatedDueDate = await updateDueDate(todoId, date)
    if (updatedDueDate.data) {
      toast.success('Date updated successfully')
      setStartDate(new Date(updatedDueDate.data.dueDate))
    } else {
      toast.error('Something went wrong when updated the date')
    }
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      customInput={<CustomInput />}
    />
  )
}
