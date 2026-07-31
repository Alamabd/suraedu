"use client"

import { FileText, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"
import { useAuth } from "@/store/useAuth"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { login, user } = useAuth()
  const router = useRouter()

  const loginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()

      const credential = await signInWithPopup(auth, provider);

      console.log(credential.user)
      const token = await credential.user.getIdToken();
      if(token) {
        const reqServer =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await reqServer.json()
        if(!reqServer.ok) {
          throw new Error("Internel server login error")
        }
        login(data.token, data.user);
        router.push("/dashboard")
      } else {
        throw new Error("Token tidak valid")
      }
    } catch (err) {
      toast.error(
        "Pemberitahuan",
        {
          description: err instanceof Error ? err.message ? err.message : "No message error" : "Unknown error",
          position: "top-center",
          richColors: true, 
        }
      ) 
    }
  }

  const handleButton = () => {
    if(user) {
      router.push("/dashboard")
    } else {
      console.log("login google")
      loginGoogle()
    }
  }

  return (
    <header className="absolute z-10 left-0 right-0 py-3 border-b backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <FileText size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">SuraEdu</h1>

            <p className="text-xs text-muted-foreground">
              Template Surat Instansi Pendidikan
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#hero"
              className="text-sm font-medium text-muted-foreground transition hover:text-primary"
            >
              Beranda
            </a>
            <a
              href="/guide"
              className="text-sm font-medium text-muted-foreground transition hover:text-primary"
            >
              Panduan
            </a>
            <a
              href="#benefits"
              className="text-sm font-medium text-muted-foreground transition hover:text-primary"
            >
              Benefits
            </a>
          </nav>

          {/* Login */}

          <Button className="gap-2 rounded-xl" onClick={handleButton}>
            <LogIn size={18} />
            {
              user?.name ?
              user.name
              :
              "Masuk dengan Google"
            }
          </Button>
        </div>
      </div>
    </header>
  )
}
