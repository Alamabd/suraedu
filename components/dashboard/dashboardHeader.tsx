"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  FileText,
  Home,
  Layers,
  LogOut,
  Plus,
  ShieldCheck,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface User {
  id?: number
  uid?: string
  name?: string
  email?: string
  photo?: string
  provider?: string
}

interface DashboardHeaderProps {
  user: User | null
  lettersCount: number
  onNewTemplate: () => void
  onLogout: () => void
}

export default function DashboardHeader({
  user,
  lettersCount,
  onNewTemplate,
  onLogout,
}: DashboardHeaderProps) {
  const [greeting, setGreeting] = useState("Selamat datang")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 3 && hour < 11) {
      setGreeting("Selamat pagi")
    } else if (hour >= 11 && hour < 15) {
      setGreeting("Selamat siang")
    } else if (hour >= 15 && hour < 18) {
      setGreeting("Selamat sore")
    } else {
      setGreeting("Selamat malam")
    }
  }, [])

  const initial = user?.name?.charAt(0).toUpperCase() || "U"

  return (
    <header className="rounded-xl border bg-card p-6 shadow-2xs">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: User Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 rounded-xl border">
            <AvatarImage src={user?.photo} alt={user?.name || "User"} />
            <AvatarFallback className="rounded-xl text-lg font-semibold">
              {initial}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {greeting}, {user?.name || "Pengguna"}
              </h1>
              <Badge variant="secondary" className="gap-1 font-normal">
                <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                Administrator
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Kelola template surat administrasi pendidikan dengan cepat dan efisien.
            </p>

            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-0.5">
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                <span>Platform Surat Digital</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                <span>{lettersCount} Template Tersedia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onNewTemplate}>
            <Plus className="mr-2 h-4 w-4" />
            Template Baru
          </Button>

          <Link href="/guide" target="_blank">
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Panduan
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Beranda
            </Button>
          </Link>

          <Button variant="destructive" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
