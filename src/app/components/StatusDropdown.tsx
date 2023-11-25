import React from 'react'
import {Status} from './Status'

export const StatusDropdown = ({
  todoPosibleStatus,
  defaultValue,
}: {
  todoPosibleStatus: string[]
  defaultValue: string
}) => {
  return (
    <div>
      <label
        htmlFor="status"
        className="block text-sm font-medium leading-6 text-gray-900"
      ></label>
      <select
        name="status"
        id="status"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={defaultValue}
      >
        {todoPosibleStatus.map(status => (
          <option value={status} key={status}>
            <Status status={status} />
          </option>
        ))}
      </select>
    </div>
  )
}
