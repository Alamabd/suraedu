"use client"

import { useMemo, useState } from "react"
import {
  Calendar,
  Eye,
  FileCheck,
  FileText,
  FolderKanban,
  Grid,
  List,
  Pencil,
  Plus,
  Search,
  Tag,
  Trash2,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface Letter {
  id: string
  user_id: number
  title: string
  category: string
  description: string
  file: string
  created_at: string
  updated_at: string
}

interface DashboardContentProps {
  letters: Letter[] | "loading"
  onNewTemplate: () => void
  onEditLetter: (letter: Letter) => void
  onRemoveLetter: (id: string) => void
}

export default function DashboardContent({
  letters,
  onNewTemplate,
  onEditLetter,
  onRemoveLetter,
}: DashboardContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("semua")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Extract unique categories
  const categories = useMemo(() => {
    if (!Array.isArray(letters)) return []
    const set = new Set<string>()
    letters.forEach((item) => {
      if (item.category) set.add(item.category)
    })
    return Array.from(set)
  }, [letters])

  // Filter letters by search query and category
  const filteredLetters = useMemo(() => {
    if (!Array.isArray(letters)) return []
    return letters.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCategory =
        selectedCategory === "semua" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      return matchSearch && matchCategory
    })
  }, [letters, searchQuery, selectedCategory])

  const totalLetters = Array.isArray(letters) ? letters.length : 0

  return (
    <div className="space-y-6">
      {/* 1. Stat Cards Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Templates */}
        <Card className="shadow-2xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Total Template
              </span>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold">
              {letters === "loading" ? "..." : totalLetters}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Template surat aktif
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Categories */}
        <Card className="shadow-2xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Kategori Surat
              </span>
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold">
              {letters === "loading" ? "..." : categories.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Kategori terdaftar
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Format */}
        <Card className="shadow-2xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Format Surat
              </span>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold">DOCX</div>
            <p className="text-xs text-muted-foreground mt-1">
              Standar dokumen digital
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Quick Action */}
        <Card className="shadow-2xs flex flex-col justify-between">
          <CardContent className="p-6 flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Aksi Cepat
              </span>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
            <Button onClick={onNewTemplate} size="sm" className="mt-3 w-full">
              <Plus className="mr-2 h-4 w-4" />
              Template Baru
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 2. Main Content Card */}
      <Card className="shadow-2xs">
        <CardContent className="p-6 space-y-6">
          {/* Header & Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Template Surat
              </h2>
              <p className="text-sm text-muted-foreground">
                Kelola dan edit template surat administrasi pendidikan
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border bg-muted p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2.5 text-xs"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="mr-1.5 h-3.5 w-3.5" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2.5 text-xs"
                  onClick={() => setViewMode("list")}
                >
                  <List className="mr-1.5 h-3.5 w-3.5" />
                  Daftar
                </Button>
              </div>

              <Badge variant="secondary" className="font-normal">
                {filteredLetters.length} Template
              </Badge>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari surat atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-8 h-9 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <Button
                variant={selectedCategory === "semua" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("semua")}
                className="h-8 rounded-md text-xs font-normal"
              >
                Semua
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="h-8 rounded-md text-xs font-normal capitalize"
                >
                  <Tag className="mr-1.5 h-3 w-3 text-muted-foreground" />
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          {letters === "loading" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-44 rounded-xl border bg-muted/30 p-4 animate-pulse space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-20 bg-muted rounded" />
                    <div className="h-4 w-12 bg-muted rounded" />
                  </div>
                  <div className="h-5 w-3/4 bg-muted rounded" />
                  <div className="h-8 w-full bg-muted/60 rounded" />
                </div>
              ))}
            </div>
          ) : filteredLetters.length > 0 ? (
            viewMode === "grid" ? (
              /* GRID VIEW */
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2">
                {filteredLetters.map((el) => (
                  <Card
                    key={el.id}
                    className="flex flex-col justify-between transition-all hover:border-foreground/20 shadow-2xs"
                  >
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="font-normal capitalize">
                          {el.category || "Umum"}
                        </Badge>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-semibold text-base tracking-tight line-clamp-1">
                          {el.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.25rem]">
                          {el.description || "Tidak ada deskripsi."}
                        </p>
                      </div>
                    </div>

                    <div className="border-t bg-muted/20 px-5 py-3 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {el.created_at
                            ? new Date(el.created_at).toLocaleDateString(
                                "id-ID"
                              )
                            : "-"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          title="Lihat"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => onEditLetter(el)}
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => onRemoveLetter(el.id)}
                          title="Hapus"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="pt-2">
                <Accordion className="w-full space-y-2">
                  {filteredLetters.map((el) => (
                    <AccordionItem
                      key={el.id}
                      value={el.id}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="hover:no-underline py-3 text-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full pr-4 text-left">
                          <div className="space-y-0.5">
                            <span className="font-medium">{el.title}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs font-normal capitalize">
                                {el.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {el.file}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="pt-1 pb-3">
                        <div className="space-y-3 rounded-md border bg-muted/20 p-3 text-xs">
                          <div>
                            <span className="font-medium text-foreground">Deskripsi:</span>
                            <p className="mt-0.5 text-muted-foreground">
                              {el.description || "Tidak ada deskripsi."}
                            </p>
                          </div>

                          <div className="grid gap-2 md:grid-cols-2 pt-2 border-t text-muted-foreground">
                            <div>
                              <span className="font-medium text-foreground">File:</span> {el.file}
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Dibuat:</span>{" "}
                              {el.created_at
                                ? new Date(el.created_at).toLocaleDateString(
                                    "id-ID"
                                  )
                                : "-"}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-2">
                            <Button size="sm" variant="default">
                              <Eye className="mr-1.5 h-3.5 w-3.5" />
                              Lihat
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onEditLetter(el)}
                            >
                              <Pencil className="mr-1.5 h-3.5 w-3.5" />
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => onRemoveLetter(el.id)}
                            >
                              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )
          ) : (
            /* EMPTY STATE */
            <div className="rounded-lg border border-dashed py-12 text-center text-muted-foreground space-y-3">
              <p className="text-sm">
                {searchQuery || selectedCategory !== "semua"
                  ? "Tidak ada template yang cocok dengan kriteria pencarian."
                  : "Belum ada template surat."}
              </p>
              {!(searchQuery || selectedCategory !== "semua") && (
                <Button size="sm" onClick={onNewTemplate}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Template
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
