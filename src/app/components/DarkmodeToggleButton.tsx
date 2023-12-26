'use client'

import {useTheme} from 'next-themes'
import {SunIcon, MoonIcon} from '@heroicons/react/20/solid'

export const DarkmodeToggleButton = () => {
  const {theme, setTheme} = useTheme()

  return (
    <button
      className="bg-black hover:bg-red-700 text-white font-bold p-1.5 px-4 rounded-full dark:bg-white dark:text-black dark:hover:bg-red-700 dark:hover:text-white"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-white" />
      ) : (
        <MoonIcon className="h-5 w-5 text-white" />
      )}
    </button>
  )
}
