import { FileText, School, Heart } from "lucide-react"

import { Separator } from "@/components/ui/separator"

const columns = [
  {
    title: "Produk",
    links: ["Template Surat", "Kategori Surat", "Surat Populer", "Pencarian"],
  },

  {
    title: "Fitur",
    links: ["Buat Surat", "Edit Template", "Download DOCX", "Berbagi Template"],
  },

  {
    title: "Bantuan",
    links: ["Panduan Penggunaan", "FAQ", "Hubungi Kami", "Saran Template"],
  },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container mx-auto sm:px-16 px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}

          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <FileText />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">SuraEdu</h2>

                <p className="text-xs text-slate-400">
                  Surat Pendidikan Digital
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-400">
              Platform template surat digital untuk membantu sekolah dan
              instansi pendidikan membuat dokumen resmi dengan lebih cepat,
              rapi, dan konsisten.
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm">
              <School size={18} className="text-primary" />
              Untuk Guru & Operator Sekolah
            </div>
          </div>

          {/* Links */}

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-white">{column.title}</h3>

              <ul className="mt-5 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li
                    key={link}
                    className="cursor-pointer transition hover:text-white"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-slate-800" />

        {/* Bottom */}

        <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-slate-400">
            © 2026 SuraEdu. Semua hak dilindungi.
          </p>

          <div className="flex items-center gap-2 text-slate-400">
            Dibuat dengan
            <Heart size={16} className="fill-red-500 text-red-500" />
            untuk pendidikan Indonesia
          </div>
        </div>
      </div>
    </footer>
  )
}