'use client'
import {useState, useEffect, forwardRef} from 'react'
import {format} from 'date-fns'
import DatePicker from 'react-datepicker'
import {updateDueDate} from '../lib/api'

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(({value, onClick}: any, ref: any) => {
  return (
    <button
      className="border border-gray-300 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
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
    setStartDate(date)
    const updatedDueDate = await updateDueDate(todoId, date)
    // * I need to handle this return value maybe to update the date then..
    // TODO handle when task is complete
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      customInput={<CustomInput />}
    />
  )
}
