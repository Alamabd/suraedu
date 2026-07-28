import { FileText, Download, CheckCircle2, Eye, Sparkles } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const fields = [
  {
    label: "Nomor Surat",
    placeholder: "001/SDN/2026",
  },
  {
    label: "Nama Sekolah",
    placeholder: "SD Negeri 2 Sukaraja",
  },
  {
    label: "Nama Kegiatan",
    placeholder: "Pelatihan Guru",
  },
  {
    label: "Tanggal Pelaksanaan",
    placeholder: "30 Juli 2026",
  },
  {
    label: "Tempat Kegiatan",
    placeholder: "Aula Sekolah",
  },
]

export default function GenerateLetterPage() {
  return (
    <main className="min-h-screen bg-muted/30 py-10">
      <div className="container mx-auto px-6">
        {/* Header */}

        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Badge>Template DOCX</Badge>

            <Badge variant="secondary">Pendidikan</Badge>
          </div>

          <h1 className="mt-4 text-4xl font-bold">Buat Surat Tugas Guru</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Isi data surat di bawah ini dan sistem akan membuat dokumen resmi
            sekolah secara otomatis.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Template Detail */}

          <Card className="h-fit overflow-hidden">
            <CardContent className="p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText size={32} />
              </div>

              <h2 className="mt-6 text-xl font-semibold">Surat Tugas Guru</h2>

              <p className="mt-3 text-sm text-muted-foreground">
                Template surat resmi untuk penugasan guru mengikuti kegiatan
                sekolah.
              </p>

              <Separator className="my-6" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-600" size={18} />
                  Format standar sekolah
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-600" size={18} />
                  Bisa digunakan kembali
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-600" size={18} />
                  Otomatis menjadi DOCX
                </div>
              </div>

              <Button variant="outline" className="mt-8 w-full gap-2">
                <Eye size={18} />
                Lihat Preview
              </Button>
            </CardContent>
          </Card>

          {/* Form */}

          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-3">
                <Sparkles className="text-primary" />

                <h2 className="text-xl font-semibold">Isi Informasi Surat</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.label} className="space-y-2">
                    <Label>{field.label}</Label>

                    <Input placeholder={field.placeholder} />
                  </div>
                ))}
              </div>

              <Button size="lg" className="mt-8 w-full gap-2">
                <Download size={20} />
                Generate & Download DOCX
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
