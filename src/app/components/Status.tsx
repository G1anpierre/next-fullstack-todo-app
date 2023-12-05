import React from 'react'
import {classNamesLib, formattedStatus, statuses} from '../lib/utils'

export const Status = ({status}: {status: string}) => {
  return (
    <span
      className={classNamesLib(
        statuses[status],
        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
      )}
    >
      {formattedStatus(status)}
    </span>
  )
}
