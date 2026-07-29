"use client"

import { Search, CheckCircle2, FileText, School, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import LetterCard, { LetterType } from "./letterCard"
import { toast } from "sonner"
import LetterGenDialog from "./letterGenDialog"


export default function Hero() {
  const features = [
    "Format surat standar sekolah",
    "Template siap edit DOCX",
    "Buat template surat sendiri",
  ]
  const [letters, setLetters] = useState<null | LetterType[]>(null)
  const [letterDialog, setLetterDialog] = useState({
    open: false,
    index: -1
  })

  const [keyword, setKeyword] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get("search") || ""
  const lettersRef = useRef<HTMLDivElement>(null)
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const search = keyword.trim()

    if (!search) {
      setLetters(null)
      return
    }

    router.push(`/?search=${encodeURIComponent(search)}`)
    setTimeout(() => {
      lettersRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 200);
  }

  const getLetters = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/letters/?search=${search}`,
        {
          method: "GET",
        }
      )
      const { status } = response

      if(status == 404) {
        setLetters([])
        return
      }
      if(status !== 200) {
        throw new Error("Gagal ambil data surat")
      }
      const json = await response.json()
      setLetters(json)
    } catch (error) {
      toast.error("Gagal", {
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        position: "top-center",
        richColors: true,
      })
    }
  }

  useEffect(() => {
    if (search) {
      setKeyword(search)
      getLetters()
    }
  }, [search])

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/70 via-background to-background" />

      <div className="relative container mx-auto px-6 py-24">
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
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-3xl gap-3 rounded-2xl border bg-background p-3 shadow-lg"
          >
            <div className="relative flex-1">
              <Search className="absolute top-3 left-3 text-muted-foreground" />

              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari nama surat, contoh: Surat Tugas..."
                className="h-12 pl-10"
              />
            </div>

            <Button type="submit" className="h-12 cursor-pointer px-8">
              Cari Surat
            </Button>
          </form>

          <section hidden={letters === null} className="container mx-auto px-6 py-16">
            <div ref={lettersRef} className="my-10">
              <h2 className="text-3xl font-bold">Template Surat</h2>

              {search && (
                <p className="mt-2 text-muted-foreground">
                  Menampilkan hasil untuk:
                  <span className="ml-1 font-medium text-foreground">
                    {search}
                  </span>
                </p>
              )}
            </div>

            {letters && letters.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {letters.map((letter, i) => (
                  <LetterCard {...letter} onPress={() => setLetterDialog({ open: true, index: i})} key={letter.id} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border p-10 text-center">
                <p className="text-muted-foreground">Surat tidak ditemukan</p>
              </div>
            )}
          </section>
          {letters === null && (
            <>
              <div className="mt-4 flex items-center justify-center gap-3 text-sm text-muted-foreground">
                <span>atau</span>

                <Button variant="destructive">Buat Template Sendiri</Button>
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
            </>
          )}
        </div>

        {letters === null && (
          <>
            {/* Statistik */}

            <div className="mx-auto mt-20 grid max-w-4xl gap-5 md:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <FileText className="h-10 w-10 text-primary" />

                  <div>
                    <p className="text-2xl font-bold">500+</p>

                    <p className="text-sm text-muted-foreground">
                      Template Surat
                    </p>
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
          </>
        )}
      </div>
      {
        letterDialog.index !== -1 &&
        <LetterGenDialog fields={JSON.parse(letters![letterDialog.index].keys ?? "")} open={letterDialog.open} onOpenChange={() => setLetterDialog({ ...letterDialog, open: false  })} />
      }
    </section>
  )
}
