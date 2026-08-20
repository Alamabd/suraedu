import Link from "next/link"
import {
  FileText,
  Search,
  Sparkles,
  HelpCircle,
  Heart,
  ArrowUpRight,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"

const columns = [
  {
    title: "Jelajahi",
    links: [
      {
        label: "Template Surat",
        href: "/letters",
      },
      {
        label: "Kategori",
        href: "/categories",
      },
      {
        label: "Surat Populer",
        href: "/popular",
      },
      {
        label: "Pencarian",
        href: "/search",
      },
    ],
  },
  {
    title: "Buat Surat",
    links: [
      {
        label: "Mulai Membuat",
        href: "/",
      },
      {
        label: "Panduan",
        href: "/guide",
      },
    ],
  },
  {
    title: "Bantuan",
    links: [
      {
        label: "Panduan Penggunaan",
        href: "/guide",
      },
      {
        label: "FAQ",
        href: "/faq",
      },
      {
        label: "Saran Template",
        href: "/suggest",
      },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-muted/30">
      {/* Background Pattern */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-40
          [background-image:radial-gradient(circle,hsl(var(--muted-foreground)/0.16)_1px,transparent_1px)]
          [background-size:24px_24px]
        "
      />

      {/* Soft Background Glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative container mx-auto px-6 py-14 sm:px-16">

        {/* Main Content */}
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div className="max-w-md">

            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  SuraEdu
                </h2>

                <p className="text-xs text-muted-foreground">
                  Template Administrasi Digital
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              Temukan template surat untuk berbagai kebutuhan administrasi.
              Buat dokumen dengan lebih cepat, rapi, dan praktis tanpa harus
              memulai dari awal.
            </p>

            {/* Features */}
            <div className="mt-6 flex flex-wrap gap-2">

              <div className="flex items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                <Search className="h-3.5 w-3.5 text-primary" />
                Mudah dicari
              </div>

              <div className="flex items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Siap digunakan
              </div>

            </div>
          </div>

          {/* Navigation Columns */}
          {columns.map((column) => (
            <div key={column.title}>

              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-1
                        text-sm
                        text-muted-foreground
                        transition-colors
                        hover:text-foreground
                      "
                    >
                      {link.label}

                      <ArrowUpRight
                        className="
                          h-3 w-3
                          opacity-0
                          transition-all
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:opacity-70
                        "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <Separator className="my-10" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} SuraEdu. Semua hak dilindungi.
          </p>

          <div className="flex items-center gap-1.5">
            <span>Dibuat dengan</span>

            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />

            <span>untuk administrasi yang lebih mudah.</span>
          </div>

        </div>
      </div>
    </footer>
  )
}