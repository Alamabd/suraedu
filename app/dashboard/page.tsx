"use client"

import {
  BookOpen,
  Eye,
  FileText,
  LogOut,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/store/useAuth"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import LetterModal from "@/components/dashboard/letterModal"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Letter {
  id: string
  user_id: number
  title: string
  category: string
  description: string
  file: string
  created_at: string
  updated_at: string
}

interface LetterModal {
  open: boolean
  letter: Letter | null
}

export default function Dashboard() {
  const { user, token, logout } = useAuth()
  const [letters, setLetters] = useState<Letter[] | "loading">("loading")
  const [letterModal, setLetterModal] = useState<LetterModal>({
    open: false,
    letter: null,
  })
  const router = useRouter()

  const goLogout = async () => {
    await signOut(auth)
    router.replace("/")
  }

  const getLetters = async () => {
    setLetters("loading")
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/letter/byuser`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const { status } = response

      if (status !== 200) {
        setLetters([])
        throw new Error("Gagal ambil data surat")
      }
      const json = await response.json()
      setLetters(json.data)
    } catch (error) {
      toast.error("Gagal", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
        richColors: true,
      })
    }
  }

  const removeLetter = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/letter/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error("Gagal ambil data surat")
      }
      const json = await response.json()
      toast.success("Berhasil", {
        description: json.message,
        richColors: true,
      })
      getLetters()
    } catch (error) {
      toast.error("Gagal", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
        richColors: true,
      })
    }
  }

  useEffect(() => {
    if (token) {
      getLetters()
    }
  }, [token])

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-8 p-8">
        <header className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 rounded-xl">
                <AvatarImage src={user?.photo} />
                <AvatarFallback className="rounded-xl text-lg font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Selamat datang, {user?.name}
                  </h1>

                  <Badge variant="secondary">
                    Administrator
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  Kelola template surat administrasi pendidikan dengan lebih cepat dan
                  efisien.
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Platform Surat Digital
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={() => setLetterModal({ letter: null, open: true })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Template Baru
              </Button>

              <Link href="/guide" target="_blank">
                <Button variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Panduan
                </Button>
              </Link>

              <Button
                variant="destructive"
                onClick={goLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>
        {/* Letter */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Template Surat</h2>

              <Badge variant="secondary">
                {letters ? letters.length : 0} Template
              </Badge>
            </div>

            {letters == "loading" ?
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">
                  Memuat halaman...
                </p>
              </div>
              :
              letters.length > 0 ? (
                <Accordion
                  //   collapsible
                  className="w-full"
                >
                  {letters.map((el) => (
                    <AccordionItem key={el.id} value={el.id}>
                      <AccordionTrigger>
                        <div className="flex flex-col items-start text-left">
                          <span className="font-medium">{el.title}</span>

                          <span className="text-sm text-muted-foreground">
                            {el.category}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent>
                        <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                          <div>
                            <p className="text-sm font-medium">Deskripsi</p>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {el.description}
                            </p>
                          </div>

                          <div className="grid gap-2 text-sm md:grid-cols-2">
                            <div>
                              <span className="font-medium">File:</span> {el.file}
                            </div>

                            <div>
                              <span className="font-medium">Dibuat:</span>{" "}
                              {new Date(el.created_at).toLocaleDateString(
                                "id-ID"
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                setLetterModal({ letter: el, open: true })
                              }
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Button>

                            <Button size="sm" variant="destructive" onClick={() => removeLetter(el.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="rounded-lg border border-dashed py-10 text-center text-muted-foreground">
                  Belum ada template surat.
                </div>
              )
            }
          </CardContent>
        </Card>
      </div>

      <LetterModal
        open={letterModal.open}
        onOpenChange={(update) => {
          setLetterModal({ ...letterModal, open: false })
          if (update) {
            getLetters()
          }
        }}
        letter={letterModal.letter}
      />
    </div>
  )
}
