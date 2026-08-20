"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  FileText,
  Home,
  LogOut,
  Plus,
  ShieldCheck,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

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

  const initial =
    user?.name?.charAt(0).toUpperCase() || "U"

  return (
    <header className="rounded-xl border bg-card shadow-sm">
      <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        {/* User */}
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-11 w-11 shrink-0 rounded-lg border">
            <AvatarImage
              src={user?.photo}
              alt={user?.name || "User"}
            />

            <AvatarFallback className="rounded-lg text-sm font-semibold">
              {initial}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-lg font-semibold tracking-tight">
                {greeting}, {user?.name || "Pengguna"}
              </h1>

              <Badge
                variant="secondary"
                className="hidden gap-1 text-xs font-normal sm:inline-flex"
              >
                <ShieldCheck className="h-3 w-3" />
                Admin
              </Badge>
            </div>

            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="hidden sm:inline">
                Platform Surat Digital
              </span>

              <span className="hidden sm:inline">•</span>

              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                {lettersCount} template
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Button
            size="sm"
            onClick={onNewTemplate}
            className="sm:h-9"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Template Baru
          </Button>

          <Link
            href="/dashboard/guide"
            target="_blank"
            className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <BookOpen className="mr-1.5 h-4 w-4" />
            Panduan
          </Link>

          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="mr-1.5 h-4 w-4" />
            Beranda
          </Link>

          <Button
            size="sm"
            variant="ghost"
            onClick={onLogout}
            className="h-9 text-destructive hover:text-destructive"
          >
            <LogOut className="mr-1.5 h-4 w-4" />
            Keluar
          </Button>
        </div>
      </div>
    </header>
  )
}