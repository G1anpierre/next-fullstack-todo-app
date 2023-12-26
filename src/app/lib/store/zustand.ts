import {create} from 'zustand'

type State = {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const useStore = create<State>(set => ({
  darkMode: false,
  toggleDarkMode: () => set(state => ({darkMode: !state.darkMode})),
}))
