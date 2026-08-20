"use client"

import { FileText, LogIn, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useAuth } from "@/store/useAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
  const { loginGoogle, user } = useAuth()
  const router = useRouter()

  const [search, setSearch] = useState("")

  const requestLogin = async () => {
    try {
      await loginGoogle()
      router.push("/dashboard")
    } catch (err) {
      toast.error("Pemberitahuan", {
        description:
          err instanceof Error
            ? err.message || "No message error"
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const query = search.trim()

    if (!query) return

    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex justify-between h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <div
          className="flex shrink-0 cursor-pointer items-center gap-3"
          onClick={() => router.push("/")}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-base font-bold tracking-tight">
              SuraEdu
            </h1>

            <p className="text-[11px] text-muted-foreground">
              Template Surat Generator
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-3">
        <form
          onSubmit={handleSearch}
          className="mx-auto w-full max-w-md"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari template surat..."
              className="h-9 rounded-lg bg-muted/50 pl-9 pr-4"
            />
          </div>
        </form>

        {/* Login / User */}
        <div className="shrink-0">
          <Button
            onClick={handleButton}
            size="sm"
            className="gap-2 rounded-lg"
          >
            <LogIn className="h-4 w-4" />

            <span className="hidden sm:inline">
              {user?.name || "Masuk dengan Google"}
            </span>

            <span className="sm:hidden">
              {user ? "Dashboard" : "Masuk"}
            </span>
          </Button>
        </div>
        </div>
      </div>
    </header>
  )
}