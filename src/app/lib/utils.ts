import {StatusesType} from './types'

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const statuses: StatusesType = {
  COMPLETE: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  PENDING: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
