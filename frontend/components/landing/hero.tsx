"use client"

import { Search, CheckCircle2, FileText, School, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import LetterCard, { LetterType } from "./letterCard"

const lettersRaw = [
  {
    id: '126asa1721',
    title: "Surat Tugas",
    category: "Kepegawaian",
    description:
      "Template surat tugas untuk guru atau pegawai sekolah dalam menjalankan kegiatan tertentu.",
  },

  {
    id: '1261w1721',
    title: "Surat Undangan Rapat",
    category: "Administrasi",
    description:
      "Template undangan rapat sekolah untuk wali murid, guru, maupun instansi terkait.",
  },

  {
    id: '1261789a21',
    title: "Surat Keterangan Aktif",
    category: "Keterangan",
    description:
      "Surat keterangan aktif sekolah yang dapat digunakan untuk berbagai kebutuhan administrasi.",
  },

  {
    id: '12617gas621',
    title: "Surat Keputusan",
    category: "Keputusan",
    description:
      "Template surat keputusan kepala sekolah dengan format administrasi resmi.",
  },
]

export default function Hero() {
  const features = [
    "Format surat standar sekolah",
    "Template siap edit DOCX",
    "Buat template surat sendiri",
  ]
  const [letters, setLetters] = useState<null | LetterType[]>(null)
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

  useEffect(() => {
    if (search) {
      setKeyword(search)
      setLetters(lettersRaw)
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
                {letters.map((letter) => (
                  <LetterCard key={letter.id} {...letter} />
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
    </section>
  )
}
