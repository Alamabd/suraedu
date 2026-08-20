"use client"

import {
  Folder,
  LayoutGrid,
} from "lucide-react"

import { Button } from "@/components/ui/button"

interface LetterSidebarProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function Sidebar({
  categories,
  selectedCategory,
  onCategoryChange,
}: LetterSidebarProps) {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-24 space-y-6">

        {/* Brand / Tagline */}
        <div className="space-y-3">
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Temukan template surat untuk kebutuhan administrasi dengan mudah.
            </p>
        </div>

        <div className="h-px bg-border" />

        {/* Category */}
        <div className="space-y-2">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Kategori
          </p>

          <div className="space-y-1">
            <Button
              variant={
                selectedCategory === "Semua"
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start"
              onClick={() => onCategoryChange("Semua")}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              Semua Template
            </Button>

            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category
                    ? "secondary"
                    : "ghost"
                }
                className="w-full justify-start"
                onClick={() => onCategoryChange(category)}
              >
                <Folder className="mr-2 h-4 w-4" />

                <span className="truncate">
                  {category}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Information */}
        <div className="rounded-xl border bg-muted/30 p-4">
          <p className="text-xs font-medium">
            Butuh surat tertentu?
          </p>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Gunakan pencarian untuk menemukan template
            surat yang Anda perlukan.
          </p>
        </div>

      </div>
    </aside>
  )
}