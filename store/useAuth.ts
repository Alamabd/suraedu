import { auth } from "@/lib/firebase"
import { loginGoogleService } from "@/services/auth"
import { signOut } from "firebase/auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: number
  uid: string
  name: string
  email: string
  photo: string
  provider: string
}

interface AuthState {
  user: User | null

  loginGoogle: () => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      loginGoogle: async () => {
        const { user } = await loginGoogleService()
        set({
          user,
        })
      },

      logout: () => {
        signOut(auth)
        set({
          user: null,
        })
      },
    }),
    {
      name: "auth-storage",
    }
  )
)
