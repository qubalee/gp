import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  name: string
  level: number
  xp: number
  totalQuizzes: number
  correctAnswers: number
  streak: number
  countriesExplored: number
  badges: number
}

interface QuizResult {
  id: string
  score: number
  totalQuestions: number
  date: string
  category: string
}

interface AppState {
  user: User
  quizResults: QuizResult[]
  theme: 'light' | 'dark'
  
  // Actions
  updateUser: (updates: Partial<User>) => void
  addQuizResult: (result: QuizResult) => void
  setTheme: (theme: 'light' | 'dark') => void
  resetProgress: () => void
}

const initialUser: User = {
  name: 'Geography Explorer',
  level: 1,
  xp: 0,
  totalQuizzes: 0,
  correctAnswers: 0,
  streak: 0,
  countriesExplored: 0,
  badges: 0
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: initialUser,
      quizResults: [],
      theme: 'light',

      updateUser: (updates) =>
        set((state) => ({
          user: { ...state.user, ...updates }
        })),

      addQuizResult: (result) =>
        set((state) => ({
          quizResults: [result, ...state.quizResults.slice(0, 49)] // Keep last 50 results
        })),

      setTheme: (theme) => set({ theme }),

      resetProgress: () =>
        set({
          user: initialUser,
          quizResults: []
        })
    }),
    {
      name: 'geoprompts-storage',
      partialize: (state) => ({
        user: state.user,
        quizResults: state.quizResults,
        theme: state.theme
      })
    }
  )
)