"use client"

import { useEffect, useState } from "react"
import { Upload } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useAuth } from "@/store/useAuth"

interface Letter {
  id: string
  title: string
  category: string
  description: string
  file: string
}

interface LetterModalProps {
  open: boolean
  onOpenChange: (update: boolean) => void
  letter?: Letter | null
}

export default function LetterModal({
  onOpenChange,
  open,
  letter,
}: LetterModalProps) {
  const { token, user } = useAuth()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null | string>(null)

  const saveLetter = async (formData: FormData, id?: string) => {
    try {
      const isUpdate = Boolean(id)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/letter${isUpdate ? `/${id}` : ""}`,
        {
          method: isUpdate ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )

      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message || "Gagal menyimpan template")
      }

      toast.success("Berhasil", {
        description: json.message,
        richColors: true,
      })

      onOpenChange(true)
    } catch (error) {
      toast.error("Gagal", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
        richColors: true,
      })
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append("uid", user?.id.toString()!)
    formData.append("title", title)
    formData.append("category", category)
    formData.append("description", description)

    if (file) {
      formData.append("file", file)
    } else {
      toast.error("Error", {
        description: "File tidak ditemukan",
        richColors: true,
      })
      return
    }

    if (letter) {
      //   await api.put(`/letter/${letter.id}`, formData);
      saveLetter(formData, letter.id)
    } else {
      saveLetter(formData)
    }
  }

  useEffect(() => {
    if (letter) {
      setTitle(letter.title)
      setCategory(letter.category)
      setDescription(letter.description)
      setFile(letter.file)
    } else {
      setTitle("")
      setCategory("")
      setDescription("")
      setFile(null)
    }
  }, [letter])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Tambah Template Surat</DialogTitle>

          <DialogDescription>
            Lengkapi informasi template surat yang akan ditambahkan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label>Judul Surat</Label>

            <Input
              required
              placeholder="Contoh: Surat Keterangan Aktif Sekolah"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Kategori</Label>

            <Input
              required
              placeholder="Contoh: Administrasi"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Deskripsi</Label>

            <Textarea
              rows={4}
              required
              placeholder="Masukkan deskripsi template surat..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>File Template (.docx)</Label>

            <Input
              type="file"
              accept=".doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />

            {file && (
              <div className="bg-green-100 flex items-center gap-2 rounded-md border p-3 text-sm">
                <Upload className="h-4 w-4" />
                { typeof(file) === "string" ? file : file.name}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>

          <Button onClick={handleSubmit}>Simpan Template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
