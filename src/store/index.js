import { create } from 'zustand'

export const useStore = create((set) => ({
	team: null,
	selectTeam: (team) => set({ team })
}))
