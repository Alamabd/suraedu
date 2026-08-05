import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Upload,
  UserRound,
  WandSparkles,
  Settings,
  HelpCircle,
} from "lucide-react"

import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: "Panduan Template Surat - SuraEdu",
  description:
    "Panduan membuat, mengunggah, dan menggunakan template surat di SuraEdu.",
}


export default function GuidePage() {
  return (
    <div className="min-h-screen bg-muted/30 pb-16">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">

        <div className="mx-auto flex container items-center justify-between sm:px-16 px-6 py-4">

          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft size={16}/>
              Dashboard
            </Button>
          </Link>


          <Badge variant="outline">
            Panduan Template Surat
          </Badge>

        </div>

      </header>



      <main className="mx-auto container space-y-8 sm:px-16 px-6 pt-8">


        {/* Header */}
        <section className="space-y-3">

          <Badge>
            Panduan SuraEdu
          </Badge>

          <h1 className="text-3xl font-bold md:text-4xl">
            Cara Membuat Template Surat
          </h1>

          <p className="max-w-3xl text-muted-foreground">
            Buat surat sekali, gunakan berkali-kali.
            SuraEdu membantu membuat dokumen sekolah menjadi lebih cepat,
            rapi, dan mudah dikelola.
          </p>

        </section>



        {/* Alur */}
        <section className="grid gap-4 md:grid-cols-3">


          <Card>

            <CardHeader>
              <FileText className="h-6 w-6 text-primary"/>

              <CardTitle>
                Buat Surat Word
              </CardTitle>

            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">

              Buat dokumen surat menggunakan Microsoft Word
              seperti biasa.

            </CardContent>

          </Card>



          <Card>

            <CardHeader>
              <Upload className="h-6 w-6 text-primary"/>

              <CardTitle>
                Upload Template
              </CardTitle>

            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">

              Masukkan file surat ke SuraEdu
              beserta informasi template.

            </CardContent>

          </Card>



          <Card>

            <CardHeader>
              <WandSparkles className="h-6 w-6 text-primary"/>

              <CardTitle>
                Buat Surat Otomatis
              </CardTitle>

            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">

              Isi data yang diperlukan dan dapatkan
              surat siap digunakan.

            </CardContent>

          </Card>


        </section>




        {/* Membuat Template */}
        <Card>


          <CardHeader>

            <CardTitle>
              1. Membuat Template Word
            </CardTitle>

            <CardDescription>
              Siapkan format surat yang akan digunakan.
            </CardDescription>

          </CardHeader>


          <CardContent className="space-y-5 text-sm">


            <p>
              Buat surat seperti biasa menggunakan Microsoft Word.
              Contohnya surat tugas, surat undangan,
              surat keterangan, dan dokumen lainnya.
            </p>


            <p>
              Bagian yang ingin diisi otomatis ditulis menggunakan
              tanda khusus seperti:
            </p>


            <div className="rounded-lg border bg-muted/40 p-4 font-mono">

              <p>
                Nama:
                <span className="ml-2 rounded bg-background px-2 py-1 text-primary">
                  {"{nama}"}
                </span>
              </p>


              <p className="mt-3">
                Jabatan:
                <span className="ml-2 rounded bg-background px-2 py-1 text-primary">
                  {"{jabatan}"}
                </span>
              </p>


              <p className="mt-3">
                Tanggal:
                <span className="ml-2 rounded bg-background px-2 py-1 text-primary">
                  {"{tanggal}"}
                </span>
              </p>


            </div>


          </CardContent>

        </Card>





        {/* Aturan */}
        <Card>


          <CardHeader>

            <CardTitle>
              2. Aturan Penulisan Data
            </CardTitle>

          </CardHeader>


          <CardContent className="space-y-4">


            {[
              "Gunakan tanda kurung kurawal seperti {nama}.",
              "Jangan memberikan spasi di dalam tanda kurung.",
              "Gunakan nama yang mudah dipahami.",
              "Pastikan penulisan sama antara template dan data yang diisi."
            ].map((item)=>(
              <div
                key={item}
                className="flex gap-2 text-sm"
              >

                <CheckCircle2
                  className="h-5 w-5 text-primary shrink-0"
                />

                <span>
                  {item}
                </span>

              </div>
            ))}


          </CardContent>


        </Card>





        {/* Upload */}
        <Card>


          <CardHeader>

            <CardTitle>
              3. Mengunggah Template
            </CardTitle>

          </CardHeader>


          <CardContent>


            <ol className="space-y-3 text-sm list-decimal ml-5">

              <li>
                Masuk ke Dashboard SuraEdu.
              </li>

              <li>
                Klik tombol Tambah Template.
              </li>

              <li>
                Pilih file Word (.docx).
              </li>

              <li>
                Isi judul dan kategori surat.
              </li>

              <li>
                Simpan template.
              </li>


            </ol>


          </CardContent>


        </Card>





        {/* Penggunaan */}
        <Card>


          <CardHeader>

            <CardTitle>
              4. Menggunakan Template
            </CardTitle>

          </CardHeader>


          <CardContent className="grid gap-4 md:grid-cols-2">


            <div className="rounded-lg border p-4">

              <UserRound className="mb-3 h-5 w-5"/>

              <h3 className="font-semibold">
                Pilih Template
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Cari surat yang ingin dibuat.
              </p>

            </div>



            <div className="rounded-lg border p-4">

              <Settings className="mb-3 h-5 w-5"/>

              <h3 className="font-semibold">
                Isi Data Surat
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Masukkan informasi sesuai kebutuhan.
              </p>

            </div>


          </CardContent>


        </Card>





        {/* FAQ */}
        <Card>


          <CardHeader>

            <CardTitle>
              Pertanyaan Umum
            </CardTitle>

          </CardHeader>


          <CardContent>


            <Accordion>


              <AccordionItem value="1">

                <AccordionTrigger>
                  Apakah file harus Word?
                </AccordionTrigger>

                <AccordionContent>
                  Ya. Template yang digunakan adalah file Microsoft Word
                  dengan format .docx.
                </AccordionContent>

              </AccordionItem>



              <AccordionItem value="2">

                <AccordionTrigger>
                  Apakah template bisa diedit?
                </AccordionTrigger>

                <AccordionContent>
                  Bisa. Edit file Word Anda kemudian upload kembali
                  untuk memperbarui template.
                </AccordionContent>

              </AccordionItem>



              <AccordionItem value="3">

                <AccordionTrigger>
                  Apakah satu template bisa digunakan berkali-kali?
                </AccordionTrigger>

                <AccordionContent>
                  Bisa. Template dapat digunakan berulang tanpa perlu
                  membuat ulang dokumen.
                </AccordionContent>

              </AccordionItem>



            </Accordion>


          </CardContent>


        </Card>





        {/* CTA */}
        <div className="rounded-xl border bg-card p-8 text-center">


          <h2 className="text-xl font-semibold">
            Siap Membuat Template Pertama?
          </h2>


          <p className="mt-2 text-sm text-muted-foreground">
            Upload template surat sekolah Anda dan mulai gunakan SuraEdu.
          </p>


          <Link href="/dashboard">

            <Button className="mt-5 gap-2">

              <Upload size={16}/>

              Upload Template

            </Button>

          </Link>


        </div>


      </main>

    </div>
  )
}