import { auth } from "@/lib/firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const loginGoogleService = async () => {
  try {
    const provider = new GoogleAuthProvider()

    const credential = await signInWithPopup(auth, provider)

    const token = await credential.user.getIdToken()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Internal server login error")
    }

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
