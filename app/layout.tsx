import type { Metadata } from "next"

import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "SuraEdu - Platform Surat Digital untuk Sekolah",
    template: "%s | SuraEdu",
  },

  description:
    "Buat, kelola, dan gunakan kembali template surat untuk kebutuhan administrasi pendidikan. SuraEdu membantu guru dan operator sekolah membuat dokumen resmi lebih cepat, rapi, dan konsisten.",

  keywords: [
    "surat sekolah",
    "template surat",
    "surat pendidikan",
    "administrasi sekolah",
    "surat resmi",
    "operator sekolah",
    "guru",
    "dokumen pendidikan",
  ],

  authors: [
    {
      name: "SuraEdu",
    },
  ],

  creator: "SuraEdu",

  metadataBase: new URL("https://suraedu.id"),

  openGraph: {
    type: "website",

    locale: "id_ID",

    url: "https://suraedu.id",

    title: "SuraEdu - Platform Surat Digital untuk Sekolah",

    description:
      "Buat surat sekolah lebih cepat, rapi, dan konsisten. Gunakan template tersedia atau buat template surat sendiri.",

    siteName: "SuraEdu",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SuraEdu - Platform Surat Digital Pendidikan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "SuraEdu - Platform Surat Digital Sekolah",

    description:
      "Buat, simpan, dan gunakan kembali template surat untuk kebutuhan administrasi pendidikan.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body>
        <Toaster />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
