"use client"

import { FileText, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useAuth } from "@/store/useAuth"
import { useRouter } from "next/navigation"
import { loginGoogleService } from "@/services/auth"

export default function Navbar() {
  const { loginGoogle, user } = useAuth()
  const router = useRouter()

  const requestLogin = async () => {
    try {
      await loginGoogle()
      router.push("/dashboard")
    } catch (err) {
      toast.error("PemloginGoogleberitahuan", {
        description:
          err instanceof Error
            ? err.message
              ? err.message
              : "No message error"
            : "Unknown error",
        position: "top-center",
        richColors: true,
      })
    }
  }

  const handleButton = () => {
    if (user) {
      router.push("/dashboard")
    } else {
      requestLogin()
    }
  }

  return (
    <header className="absolute right-0 left-0 z-10 border-b py-3 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between sm:px-16 px-6">
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
            {user?.name ? user.name : "Masuk dengan Google"}
          </Button>
        </div>
      </div>
    </header>
  )
}
