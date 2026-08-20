"use client"

import {
  Bookmark,
  Download,
  Eye,
  Files,
  FileText,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type Letter = {
  id: string
  title: string
  category: string
  description: string
  creator: string
  img?: string
  pdf?: string
  views?: number
  likes?: number
  created_at: string
}

interface LetterListProps {
  letters: Letter[]
  onPreview?: (letter: Letter) => void
  onDownload?: (letter: Letter) => void
  onBookmark?: (letter: Letter) => void
}

export default function LetterList({
  letters,
  onPreview,
  onDownload,
  onBookmark,
}: LetterListProps) {
  return (
    <div className="space-y-4">
      {letters.map((letter) => (
        <div
          key={letter.id}
          className="group flex gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/20"
        >
          {/* Preview */}
          <button
            type="button"
            onClick={() => onPreview?.(letter)}
            className="relative hidden aspect-[210/297] w-[90px] shrink-0 overflow-hidden rounded border bg-muted sm:block"
          >
            {letter.img ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${letter.img}`}
                alt={letter.title}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                <FileText className="h-7 w-7" />

                <span className="mt-1 text-[9px]">
                  No preview
                </span>
              </div>
            )}

            <span className="absolute left-1.5 top-1.5 rounded bg-foreground px-1.5 py-0.5 text-[9px] font-bold text-background">
              DOCX
            </span>
          </button>

          {/* Content */}
          <div className="min-w-0 flex-1 space-y-3">

            {/* Meta */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {formatViews(letter.views ?? 0)} views
              </span>

              {letter.category && (
                <>
                  <span className="hidden sm:inline">•</span>

                  <Badge
                    variant="secondary"
                    className="hidden h-5 px-1.5 text-[10px] font-normal sm:inline-flex"
                  >
                    {letter.category}
                  </Badge>
                </>
              )}
            </div>

            {/* Title */}
            <button
              type="button"
              onClick={() => onPreview?.(letter)}
              className="block max-w-full text-left"
            >
              <h3 className="line-clamp-2 text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
                {letter.title}
              </h3>
            </button>

            {/* Description */}
            <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
              {letter.description ||
                "Tidak ada deskripsi untuk template surat ini."}
            </p>

            {/* Creator */}
            <div className="text-xs text-muted-foreground">
              Uploaded by{" "}
              <span className="font-medium text-foreground">
                {letter.creator || "SuraEdu"}
              </span>{" "}
              on{" "}
              {formatDate(letter.created_at)}
            </div>
          </div>

          {/* Actions */}
          <div className="hidden shrink-0 items-start gap-1 sm:flex">
            <Link href={`/letter/${letter.id}/${letter.title.replace(/\s+/g, "-")}`}>
            <Button
              variant="default"
            >
                <Files />
              Gunakan
            </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Simpan"
              onClick={() => onBookmark?.(letter)}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile */}
          <div className="flex shrink-0 flex-col gap-1 sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Lihat"
              onClick={() => onPreview?.(letter)}
            >
              <Eye className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Download"
              onClick={() => onDownload?.(letter)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function formatViews(views: number) {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M`
  }

  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K`
  }

  return views.toString()
}

function formatDate(date: string) {
  if (!date) return "-"

  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}