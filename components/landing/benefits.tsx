import {
  School,
  Clock3,
  Share2,
  FileCheck,
  SearchCheck,
  ShieldCheck,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
  {
    icon: School,
    title: "Standarisasi Surat Sekolah",
    description:
      "Gunakan format surat yang lebih konsisten antar instansi pendidikan sehingga identitas dan tata naskah tetap terlihat profesional.",
  },

  {
    icon: Clock3,
    title: "Hemat Waktu Administrasi",
    description:
      "Tidak perlu membuat surat dari halaman kosong. Pilih template, lengkapi data, dan dokumen siap digunakan.",
  },

  {
    icon: Share2,
    title: "Berbagi Template Bermanfaat",
    description:
      "Bagikan template surat yang sudah dibuat agar sekolah lain dapat memanfaatkan referensi administrasi yang lebih baik.",
  },

  {
    icon: FileCheck,
    title: "Template Siap Digunakan",
    description:
      "Tersedia berbagai jenis surat seperti surat tugas, undangan, keterangan, keputusan, dan administrasi lainnya.",
  },

  {
    icon: SearchCheck,
    title: "Mudah Menemukan Surat",
    description:
      "Cari surat berdasarkan nama atau kategori tanpa harus membuka banyak file dokumen secara manual.",
  },

  {
    icon: ShieldCheck,
    title: "Dokumen Lebih Terorganisir",
    description:
      "Kelola template surat secara digital sehingga lebih mudah digunakan kembali kapan saja.",
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="container mx-auto px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight">
          Administrasi Surat Sekolah Lebih Mudah Dengan
          <span className="text-primary"> Template Digital</span>
        </h2>

        <p className="mt-5 leading-7 text-muted-foreground">
          SuraEdu membantu guru dan operator sekolah membuat surat resmi dengan
          format yang konsisten, lebih cepat, dan mudah digunakan kembali.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {benefits.map((item) => (
          <Card
            key={item.title}
            className="group transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <CardHeader>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon size={28} />
              </div>

              <CardTitle className="mt-5">{item.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="leading-7 text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
