"use client"
import Footer from "@/components/landing/footer"
import { Letter } from "@/components/landing/lettersList"
import Main from "@/components/landing/main"
import Navbar from "@/components/landing/navbar"
import Sidebar from "@/components/landing/sidebar"
import { useEffect, useState } from "react"

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  const [letters, setLeters] = useState<{ loading: boolean, data: Letter[] }>({
    loading: false,
    data: []
  })
  const categories = [
    "Administrasi",
    "Surat Tugas",
    "Surat Keterangan",
    "Surat Undangan",
  ]

  const filteredLetters =
    selectedCategory === "Semua"
      ? letters.data
      : letters.data.filter(
        (letter) =>
          letter.category === selectedCategory
      )

  const getLettersByRandom = async () => {
    setLeters({ data: [], loading: true })
    try {
      const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/letters/random`, {
        method: "GET"
      })
      if (request.status == 200) {
        const json = await request.json()
        setLeters({
          data: json.data,
          loading: false
        })
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    getLettersByRandom()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mt-12 mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">

        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <Main
          letters={filteredLetters}
          loading={letters.loading}
        />

      </div>

      <Footer />
    </div>
  )
}
