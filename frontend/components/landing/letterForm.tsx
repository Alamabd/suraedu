"use client"

import { FileDown } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

const fields = [
  {
    key: "nomor_surat",
    label: "Nomor Surat",
    placeholder: "Contoh: 001/SDN/2026",
  },

  {
    key: "nama_sekolah",
    label: "Nama Sekolah",
    placeholder: "SD Negeri 2 Sukaraja",
  },

  {
    key: "nama_kegiatan",
    label: "Nama Kegiatan",
    placeholder: "Pelatihan Guru",
  },

  {
    key: "tanggal",
    label: "Tanggal Surat",
    placeholder: "26 Juli 2026",
  },

  {
    key: "tempat",
    label: "Tempat Kegiatan",
    placeholder: "Aula Sekolah",
  },
]

export default function LetterForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Isi Data Surat</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-5">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label>{field.label}</Label>

              <Input name={field.key} placeholder={field.placeholder} />
            </div>
          ))}

          <Button className="mt-5 w-full gap-2">
            <FileDown size={18} />
            Generate DOCX
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
