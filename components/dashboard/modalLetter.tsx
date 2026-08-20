"use client"

import { useEffect, useState } from "react"
import { Loader2, Upload, X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useAuth } from "@/store/useAuth"
import { getAuth } from "firebase/auth"
import { useLetters } from "@/store/useLetters"

interface LetterModalProps {
  open: boolean
  onOpenChange: (update: boolean) => void
  letter_id: number | null
}

const CATEGORY_SUGGESTIONS = [
  "Administrasi",
  "Surat Keterangan",
  "Surat Tugas",
  "Surat Undangan",
  "Surat Permohonan",
  "Pengumuman",
]

export default function ModalLetter({
  onOpenChange,
  open,
  letter_id
}: LetterModalProps) {
  const { user } = useAuth()
  const auth = getAuth()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null | string>(null)
  const { letters, upsertLetter, loading } = useLetters()
  
  const letter = letter_id !== null
  ? letters.find((val) => val.id === letter_id)
  : undefined
  const isEditing = letter_id != null
  
  const saveLetter = async (formData: FormData) => {
    try {
      const json = await upsertLetter(formData, await auth.currentUser?.getIdToken()!, letter_id ?? undefined)

      toast.success("Berhasil", {
        description: json.message,
        richColors: true,
      })

      onOpenChange(true)
    } catch (error) {
      console.log(error)
      toast.error("Gagal", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
        richColors: true,
      })
    }
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Validasi Gagal", {
        description: "Judul surat wajib diisi",
        richColors: true,
      })
      return
    }

    if (!category.trim()) {
      toast.error("Validasi Gagal", {
        description: "Kategori wajib diisi",
        richColors: true,
      })
      return
    }

    const formData = new FormData()
    if (letter?.id) {
      formData.append("id", letter.id.toString())
    }
    formData.append("uid", user?.uid.toString() || "")
    formData.append("title", title)
    formData.append("category", category)
    formData.append("description", description)

    if (file) {
      if (typeof file !== "string") {
        formData.append("file", file)
      }
    } else {
      toast.error("Error", {
        description: "File template wajib diunggah",
        richColors: true,
      })
      return
    }

    saveLetter(formData)
  }

  useEffect(() => {
    if (letter_id && letter) {
      setTitle(letter.title)
      setCategory(letter.category)
      setDescription(letter.description)
      setFile(letter.file!)
    } else {
      setTitle("")
      setCategory("")
      setDescription("")
      setFile(null)
    }
  }, [letter_id, letter, open])

  const getFileName = () => {
    if (!file) return ""
    if (typeof file === "string") return file
    return file.name
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Template Surat" : "Tambah Template Surat"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Perbarui informasi dan dokumen template surat."
              : "Lengkapi informasi template surat yang akan ditambahkan."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Judul Surat */}
          <div className="space-y-2">
            <Label htmlFor="title">Judul Surat</Label>
            <Input
              id="title"
              required
              placeholder="Contoh: Surat Keterangan Aktif Sekolah"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Kategori & Suggestions */}
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Input
              id="category"
              required
              placeholder="Contoh: Administrasi"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-muted-foreground mr-1">
                Saran:
              </span>
              {CATEGORY_SUGGESTIONS.map((cat) => (
                <Badge
                  key={cat}
                  variant={
                    category.toLowerCase() === cat.toLowerCase()
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setCategory(cat)}
                  className="cursor-pointer text-xs font-normal"
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Masukkan deskripsi template surat..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* File Template */}
          <div className="space-y-2">
            <Label>File Template (.docx)</Label>
            {file ? (
              <div className="flex items-center justify-between rounded-md border p-3 text-sm bg-muted/30">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-xs font-medium">
                    {getFileName()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="file-modal-upload"
                    className="cursor-pointer text-xs text-primary underline"
                  >
                    Ubah
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setFile(null)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ) : (
              <Input
                id="file-modal-upload"
                type="file"
                accept=".doc,.docx"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>

          <Button disabled={loading} onClick={handleSubmit}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Simpan Perubahan" : "Simpan Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
