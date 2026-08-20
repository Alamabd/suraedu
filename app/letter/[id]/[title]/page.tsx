import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  Calendar,
  Download,
  Eye,
  FileText,
  FileType,
  Heart,
  User,
} from "lucide-react"

import Footer from "@/components/landing/footer"
import Navbar from "@/components/landing/navbar"
import { Letter } from "@/components/landing/lettersList"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface PageProps {
  params: Promise<{
    id: string
    slug: string
  }>
}

async function getLetter(id: string): Promise<Letter | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/letters/single?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    )

    if (!response.ok) {
      return null
    }

    const json = await response.json()

    return json.data ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const letter = await getLetter(id)

  if (!letter) {
    return {
      title: "Template Tidak Ditemukan",
    }
  }

  return {
    title: letter.title,
    description:
      letter.description ||
      `Gunakan template ${letter.title} untuk kebutuhan administrasi.`,
    openGraph: {
      title: letter.title,
      description:
        letter.description ||
        `Template ${letter.title} - SuraEdu`,
      images: letter.img
        ? [
            {
              url: letter.img,
              alt: letter.title,
            },
          ]
        : undefined,
    },
  }
}

export default async function PageLetter({
  params,
}: PageProps) {
  const { id } = await params

  const letter = await getLetter(id)

  if (!letter) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">

          {/* ASIDE */}
          <aside className="h-fit lg:sticky lg:top-6">
            <div className="rounded-2xl border bg-card">

              {/* Header */}
              <div className="p-5">
                <Badge
                  variant="secondary"
                  className="mb-4 font-normal"
                >
                  {letter.category}
                </Badge>

                <h1 className="text-xl font-semibold tracking-tight">
                  {letter.title}
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {letter.description || "Tidak ada deskripsi."}
                </p>
              </div>

              <Separator />

              {/* Stats */}
              <div className="grid grid-cols-2 divide-x border-b">
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-sm font-medium">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    {letter.views || "0"}
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Dilihat
                  </p>
                </div>

                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-sm font-medium">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    {letter.likes || "0"}
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Disukai
                  </p>
                </div>
              </div>

              {/* Information */}
              <div className="space-y-4 p-5">

                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-4 w-4 text-muted-foreground" />

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Dibuat oleh
                    </p>

                    <p className="mt-0.5 truncate text-sm font-medium">
                      {letter.creator || "Tidak diketahui"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Dibuat pada
                    </p>

                    <p className="mt-0.5 text-sm font-medium">
                      {new Date(
                        letter.created_at
                      ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileType className="mt-0.5 h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Format
                    </p>

                    <p className="mt-0.5 text-sm font-medium">
                      DOCX
                    </p>
                  </div>
                </div>

              </div>

              <Separator />

              {/* Actions */}
              <div className="space-y-2 p-5">

                <Button
                  className="w-full"
                  size="sm"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Gunakan Template
                </Button>

                {letter.pdf && (
                  <a
                    href={letter.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Lihat PDF
                    </Button>
                  </a>
                )}

              </div>
            </div>
          </aside>

          {/* MAIN */}
          <section className="min-w-0">
            <div className="overflow-hidden rounded-2xl border bg-muted/20">

              {/* Preview Header */}
              <div className="flex items-center justify-between border-b bg-background px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold">
                    Preview Template
                  </h2>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Tampilan dokumen sebelum digunakan
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className="hidden gap-1.5 sm:flex"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Preview
                </Badge>
              </div>

              {/* Preview */}
              <div className="flex min-h-[600px] items-start justify-center p-4 sm:p-8 lg:p-10">

{/* {letter.pdf ? (
  <div className="w-full overflow-hidden rounded-lg border bg-white shadow-sm">
    <iframe
      src={`${process.env.NEXT_PUBLIC_API_URL}${letter.pdf}`}
      title={`Preview ${letter.title}`}
      className="h-[700px] w-full"
    />
  </div>
) : (
  <div className="flex min-h-[500px] flex-col items-center justify-center rounded-lg border bg-background text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
      <FileText className="h-7 w-7 text-muted-foreground" />
    </div>

    <h3 className="mt-4 font-medium">
      Preview tidak tersedia
    </h3>

    <p className="mt-1 text-sm text-muted-foreground">
      Template ini belum memiliki file PDF.
    </p>
  </div>
)} */}
                {letter.img ? (
                  <div className="w-full max-w-3xl overflow-hidden rounded-lg border bg-white shadow-sm">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${letter.img}`}
                      alt={`Preview ${letter.title}`}
                      className="block h-auto w-full"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[500px] w-full max-w-3xl flex-col items-center justify-center rounded-lg border bg-background text-center">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                      <FileText className="h-7 w-7 text-muted-foreground" />
                    </div>

                    <h3 className="mt-4 font-medium">
                      Preview tidak tersedia
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                      Template ini belum memiliki gambar preview.
                    </p>

                  </div>
                )}

              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}