import {StatusesType} from './types'
import classNames  from 'classnames'


export function classNamesLib(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const statuses: StatusesType = {
  COMPLETE: 'text-green-700 bg-green-50 ring-green-600/20',
  IN_PROGRESS: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
  PLANNED: 'text-purple-700 bg-purple-50 ring-purple-600/20',
}

export const formattedStatus = (status: string) => {
  return (
    status.charAt(0).toUpperCase() +
    status.replace(/_/g, ' ').toLowerCase().slice(1)
  )
}

export const getClassNames = <T>(defaultClasses: string, error: T) => {
  return classNames(defaultClasses, {
    'border-red-500': !!error,
  })
}