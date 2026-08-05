"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth } from "firebase/auth"
import { toast } from "sonner"

import { useAuth } from "@/store/useAuth"
import { useConfirm } from "@/store/useConfirm"
import DashboardHeader from "@/components/dashboard/dashboardHeader"
import DashboardContent, { Letter } from "@/components/dashboard/dashboardContent"
import LetterModal from "@/components/dashboard/letterModal"

interface LetterModalState {
  open: boolean
  letter: Letter | null
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const auth = getAuth()
  const [letters, setLetters] = useState<Letter[] | "loading">("loading")
  const [letterModal, setLetterModal] = useState<LetterModalState>({
    open: false,
    letter: null,
  })
  const confirm = useConfirm()
  const router = useRouter()

  const goLogout = async () => {
    const ask = await confirm({
      title: "peringatan",
      description: "yakin ingin logout",
    })
    if(ask) {
      logout()
      router.replace("/")
    }
  }

  const getLetters = async () => {
    setLetters("loading")
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/letter/byuser/?uid=${user?.uid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
          },
        }
      )
      const { status } = response

      if (status !== 200) {
        setLetters([])
        throw new Error("Gagal ambil data surat")
      }
      const json = await response.json()
      setLetters(json.data)
    } catch (error) {
      toast.error("Gagal", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
        richColors: true,
      })
    }
  }

  const removeLetter = async (id: string) => {
    try {
      const ok = await confirm({
        title: "Peringatan",
        description: "Yakin ingin hapus surat",
      })
      if (ok) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/letter/?id=${id}&uid=${user?.uid}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
            },
          }
        )
        if (!response.ok) {
          throw new Error("Gagal ambil data surat")
        }
        const json = await response.json()
        toast.success("Berhasil", {
          description: json.message,
          richColors: true,
        })
        getLetters()
      }
    } catch (error) {
      toast.error("Gagal", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
        richColors: true,
      })
    }
  }

  useEffect(() => {
    if (user) {
      getLetters()
    }
  }, [user])

  return (
    <div className="min-h-screen bg-muted/30 pb-12">
      <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
        <DashboardHeader
          user={user}
          lettersCount={letters === "loading" ? 0 : letters.length}
          onNewTemplate={() => setLetterModal({ letter: null, open: true })}
          onLogout={goLogout}
        />

        {/* Dashboard Main Content */}
        <DashboardContent
          letters={letters}
          onNewTemplate={() => setLetterModal({ letter: null, open: true })}
          onEditLetter={(letter) => setLetterModal({ letter, open: true })}
          onRemoveLetter={removeLetter}
        />
      </div>

      <LetterModal
        open={letterModal.open}
        onOpenChange={(update) => {
          setLetterModal({ ...letterModal, open: false })
          if (update) {
            getLetters()
          }
        }}
        letter={letterModal.letter}
      />
    </div>
  )
}
