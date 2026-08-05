"use client"

import { Search, CheckCircle2, FileText, School, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SubmitEvent } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/useAuth"
import { toast } from "sonner"

export default function Hero() {
  const router = useRouter()
  const { loginGoogle, user } = useAuth()
  const features = [
    "Format surat standar sekolah",
    "Template siap edit DOCX",
    "Buat template surat sendiri",
  ]

  const onSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = e.target.search.value
    if (q.length > 0) {
      router.push(`/search/?q=${q}`)
    }
  }

  const requestLogin = async () => {
    try {
      await loginGoogle()
      router.push("/dashboard")
    } catch (err) {
      toast.error("Pemberitahuan", {
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

  const handleButtonCreateTemplate = async () => {
    if(user) {
      router.push("/dashboard")
    } else {
      await requestLogin()
    }
  }

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/70 via-background to-background" />

      <div className="relative container mx-auto sm:px-16 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="rounded-full">
            Platform Surat Pendidikan Digital
          </Badge>

          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
            GRATIS!! Buat Surat Resmi Sekolah
            <span className="text-primary"> Lebih Cepat</span>, Rapi, dan
            Konsisten
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Temukan template surat untuk kebutuhan administrasi pendidikan.
            Pilih surat, isi data, dan hasilkan dokumen siap digunakan tanpa
            membuat dari awal.
          </p>

          {/* Search */}

          <form
            onSubmit={onSearch}
            className="mx-auto mt-10 flex max-w-3xl gap-3 rounded-2xl border bg-background p-3 shadow-lg"
          >
            <div className="relative flex-1">
              <Search className="absolute top-3 left-3 text-muted-foreground" />

              <Input
                name="search"
                placeholder="Cari nama surat, contoh: Surat Tugas..."
                className="h-12 pl-10"
              />
            </div>

            <Button type="submit" className="h-12 cursor-pointer px-8">
              Cari Surat
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>atau</span>
            <span className="underline italic">{user?.name}</span>

            <Button variant="destructive" onClick={() => handleButtonCreateTemplate()}>Buat Template Sendiri</Button>
          </div>
          {/* Features */}

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {features.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-5 text-primary" />

                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Statistik */}

        <div className="mx-auto mt-20 grid max-w-4xl gap-5 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <FileText className="h-10 w-10 text-primary" />

              <div>
                <p className="text-2xl font-bold">500+</p>

                <p className="text-sm text-muted-foreground">Template Surat</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <School className="h-10 w-10 text-primary" />

              <div>
                <p className="text-2xl font-bold">50+</p>

                <p className="text-sm text-muted-foreground">
                  Kategori Pendidikan
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <Users className="h-10 w-10 text-primary" />

              <div>
                <p className="text-2xl font-bold">1000+</p>

                <p className="text-sm text-muted-foreground">Pengguna</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
